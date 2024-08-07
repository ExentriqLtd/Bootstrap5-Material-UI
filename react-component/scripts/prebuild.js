const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../../dist/styles.css');
const symlinkDir = path.resolve(__dirname, '../src/styles.css');

try {
  // Controlla se il symlink esiste già e rimuovilo se necessario
  if (fs.existsSync(symlinkDir)) {
    fs.unlinkSync(symlinkDir);
  }

  // Crea il symlink
  fs.symlinkSync(targetDir, symlinkDir, 'file');
  console.log(`Symlink created from ${targetDir} to ${symlinkDir}`);
} catch (error) {
  console.error(`Error creating symlink: ${error.message}`);
}
