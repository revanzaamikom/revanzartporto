const fs = require('fs');
const path = require('path');
const { pdf } = require('pdf-to-img');
const sharp = require('sharp');

const MAG_DIR = path.join(__dirname, 'public', 'images', 'magazine');

// Format ukuran file agar mudah dibaca
function formatBytes(bytes) {
	if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
	if (bytes >= 1024) return (bytes / 1024).toFixed(2) + ' KB';
	return bytes + ' B';
}

// Natural sort untuk urutan file yang benar (COVER, GEN-1..8, iklan, TEAM)
function naturalSort(a, b) {
	return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

if (!fs.existsSync(MAG_DIR)) {
	console.error(`Folder tidak ditemukan: ${MAG_DIR}`);
	process.exit(1);
}

// Ambil semua file .pdf
const pdfFiles = fs.readdirSync(MAG_DIR)
	.filter((f) => f.toLowerCase().endsWith('.pdf'))
	.sort(naturalSort);

if (pdfFiles.length === 0) {
	console.error('Tidak ada file .pdf di public/images/magazine/');
	process.exit(1);
}

console.log(`Menemukan ${pdfFiles.length} file PDF:\n`);

let outputIndex = 1;

async function convertAll() {
	for (const file of pdfFiles) {
		const inputPath = path.join(MAG_DIR, file);
		const originalSize = fs.statSync(inputPath).size;
		console.log(`▶ Mengonversi: ${file} (${formatBytes(originalSize)})`);

		try {
			const document = await pdf(inputPath, { scale: 2 }); // scale 2 = resolusi 2x untuk kualitas tajam
			let pageCount = 0;

			for await (const image of document) {
				pageCount++;
				const outputName = `gtr-${outputIndex}.webp`;
				const outputPath = path.join(MAG_DIR, outputName);

				// Kompres ke WebP dengan kualitas 80%
				await sharp(image)
					.webp({ quality: 80 })
					.toFile(outputPath);

				const outSize = fs.statSync(outputPath).size;
				console.log(`   ✅ Halaman ${pageCount} → ${outputName} (${formatBytes(outSize)})`);
				outputIndex++;
			}

			// Hapus file PDF asli setelah berhasil dikonversi
			fs.unlinkSync(inputPath);
			console.log(`   🗑️  File asli dihapus: ${file}\n`);
		} catch (err) {
			console.error(`   ❌ Gagal mengonversi ${file}: ${err.message}\n`);
			process.exitCode = 1;
		}
	}

	console.log('Selesai! 🎉');
}

convertAll();