// Assembles the static site into _site/ for GitHub Pages — a plain file copy,
// no reveal-md/Marp. Copies the standalone HTML deck and its runtime assets.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const out = path.join(root, '_site');

// Files and folders that make up the deployable deck.
const assets = ['index.html', 'css', '.nojekyll'];

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copy(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const asset of assets) {
  const src = path.join(root, asset);
  if (fs.existsSync(src)) {
    copy(src, path.join(out, asset));
    console.log(`✓ copied ${asset}`);
  } else {
    console.warn(`• skipped missing ${asset}`);
  }
}

console.log('✨ Static site built into _site/');
