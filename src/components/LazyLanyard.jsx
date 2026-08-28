import { lazy, Suspense, useEffect, useState } from 'react';

const Lanyard3D = lazy(() => import('./Lanyard3D.jsx'));

export default function LazyLanyard(props) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		// Mulai download chunk 3MB + glb SELAMA splash, biar muncul cepat setelahnya
		import('./Lanyard3D.jsx').catch(() => {});
		fetch('/lanyard/card.glb', { mode: 'cors' }).catch(() => {});

		const start = () => setReady(true);
		window.addEventListener('splash-complete', start);
		const fallback = setTimeout(start, 3000);
		return () => {
			window.removeEventListener('splash-complete', start);
			clearTimeout(fallback);
		};
	}, []);

	const { className = '' } = props;
	const placeholder = <div className={className} style={{ touchAction: 'pan-y' }} aria-hidden="true" />;

	if (!ready) return placeholder;

	return <Suspense fallback={placeholder}>{<Lanyard3D {...props} />}</Suspense>;
}
