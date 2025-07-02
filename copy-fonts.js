const fs = require('fs');
const path = require('path');

const dest = path.resolve(__dirname, 'dist/fonts');

// Percorsi font da copiare
const fontsToCopy = [
    {
        from: path.resolve(__dirname, 'node_modules/@mdi/font/fonts'),
        files: fs.readdirSync(path.resolve(__dirname, 'node_modules/@mdi/font/fonts')),
    },
    {
        from: path.resolve(__dirname, 'node_modules/material-icons/iconfont'),
        files: fs.readdirSync(path.resolve(__dirname, 'node_modules/material-icons/iconfont'))
            .filter(f => f.endsWith('.woff2') || f.endsWith('.woff') || f.endsWith('.ttf')),
    },
    {
        from: path.resolve(__dirname, 'node_modules/material-symbols'),
        files: fs.readdirSync(path.resolve(__dirname, 'node_modules/material-symbols'))
            .filter(f => f.endsWith('.woff2')),
    }
];

// Crea cartella se non esiste
if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
}

fontsToCopy.forEach(({ from, files }) => {
    files.forEach(file => {
        const srcFile = path.join(from, file);
        const destFile = path.join(dest, file);
        fs.copyFileSync(srcFile, destFile);
        console.log(`📁 Copiato ${file} → fonts/`);
    });
});