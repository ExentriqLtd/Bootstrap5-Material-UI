const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'js');
const outputFile = path.join(__dirname, '..', 'dist', 'app.js');

const jsFilesInOrder = [
  'eq-ui.js',
  'helps/bower_components.js',
  'helps/observe.js',
  'site.js',
  'layout/breadcrumb.js',
  'dropdown.js',
  'tabs.js',
  '_init.js',
  'button.js'
];

let concatenated = '';

jsFilesInOrder.forEach(file => {
  const filePath = path.join(sourceDir, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ File non trovato: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8').trim();

  // Aggiungo punto e virgola se manca alla fine del file per sicurezza
  if (!content.endsWith(';')) {
    content += ';';
  }

  concatenated += `\n// --- File: ${file} ---\n` + content + '\n';
});

fs.writeFileSync(outputFile, concatenated);

console.log(`✅ Concatenati ${jsFilesInOrder.length} file in ${outputFile}`);
