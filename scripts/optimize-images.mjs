import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '../public');
const ORIGINALS_DIR = path.join(__dirname, '../originals');
const CONTENT_DIR = path.join(__dirname, '../content');

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
  // We focus on jpg, jpeg, png, heic, heif
  const imageFiles = allFiles.filter(file => /\.(jpg|jpeg|png|heic|heif)$/i.test(file));

  console.log(`Found ${imageFiles.length} images to process.`);

  for (let file of imageFiles) {
    // Rename original file to lowercase if needed
    const dir = path.dirname(file);
    const basename = path.basename(file);
    const basenameLower = basename.toLowerCase();

    if (basename !== basenameLower) {
      const newFilePath = path.join(dir, basenameLower);
      fs.renameSync(file, newFilePath);
      file = newFilePath;
    }

    const ext = path.extname(file);
    // Always use lowercase for the filename part
    const filename = path.basename(file, ext).toLowerCase();
    const newPath = path.join(dir, `${filename}.webp`);

    console.log(`Processing: ${path.relative(PUBLIC_DIR, file)} -> ${path.relative(PUBLIC_DIR, newPath)}`);

    let inputPath = file;
    let tempPng = null;

    try {
      // Handle HEIC/HEIF by converting to PNG first using system tools (sips on macOS)
      if (/\.(heic|heif)$/i.test(file)) {
        tempPng = path.join(dir, `${filename}_temp.png`);
        try {
          execSync(`sips -s format png "${file}" --out "${tempPng}"`, { stdio: 'ignore' });
          inputPath = tempPng;
        } catch (e) {
          console.log(e);
          console.error(`  Error converting HEIC ${file} with sips.`);
          continue;
        }
      }

      const metadata = await sharp(inputPath).metadata();
      let pipeline = sharp(inputPath);

      if (metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH });
      }

      await pipeline
        .webp({ quality: QUALITY })
        .toFile(newPath);

      console.log(`  Saved ${path.relative(PUBLIC_DIR, newPath)}`);

      // Clean up temp file
      if (tempPng && fs.existsSync(tempPng)) {
        fs.unlinkSync(tempPng);
      }

      // Move original file to originals folder (lowercase)
      const relPath = path.relative(PUBLIC_DIR, file);
      const relDir = path.dirname(relPath);
      const originalBasenameLower = path.basename(file).toLowerCase();
      const originalDest = path.join(ORIGINALS_DIR, relDir, originalBasenameLower);
      const originalDestDir = path.dirname(originalDest);

      if (!fs.existsSync(originalDestDir)) {
        fs.mkdirSync(originalDestDir, { recursive: true });
      }

      fs.renameSync(file, originalDest);
      console.log(`  Moved original to ${path.relative(path.join(__dirname, '..'), originalDest)}`);

      // Update references in content files
      updateContentReferences(path.relative(PUBLIC_DIR, file), path.relative(PUBLIC_DIR, newPath));

    } catch (error) {
      console.error(`  Error processing ${file}:`, error);
    }
  }
}

// Helper to update content references
function updateContentReferences(oldRelPath, newRelPath) {
  const contentFiles = fs.readdirSync(CONTENT_DIR).filter(file => /\.(md|mdx)$/.test(file));

  // Ensure paths start with / for matching in markdown/frontmatter
  const oldRef = `/${oldRelPath}`;
  const newRef = `/${newRelPath}`;

  // Create a case-insensitive regex to handle extension case mismatches (e.g. .JPG vs .jpg)
  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapeRegExp(oldRef), 'gi');

  for (const file of contentFiles) {
    const filePath = path.join(CONTENT_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if the file contains the reference (case-insensitive)
    if (regex.test(content)) {
      content = content.replace(regex, newRef);
      fs.writeFileSync(filePath, content);
      console.log(`  Updated reference in ${file}`);
    }
  }
}

optimizeImages();
