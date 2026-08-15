import { useState } from 'react';
import OptionWheel from './ui/OptionWheel.jsx';

const translations = {
	EN: {
		title: "What I do",
		description1: "I bridge technical execution, visual creative, and strategic leadership. Spanning across Visual Effects (VFX), Video Editing, and Interactive UI/UX Design, I craft immersive digital experiences transforming bold concepts into compelling visual stories.",
		description2: "As a creative lead, I thrive on guiding the process from ideation to execution. I dynamic-brainstorm concepts, map out visual directions, and align teams to ensure every design and frame is not just visually engaging, but deeply understood by the audience."
	},
	ID: {
		title: "Yang Saya Lakukan",
		description1: "Saya menjembatani eksekusi teknis, kreativitas visual, dan kepemimpinan strategis. Mengintegrasikan Visual Effects (VFX), Video Editing, dan Desain UI/UX Interaktif, saya menciptakan pengalaman digital yang imersif—mengubah konsep berani menjadi kisah visual yang memikat.",
		description2: "Sebagai creative lead, saya berfokus mengarahkan proses dari ideasi hingga eksekusi. Saya melakukan pemikiran ide secara dinamis, merancang arah visual, dan mengarahkan tim untuk memastikan setiap desain dan frame tidak hanya menarik secara visual, tetapi juga dipahami secara mendalam oleh audiens."
	}
};

const wheelItems = [
	'VFX & Post-Production',
	'Video Editing',
	'UI/UX Design',
	'Creative Direction',
	'Motion Graphics',
	'Scriptwriting'
];

export default function WhatIDo() {
	const [lang, setLang] = useState('EN');
	const [isFading, setIsFading] = useState(false);

	const t = translations[lang];

	const handleLangChange = (newLang) => {
		if (newLang === lang) return;
		setIsFading(true);
		setTimeout(() => {
			setLang(newLang);
			setIsFading(false);
		}, 150);
	};

	return (
		<section id="what-i-do" className="px-6 md:px-24 py-24 bg-[#000000] relative overflow-hidden">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					{/* Left Column: Heading & Description */}
					<div>
						{/* Header with Language Switcher */}
						<div className="flex items-center justify-between mb-8">
							<h2 className="text-5xl font-extrabold tracking-tight text-white">
								{t.title}
							</h2>

							{/* Language Switcher - Segmented Pill Control */}
							<div className="flex items-center gap-1 rounded-full p-1 border border-white/10 bg-white/5 backdrop-blur-md">
								{['EN', 'ID'].map((code) => (
									<button
										key={code}
										onClick={() => handleLangChange(code)}
										className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
											lang === code
												? 'bg-white/10 border border-orange-500/50 text-white shadow-[0_0_12px_rgba(255,107,0,0.3)]'
												: 'text-neutral-400 hover:text-white transition-colors duration-200'
										}`}
									>
										{code}
									</button>
								))}
							</div>
						</div>

						{/* Description with smooth fade transition */}
						<div className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
							<p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-6">
								{t.description1}
							</p>
							<p className="text-lg md:text-xl text-gray-400 leading-relaxed">
								{t.description2}
							</p>
						</div>
					</div>

					{/* Right Column: OptionWheel */}
					<div className="h-[400px] w-full relative">
						<OptionWheel
							items={wheelItems}
							side="right"
							defaultSelected={0}
							fontSize={2.2}
							spacing={1.3}
							curve={1}
							tilt={6}
							inset={40}
							loop={true}
							draggable={true}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}