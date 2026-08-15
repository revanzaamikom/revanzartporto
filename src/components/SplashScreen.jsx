import { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState('reveal'); // 'reveal' | 'exit' | 'unmounted'

  useEffect(() => {
    // Disable body scrolling on mount
    document.body.style.overflow = 'hidden';

    // 1.8s: Start exit transition (swipe up)
    const exitTimeout = setTimeout(() => {
      setStage('exit');
    }, 1800);

    // 2.5s: Trigger completion (exit animation finished)
    const completeTimeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2500);

    // 2.6s total: Fully unmount (1.8s + 0.7s duration + extra buffer)
    const unmountTimeout = setTimeout(() => {
      setStage('unmounted');
      document.body.style.overflow = 'auto';
    }, 2600);

    return () => {
      clearTimeout(exitTimeout);
      clearTimeout(completeTimeout);
      clearTimeout(unmountTimeout);
      // Ensure body overflow is restored if component unmounts prematurely
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  if (stage === 'unmounted') return null;

  return (
    <>
      <style>{`
        @keyframes revealText {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .animate-reveal-text {
          animation: revealText 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .text-glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <div
        className={`fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center pointer-events-auto transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          stage === 'exit' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="text-center select-none px-4">
          <h1 className="animate-reveal-text font-sans font-extrabold text-2xl md:text-4xl tracking-[0.25em] text-white text-glow opacity-0">
            REVANZART'S PORTOFOLIO
          </h1>
        </div>
      </div>
    </>
  );
}
