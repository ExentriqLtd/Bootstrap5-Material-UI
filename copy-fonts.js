const fs = require('fs');
const path = require('path');

const dest = path.resolve(__dirname, 'dist/fonts');
const exts = new Set(['.woff2', '.woff', '.ttf', '.eot', '.svg']);

function safeList(dir) {
  try {
    return fs.readdirSync(dir);
  } catch {
    console.warn(`⚠️  Sorgente font non trovata: ${dir}`);
    return [];
  }
}

// Sorgenti font da copiare (aggiunto glyphicons)
const fontsToCopy = [
  {
    from: path.resolve(__dirname, 'node_modules/@mdi/font/fonts'),
    files: safeList(path.resolve(__dirname, 'node_modules/@mdi/font/fonts')),
  },
  {
    from: path.resolve(__dirname, 'node_modules/material-icons/iconfont'),
    files: safeList(path.resolve(__dirname, 'node_modules/material-icons/iconfont'))
      .filter(f => exts.has(path.extname(f).toLowerCase())),
  },
  {
    from: path.resolve(__dirname, 'node_modules/material-symbols'),
    files: safeList(path.resolve(__dirname, 'node_modules/material-symbols'))
      .filter(f => path.extname(f).toLowerCase() === '.woff2'),
  },
  {
    // 👇 nuova voce: glyphicons-only-bootstrap
    from: path.resolve(__dirname, 'node_modules/glyphicons-only-bootstrap/fonts'),
    files: safeList(path.resolve(__dirname, 'node_modules/glyphicons-only-bootstrap/fonts'))
      .filter(f => exts.has(path.extname(f).toLowerCase())),
  },
];

// Crea cartella destinazione
if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
}

fontsToCopy.forEach(({ from, files }) => {
  files.forEach(file => {
    const srcFile = path.join(from, file);
    const destFile = path.join(dest, file);
    try {
      fs.copyFileSync(srcFile, destFile);
      console.log(`📁 Copiato ${file} → fonts/`);
    } catch (e) {
      console.warn(`⚠️  Skip ${file} (${e.message})`);
    }
  });
});