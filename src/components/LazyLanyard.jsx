import { lazy, Suspense, useEffect, useState } from 'react';

const Lanyard3D = lazy(() => import('./Lanyard3D.jsx'));

export default function LazyLanyard(props) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const start = () => setReady(true);
		const onSplash = () => {
			window.removeEventListener('splash-complete', onSplash);
			const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 300));
			schedule(start);
		};
		window.addEventListener('splash-complete', onSplash);
		const fallback = setTimeout(start, 4500);
		return () => {
			window.removeEventListener('splash-complete', onSplash);
			clearTimeout(fallback);
		};
	}, []);

	const { className = '' } = props;
	const placeholder = <div className={className} style={{ touchAction: 'pan-y' }} aria-hidden="true" />;

	if (!ready) return placeholder;

	return <Suspense fallback={placeholder}>{<Lanyard3D {...props} />}</Suspense>;
}
