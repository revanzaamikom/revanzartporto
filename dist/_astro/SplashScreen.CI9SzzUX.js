import{j as e}from"./jsx-runtime.CYiYLu1p.js";import{r as s}from"./index.CZlPm10g.js";function u({onComplete:t}){const[r,a]=s.useState("reveal");return s.useEffect(()=>{document.body.style.overflow="hidden";const o=setTimeout(()=>{a("exit")},1800),n=setTimeout(()=>{t&&t()},2500),i=setTimeout(()=>{a("unmounted"),document.body.style.overflow="auto"},2600);return()=>{clearTimeout(o),clearTimeout(n),clearTimeout(i),document.body.style.overflow="auto"}},[t]),r==="unmounted"?null:e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
      `}),e.jsx("div",{className:`fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center pointer-events-auto transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${r==="exit"?"-translate-y-full":"translate-y-0"}`,children:e.jsx("div",{className:"text-center select-none px-4",children:e.jsx("h1",{className:"animate-reveal-text font-sans font-extrabold text-2xl md:text-4xl tracking-[0.25em] text-white text-glow opacity-0",children:"REVANZART'S PORTOFOLIO"})})})]})}export{u as default};
