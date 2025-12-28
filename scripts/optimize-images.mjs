import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '../public');

// Configuration
const MAX_WIDTH = 1200;
const QUALITY = 85;

// Helper to crawl directories
function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

async function optimizeImages() {
  const allFiles = getFiles(PUBLIC_DIR);
  // Filter for image files, excluding already optimized webp if they exist (though we might overwrite)
  // We focus on jpg, jpeg, png
  const imageFiles = allFiles.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

  console.log(`Found ${imageFiles.length} images to process.`);

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const filename = path.basename(file, ext);
    const dir = path.dirname(file);
    const newPath = path.join(dir, `${filename}.webp`);

    console.log(`Processing: ${path.relative(PUBLIC_DIR, file)} -> ${path.relative(PUBLIC_DIR, newPath)}`);

    try {
      const metadata = await sharp(file).metadata();
      let pipeline = sharp(file);

      if (metadata.width > MAX_WIDTH) {
         pipeline = pipeline.resize({ width: MAX_WIDTH });
      }

      await pipeline
        .webp({ quality: QUALITY })
        .toFile(newPath);

      console.log(`  Saved ${path.relative(PUBLIC_DIR, newPath)}`);
    } catch (error) {
      console.error(`  Error processing ${file}:`, error);
    }
  }
}

optimizeImages();
