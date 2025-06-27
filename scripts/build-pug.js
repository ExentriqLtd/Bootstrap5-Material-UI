const fs = require('fs');
const path = require('path');
const pug = require('pug');
const chokidar = require('chokidar');

const modulesDir = path.resolve(__dirname, '../views/modules');
const templatePath = path.resolve(__dirname, '../views/page.pug');
const outputDir = path.resolve(__dirname, '../public');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function compilePage(file) {
  const name = path.basename(file, '.html');
  const content = fs.readFileSync(path.join(modulesDir, file), 'utf8');

  const data = {
    doc_route: {
      path: name,
      name_chapter: capitalize(name),
      content: content
    }
  };

  try {
    const html = pug.renderFile(templatePath, {
      pretty: true,
      ...data
    });

    fs.writeFileSync(path.join(outputDir, `${name}.html`), html);
    console.log(`✅ Compilazione di ${name}.html`);
  } catch (err) {
    console.error(`❌ Errore nella compilazione di ${name}.html:\n`, err.message);
  }
}

function removePage(file) {
  const name = path.basename(file, '.html');
  const outputPath = path.join(outputDir, `${name}.html`);

  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
    console.log(`🗑️  Rimosso ${name}.html`);
  }
}

function buildAllPages() {
  const files = fs.readdirSync(modulesDir).filter(file => file.endsWith('.html'));
  files.forEach(compilePage);
}

if (process.argv.includes('--watch')) {
  buildAllPages();

  chokidar.watch(modulesDir, { ignoreInitial: true })
    .on('add', (filePath) => {
      const file = path.basename(filePath);
      if (file.endsWith('.html')) compilePage(file);
    })
    .on('change', (filePath) => {
      const file = path.basename(filePath);
      if (file.endsWith('.html')) compilePage(file);
    })
    .on('unlink', (filePath) => {
      const file = path.basename(filePath);
      if (file.endsWith('.html')) removePage(file);
    });

  console.log('👀 Watch mode attivo. In ascolto su views/modules/');
} else {
  buildAllPages();
}