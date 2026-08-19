const fs = require('fs');
const path = require('path');
const { pdf } = require('pdf-to-img');
const sharp = require('sharp');

// ============================================================
// convert-images.cjs — Flexible image converter & compressor
// ------------------------------------------------------------
// Usage:
//   node convert-images.cjs
//     → default: public/ → public/images/e-certificate/ prefix "cert-"
//
//   node convert-images.cjs --input <folder> --output <folder> \
//        --prefix <name> --quality <1-100> --scale <number> \
//        --exclude <comma,separated,names>
//
// Supported input: .pdf .jpg .jpeg .png .webp .heic
// Output: WebP (quality default 80)
//
// SAFETY: Only deletes source files that were successfully converted.
//         Non-recursive — subfolders are never touched.
//         Files listed in --exclude are never processed.
// ============================================================

function parseArgs() {
	const args = process.argv.slice(2);
	const get = (flag, def) => {
		const i = args.indexOf(flag);
		return i !== -1 && args[i + 1] ? args[i + 1] : def;
	};
	return {
		input: get('--input', path.join(__dirname, 'public')),
		output: get('--output', path.join(__dirname, 'public', 'images', 'e-certificate')),
		prefix: get('--prefix', 'cert-'),
		quality: parseInt(get('--quality', '80'), 10),
		scale: parseFloat(get('--scale', '2')),
		exclude: (get('--exclude', 'lanyard.jpg') || '').split(',').map((s) => s.trim()).filter(Boolean),
	};
}

const SUPPORTED = ['.pdf', '.jpg', '.jpeg', '.png', '.webp', '.heic'];

function formatBytes(bytes) {
	if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
	if (bytes >= 1024) return (bytes / 1024).toFixed(2) + ' KB';
	return bytes + ' B';
}

function naturalSort(a, b) {
	return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

async function convertFile(file, inputDir, outputDir, prefix, quality, scale, index) {
	const inputPath = path.join(inputDir, file);
	const ext = path.extname(file).toLowerCase();
	const originalSize = fs.statSync(inputPath).size;
	const outputName = `${prefix}${index}.webp`;
	const outputPath = path.join(outputDir, outputName);

	console.log(`▶ ${file} (${formatBytes(originalSize)})`);

	if (ext === '.pdf') {
		// PDF → render each page at scale, then WebP
		const document = await pdf(inputPath, { scale });
		let pageCount = 0;
		for await (const image of document) {
			pageCount++;
			const pageOutput = pageCount === 1 ? outputPath : path.join(outputDir, `${prefix}${index}-p${pageCount}.webp`);
			await sharp(image).webp({ quality }).toFile(pageOutput);
			console.log(`   ✅ Halaman ${pageCount} → ${path.basename(pageOutput)} (${formatBytes(fs.statSync(pageOutput).size)})`);
		}
	} else {
		// Image (jpg/png/webp/heic) → WebP
		await sharp(inputPath).webp({ quality }).toFile(outputPath);
		console.log(`   ✅ → ${outputName} (${formatBytes(fs.statSync(outputPath).size)})`);
	}

	// Only delete source after successful conversion
	fs.unlinkSync(inputPath);
	console.log(`   🗑️  File asli dihapus: ${file}`);
	return true;
}

async function main() {
	const { input, output, prefix, quality, scale, exclude } = parseArgs();

	if (!fs.existsSync(input)) {
		console.error(`❌ Folder input tidak ditemukan: ${input}`);
		process.exit(1);
	}

	// Create output dir if missing
	fs.mkdirSync(output, { recursive: true });

	// Non-recursive: only top-level files, excluding protected names
	const files = fs.readdirSync(input)
		.filter((f) => {
			const full = path.join(input, f);
			return fs.statSync(full).isFile()
				&& SUPPORTED.includes(path.extname(f).toLowerCase())
				&& !exclude.includes(f);
		})
		.sort(naturalSort);

	if (files.length === 0) {
		console.log('Tidak ada file yang perlu dikonversi.');
		return;
	}

	console.log(`Input : ${input}`);
	console.log(`Output: ${output}`);
	console.log(`Prefix: ${prefix} | Quality: ${quality} | Scale: ${scale}`);
	console.log(`Exclude: ${exclude.join(', ') || '(none)'}`);
	console.log(`Menemukan ${files.length} file:\n`);

	let index = 1;
	let success = 0;
	let failed = 0;

	for (const file of files) {
		try {
			await convertFile(file, input, output, prefix, quality, scale, index);
			index++;
			success++;
		} catch (err) {
			console.error(`   ❌ Gagal: ${file} — ${err.message}`);
			failed++;
		}
	}

	console.log(`\nSelesai! ✅ ${success} berhasil, ${failed} gagal.`);
	if (failed > 0) {
		console.log('File yang gagal TIDAK dihapus.');
		process.exitCode = 1;
	}
}

main();