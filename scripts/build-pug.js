const { execSync } = require('child_process');

// Compila i file Pug nella cartella modules
try {
    execSync('npx pug views --out public', { stdio: 'inherit' });
    console.log('Pug files compiled successfully.');
} catch (error) {
  console.error('Error compiling Pug files:', error.message);
}
