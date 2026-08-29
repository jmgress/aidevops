const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const EXPECTED_PRESENTATION_TITLE = 'DevOps in the Age of AI';
const EXPECTED_SPEAKER_NOTES_HEADER = '# Speaker Notes & Presenter Guide: DevOps in the Age of AI';
const EXPECTED_SLIDE_COUNT = 18;

console.log('Running presentation validation checks...');

// Check required files
const requiredFiles = [
  'README.md',
  'LICENSE',
  'index.html',
  'css/theme.css',
  'presentation.md',
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

// Validate presentation.md structure (no Marp frontmatter expected)
const presMd = fs.readFileSync(path.join(root, 'presentation.md'), 'utf-8');

if (presMd.includes('marp: true')) {
  console.error('❌ presentation.md still contains Marp frontmatter ("marp: true")');
  process.exit(1);
}

const slideCount = presMd.trim().split(/\r?\n---\r?\n/).filter(Boolean).length;
console.log(`✓ presentation.md has ${slideCount} slides`);

if (slideCount !== EXPECTED_SLIDE_COUNT) {
  console.error(`❌ Expected exactly ${EXPECTED_SLIDE_COUNT} slides in presentation.md, but found ${slideCount}`);
  process.exit(1);
}

if (!presMd.includes(EXPECTED_PRESENTATION_TITLE)) {
  console.error('❌ presentation.md missing expected title');
  process.exit(1);
}

// Validate index.html wires up reveal.js and loads the markdown deck
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf-8');
for (const needle of ['reveal.js', 'data-markdown="presentation.md"', 'Reveal.initialize']) {
  if (!indexHtml.includes(needle)) {
    console.error(`❌ index.html missing expected reference: ${needle}`);
    process.exit(1);
  }
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
