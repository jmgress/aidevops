const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const EXPECTED_PRESENTATION_TITLE = 'DevOps in the Age of AI';
const EXPECTED_SPEAKER_NOTES_HEADER = '# Speaker Notes & Presenter Guide: DevOps in the Age of AI';

console.log('Running presentation validation checks...');

// Check required files
const requiredFiles = [
  'README.md',
  'LICENSE',
  'index.html',
  'css/theme.css',
  'SPEAKER_NOTES.md',
  'package.json',
  '.gitignore',
  '.nojekyll'
];

for (const file of requiredFiles) {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing required file: ${file}`);
    process.exit(1);
  }
  // .nojekyll is intentionally empty; every other file must have content.
  if (file !== '.nojekyll' && fs.statSync(filePath).size === 0) {
    console.error(`❌ Required file is empty: ${file}`);
    process.exit(1);
  }
  console.log(`✓ ${file} exists`);
}

// Validate index.html is the self-contained deck (slides inlined, no runtime fetch).
// It must be openable directly on GitHub Pages with no build step or external framework.
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf-8');

if (!indexHtml.includes(EXPECTED_PRESENTATION_TITLE)) {
  console.error('❌ index.html missing expected title');
  process.exit(1);
}

// Slides live inline as <section class="slide"> elements — count them.
const slideCount = (indexHtml.match(/class="slide/g) || []).length;
console.log(`✓ index.html has ${slideCount} inline slides`);

if (slideCount < 1) {
  console.error('❌ Expected at least one inline slide in index.html');
  process.exit(1);
}

for (const needle of ['id="deck"', 'css/theme.css']) {
  if (!indexHtml.includes(needle)) {
    console.error(`❌ index.html missing expected reference: ${needle}`);
    process.exit(1);
  }
}

// The deck must be self-contained: no runtime data fetch and no slide framework.
if (/fetch\(/.test(indexHtml)) {
  console.error('❌ index.html must be self-contained — no runtime fetch() (breaks as a static file)');
  process.exit(1);
}
if (/reveal\.js|reveal-md|marp/i.test(indexHtml)) {
  console.error('❌ index.html still references reveal.js / reveal-md / Marp');
  process.exit(1);
}
console.log('✓ index.html validated');

// Validate speaker notes
const speakerNotes = fs.readFileSync(path.join(root, 'SPEAKER_NOTES.md'), 'utf-8');
if (!speakerNotes.includes(EXPECTED_SPEAKER_NOTES_HEADER)) {
  console.error('❌ SPEAKER_NOTES.md missing header');
  process.exit(1);
}
console.log('✓ SPEAKER_NOTES.md validated');

console.log('✨ All presentation validation checks passed successfully!');
