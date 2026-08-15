import { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import './GradientWaves.css';

const hexToRgb = hex => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [0, 0, 0];
};

const GradientWaves = ({
  horizonColor = '#050B14',
  waveColor = '#0055ff',
  crestColor = '#00ffff',
  speed = 0.3,
  brightness = 0.8,
  opacity = 0.6,
  mouseInteraction = true,
  className = ''
}) => {
  const containerRef = useRef(null);
  const uniformsRef = useRef(null);
  const rendererRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef(null);
  const meshRef = useRef(null);
  const cleanupFunctionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    if (cleanupFunctionRef.current) {
      cleanupFunctionRef.current();
      cleanupFunctionRef.current = null;
    }

    const initializeWebGL = async () => {
      if (!containerRef.current) return;

      await new Promise(resolve => setTimeout(resolve, 10));

      if (!containerRef.current) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true
      });
      rendererRef.current = renderer;

      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(gl.canvas);

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

      const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec3  horizonColor;
uniform vec3  waveColor;
uniform vec3  crestColor;
uniform float speed;
uniform float brightness;
uniform float opacity;
uniform vec2  mousePos;
uniform float mouseInteraction;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float t = iTime * speed;

  // Mouse interaction
  float mouseEffect = 0.0;
  if (mouseInteraction > 0.5) {
    float dist = length(uv - mousePos);
    mouseEffect = smoothstep(0.5, 0.0, dist) * 0.15;
  }

  // Draw elegant gradient waves with different frequencies/amplitudes
  float wave1 = sin(uv.x * 3.5 + t + mouseEffect * 6.0) * 0.18;
  float wave2 = cos(uv.x * 2.0 - t * 1.3 + uv.y * 1.5) * 0.12;
  float wave3 = sin(uv.y * 2.5 + t * 0.7 + uv.x * 1.2) * 0.08;

  float waveHeight = wave1 + wave2 + wave3;
  float curve = uv.y - (0.45 + waveHeight);

  // Deep ocean gradient base
  vec3 col = horizonColor;

  // Add the primary wave body color
  float waveEdge = smoothstep(0.2, -0.2, curve);
  col = mix(col, waveColor, waveEdge * 0.75);

  // Bright glowing crest highlight at the edge of the curve
  float crestThickness = 0.04 + mouseEffect * 0.04;
  float crest = smoothstep(crestThickness, 0.0, abs(curve));
  col = mix(col, crestColor, crest * brightness);

  // Secondary lower wave layer for beautiful layered depth
  float wave4 = sin(uv.x * 5.5 - t * 1.8 + mouseEffect * 3.0) * 0.08;
  float curve2 = uv.y - (0.25 + wave4);
  float waveEdge2 = smoothstep(0.15, -0.15, curve2);
  col = mix(col, waveColor * 0.5, waveEdge2 * 0.4);

  gl_FragColor = vec4(col, opacity);
}`;

      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        horizonColor: { value: hexToRgb(horizonColor) },
        waveColor: { value: hexToRgb(waveColor) },
        crestColor: { value: hexToRgb(crestColor) },
        speed: { value: speed },
        brightness: { value: brightness },
        opacity: { value: opacity },
        mousePos: { value: [0.5, 0.5] },
        mouseInteraction: { value: mouseInteraction ? 1.0 : 0.0 }
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms
      });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updatePlacement = () => {
        if (!containerRef.current || !renderer) return;

        renderer.dpr = Math.min(window.devicePixelRatio, 2);

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.setSize(wCSS, hCSS);

        uniforms.iResolution.value = [wCSS * renderer.dpr, hCSS * renderer.dpr];
      };

      const loop = t => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {
          return;
        }

        uniforms.iTime.value = t * 0.001;

        if (mouseInteraction) {
          const smoothing = 0.92;
          smoothMouseRef.current.x = smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing);
          smoothMouseRef.current.y = smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing);
          uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];
        }

        try {
          renderer.render({ scene: mesh });
          animationIdRef.current = requestAnimationFrame(loop);
        } catch (error) {
          console.warn('WebGL rendering error inside GradientWaves:', error);
          return;
        }
      };

      window.addEventListener('resize', updatePlacement);
      updatePlacement();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }

        window.removeEventListener('resize', updatePlacement);

        if (renderer) {
          try {
            const canvas = renderer.gl.canvas;
            const loseContextExt = renderer.gl.getExtension('WEBGL_lose_context');
            if (loseContextExt) {
              loseContextExt.loseContext();
            }

            if (canvas && canvas.parentNode) {
              canvas.parentNode.removeChild(canvas);
            }
          } catch (error) {
            console.warn('Error during WebGL cleanup for GradientWaves:', error);
          }
        }

        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };

    initializeWebGL();

    return () => {
      if (cleanupFunctionRef.current) {
        cleanupFunctionRef.current();
        cleanupFunctionRef.current = null;
      }
    };
  }, [
    isVisible,
    horizonColor,
    waveColor,
    crestColor,
    speed,
    brightness,
    opacity,
    mouseInteraction
  ]);

  useEffect(() => {
    if (!uniformsRef.current) return;
    const u = uniformsRef.current;
    u.horizonColor.value = hexToRgb(horizonColor);
    u.waveColor.value = hexToRgb(waveColor);
    u.crestColor.value = hexToRgb(crestColor);
    u.speed.value = speed;
    u.brightness.value = brightness;
    u.opacity.value = opacity;
    u.mouseInteraction.value = mouseInteraction ? 1.0 : 0.0;
  }, [horizonColor, waveColor, crestColor, speed, brightness, opacity, mouseInteraction]);

  useEffect(() => {
    const handleMouseMove = e => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      // In WebGL, texture/vUv coordinates origin is bottom-left, so invert Y to match
      const y = 1.0 - ((e.clientY - rect.top) / rect.height);
      mouseRef.current = { x, y };
    };

    if (mouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseInteraction]);

  return <div ref={containerRef} className={`gradient-waves-container ${className}`.trim()} />;
};

export default GradientWaves;
