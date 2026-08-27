/* eslint-disable react/no-unknown-property */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export default function Lanyard3D({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  fov = 24,
  transparent = true,
  frontImage = '/lanyard.jpg',
  backImage = null,
  imageFit = 'cover',
  lanyardWidth = 1.1,
  className = "absolute inset-0 z-10 w-full h-full flex items-center justify-center overflow-hidden pointer-events-auto",
  anchorPosition = [0, 6.2, 0]
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [splashComplete, setSplashComplete] = useState(false);

  const [strapXOffset, setStrapXOffset] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return 0;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setStrapXOffset(0);
    };
    window.addEventListener('resize', handleResize);

    const handleSplashComplete = () => {
      setSplashComplete(true);
    };

    window.addEventListener('splash-complete', handleSplashComplete);

    // Fallback: always reveal the lanyard after 3s even if the event is missed
    const fallbackTimer = setTimeout(() => {
      setSplashComplete(true);
    }, 3000);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('splash-complete', handleSplashComplete);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className={`${className} touch-none select-none`}>
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1 : 1.5]}
        gl={{ alpha: transparent }}
        style={{ background: 'transparent', width: '100%', height: '100%', touchAction: 'pan-y', userSelect: 'none', WebkitUserSelect: 'none' }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <React.Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardWidth={lanyardWidth}
              splashComplete={splashComplete}
              anchorPosition={isMobile ? [0, 4.5, 0] : anchorPosition}
              strapXOffset={strapXOffset}
            />
          </Physics>
        </React.Suspense>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardWidth = 1.1,
  splashComplete = false,
  anchorPosition = [0, 6.2, 0],
  strapXOffset = 3.5
}) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  
  const { nodes, materials } = useGLTF('/lanyard/card.glb');
  
  // Base textures (hardcoded absolute URL to avoid Vite image object issues)
  const frontTex = useTexture('/lanyard.jpg');
  const backTex = useTexture('/lanyard.jpg');

  useEffect(() => {
    if (frontTex) {
      frontTex.minFilter = THREE.LinearFilter;
    }
    if (backTex) {
      backTex.minFilter = THREE.LinearFilter;
    }
  }, [frontTex, backTex]);

  // Procedural Black Strap with white repeating "3D CARD" text
  const customLanyardTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.Texture();

    // Jet black background ribbon
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle border highlights for 3D depth
    ctx.fillStyle = '#181818';
    ctx.fillRect(0, 0, canvas.width, 3);
    ctx.fillRect(0, canvas.height - 3, canvas.width, 3);

    // Clean white text repeating
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 26px "Inter", "Helvetica Neue", sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    const text = '3D CARD';
    const spacing = 200;
    for (let x = 100; x < canvas.width; x += spacing) {
      ctx.fillText(text, x, canvas.height / 2);
    }

    const t = new THREE.CanvasTexture(canvas);
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1, 1);
    t.needsUpdate = true;
    return t;
  }, []);

  // Composite a high-quality Polaroid frame procedurally
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!baseMap || !baseMap.image) return baseMap;

    const baseImg = baseMap.image;
    const W = baseImg.width || 512;
    const H = baseImg.height || 512;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    // Draw the original atlas first (to keep the clip and other edge details perfect)
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawPolaroidFace = (img, rect) => {
      if (!img || img.width === 0 || img.height === 0) return;
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;

      // 1. Fill card face with solid, clean Polaroid off-white
      ctx.fillStyle = '#fdfdfd';
      ctx.fillRect(rx, ry, rw, rh);

      // 2. Compute margins (standard polaroid ratio: wider bottom)
      const borderX = rw * 0.08;
      const borderTop = rh * 0.08;
      const borderBottom = rh * 0.22;

      const photoW = rw - borderX * 2;
      const photoH = rh - borderTop - borderBottom;

      const px = rx + borderX;
      const py = ry + borderTop;

      // 3. Draw monochrome photo inside inset with clipping
      ctx.save();
      ctx.beginPath();
      ctx.rect(px, py, photoW, photoH);
      ctx.clip();

      // Apply Grayscale + Cinematic Contrast
      ctx.filter = 'grayscale(100%) contrast(1.1) brightness(1.02)';

      const scale = Math.max(photoW / img.width, photoH / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = px + (photoW - dw) / 2;
      const dy = py + (photoH - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();

      // 4. Subtle photo shadow borders
      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 2;
      ctx.strokeRect(px, py, photoW, photoH);
    };

    const drawCleanBackFace = (rect) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;

      // Fill back face with clean white
      ctx.fillStyle = '#fdfdfd';
      ctx.fillRect(rx, ry, rw, rh);
    };

    if (frontImage && frontTex && frontTex.image && frontTex.image.width > 0) {
      drawPolaroidFace(frontTex.image, FRONT_UV_RECT);
    }
    if (backImage && backTex && backTex.image && backTex.image.width > 0) {
      drawPolaroidFace(backTex.image, BACK_UV_RECT);
    } else {
      drawCleanBackFace(BACK_UV_RECT);
    }

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, frontTex, backTex, materials.base.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  // Wake up physics when splash completes so the lanyard drops smoothly
  useEffect(() => {
    if (splashComplete) {
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
    }
  }, [splashComplete]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      // Suspended physics coordinates (centered)
      const p0 = j3.current.translation();
      const p1 = j2.current.lerped;
      const p2 = j1.current.lerped;
      const p3 = fixed.current.translation();

      // Apply progressive offset to visually drape the strap from the top right
      curve.points[0].copy(p0); // attached to the card clip (centered)
      curve.points[1].set(p1.x + strapXOffset * 0.25, p1.y, p1.z);
      curve.points[2].set(p2.x + strapXOffset * 0.65, p2.y, p2.z);
      curve.points[3].set(p3.x + strapXOffset, p3.y, p3.z); // start of the strap (top-right on desktop)

      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={anchorPosition}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 20, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.nativeEvent.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.stopPropagation(),
              e.nativeEvent.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap || null}
                color={cardMap ? '#ffffff' : '#222222'}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={customLanyardTexture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
