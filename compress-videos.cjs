const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const VIDEO_DIR = path.join(__dirname, 'public', 'video');

// Format ukuran file agar mudah dibaca
function formatBytes(bytes) {
	if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
	if (bytes >= 1024) return (bytes / 1024).toFixed(2) + ' KB';
	return bytes + ' B';
}

if (!fs.existsSync(VIDEO_DIR)) {
	console.error(`Folder tidak ditemukan: ${VIDEO_DIR}`);
	process.exit(1);
}

// Ambil semua file .mp4 di public/video
const videoFiles = fs.readdirSync(VIDEO_DIR).filter((f) => f.toLowerCase().endsWith('.mp4'));

if (videoFiles.length === 0) {
	console.error('Tidak ada file .mp4 di public/video/');
	process.exit(1);
}

console.log(`Menemukan ${videoFiles.length} file video:\n`);

for (const file of videoFiles) {
	const inputPath = path.join(VIDEO_DIR, file);
	const tempPath = path.join(VIDEO_DIR, `.tmp-${file}`);
	const originalSize = fs.statSync(inputPath).size;

	console.log(`▶ Mengompres: ${file} (${formatBytes(originalSize)})`);

	try {
		// Kompres ke file sementara dulu agar file asli aman jika gagal
		execFileSync(
			ffmpegPath,
			[
				'-y',
				'-i', inputPath,
				'-vf', 'scale=-2:720',
				'-c:v', 'libx264',
				'-crf', '28',
				'-preset', 'slow',
				'-an',
				'-movflags', '+faststart',
				tempPath,
			],
			{ stdio: ['ignore', 'inherit', 'inherit'] }
		);

		const compressedSize = fs.statSync(tempPath).size;

		// Hapus file asli, ganti dengan hasil kompresi
		fs.unlinkSync(inputPath);
		fs.renameSync(tempPath, inputPath);

		const saving = ((1 - compressedSize / originalSize) * 100).toFixed(1);
		console.log(`   ✅ ${formatBytes(originalSize)} → ${formatBytes(compressedSize)} (hemat ${saving}%)\n`);
	} catch (err) {
		// Bersihkan temp file jika gagal
		if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
		console.error(`   ❌ Gagal mengompres ${file}: ${err.message}\n`);
		process.exitCode = 1;
	}
}

console.log('Selesai! 🎬');