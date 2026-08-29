const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

console.log('Running presentation validation checks...');

// Check required files
const requiredFiles = [
  'README.md',
  'presentation.md',
  'presentation.html',
  'SPEAKER_NOTES.md',
  'package.json',
  '.gitignore'
];

for (const file of requiredFiles) {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing required file: ${file}`);
    process.exit(1);
  }
  const stat = fs.statSync(filePath);
  if (stat.size === 0) {
    console.error(`❌ Required file is empty: ${file}`);
    process.exit(1);
  }
  console.log(`✓ ${file} exists (${stat.size} bytes)`);
}

// Validate presentation.md structure
const presMd = fs.readFileSync(path.join(root, 'presentation.md'), 'utf-8');

if (!presMd.includes('marp: true')) {
  console.error('❌ presentation.md missing "marp: true" frontmatter');
  process.exit(1);
}

const slideCount = presMd.split(/\n---\n/).length;
console.log(`✓ presentation.md has ${slideCount} slides`);

if (slideCount < 10) {
  console.error('❌ Expected at least 10 slides in presentation.md');
  process.exit(1);
}

// Validate speaker notes
const speakerNotes = fs.readFileSync(path.join(root, 'SPEAKER_NOTES.md'), 'utf-8');
if (!speakerNotes.includes('Speaker Notes & Presenter Guide')) {
  console.error('❌ SPEAKER_NOTES.md missing header');
  process.exit(1);
}
console.log('✓ SPEAKER_NOTES.md validated');

// Validate presentation.html contains HTML output
const presHtml = fs.readFileSync(path.join(root, 'presentation.html'), 'utf-8');
if (!presHtml.includes('<!DOCTYPE html>') || !presHtml.includes('DevOps in the Age of AI')) {
  console.error('❌ presentation.html missing expected HTML content');
  process.exit(1);
}
console.log('✓ presentation.html validated');

console.log('✨ All presentation validation checks passed successfully!');
