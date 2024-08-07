const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Percorsi per la copia della build
const buildDir = path.resolve(__dirname, '../build');
const destDir = path.resolve(__dirname, '../../public/react-docs');

// Cancella il contenuto precedente nella cartella di destinazione
if (fs.existsSync(destDir)) {
  fs.rmdirSync(destDir, { recursive: true });
}

// Copia la nuova build nella cartella di destinazione
fs.mkdirSync(destDir, { recursive: true });
execSync(`cp -r ${buildDir}/* ${destDir}`);
console.log(`Build copied from ${buildDir} to ${destDir}`);
