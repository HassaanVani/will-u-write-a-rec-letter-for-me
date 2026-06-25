import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, 'Sammy');
const destDir = path.join(__dirname, 'public', 'sammy');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory "${sourceDir}" not found! Make sure you are running this from the root of the repository.`);
  process.exit(1);
}

const files = fs.readdirSync(sourceDir);
console.log(`Found ${files.length} files in Sammy directory.`);

const processedImages = [];

for (const file of files) {
  if (file === '.DS_Store') continue;

  const srcPath = path.join(sourceDir, file);
  const ext = path.extname(file).toLowerCase();
  const baseName = path.basename(file, path.extname(file));
  
  const destFileName = `${baseName}.jpg`;
  const destPath = path.join(destDir, destFileName);

  console.log(`Processing: ${file}...`);

  if (ext === '.heic') {
    try {
      console.log(`Converting HEIC to JPG via sips: "${file}" -> "${destFileName}"`);
      execSync(`sips -s format jpeg "${srcPath}" --out "${destPath}"`, { stdio: 'ignore' });
      processedImages.push(destFileName);
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err.message);
    }
  } else if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    try {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: "${file}" -> "${destFileName}"`);
      processedImages.push(destFileName);
    } catch (err) {
      console.error(`Failed to copy ${file}:`, err.message);
    }
  } else {
    console.log(`Skipping unknown file format: ${file}`);
  }
}

console.log('\n--- Processing complete! ---');
console.log(`Successfully prepared ${processedImages.length} images in "public/sammy/".`);
console.log('List of images to use in the code:');
console.log(JSON.stringify(processedImages, null, 2));
