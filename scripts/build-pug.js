const fs = require('fs');
const path = require('path');
const pug = require('pug');
const watch = require('node-watch');
const { exec } = require('child_process');

const modulesDir = path.resolve(__dirname, '../views/modules');
const templatePath = path.resolve(__dirname, '../views/page.pug');
const outputDir = path.resolve(__dirname, '../public');
const isDev = process.argv.includes('--dev');

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
      isDev,
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

function rebuildAll() {
  const isDev = process.argv.includes('--dev');
  const cmd = isDev ? 'npm run build-assets-dev' : 'npm run build-assets';

  console.log('🔄 Ricompilazione completa...');
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Errore compilazione ASSETS:\n${stderr}`);
      return;
    }
    console.log(stdout);
    buildAllPages();
  });
}

console.log('[START] build-pug.js avviato con argomenti:', process.argv);
console.log('[DEBUG] cwd:', path.resolve(__dirname, '..'));

if (process.argv.includes('--watch')) {
  // Prima compilazione
  rebuildAll();

  console.log('👀 Watch mode attivo con node-watch');

  // Watch HTML in views/modules
  watch(modulesDir, { recursive: true, filter: /\.html$/ }, (evt, name) => {
    console.log(`[WATCH] Evento ${evt} su ${name}`);
    if (evt === 'remove') {
      removePage(name);
    } else {
      rebuildAll();
    }
  });

  // Watch PUG in views
  watch(path.resolve(__dirname, '../views'), { recursive: true, filter: /\.pug$/ }, (evt, name) => {
    console.log(`[WATCH] Evento ${evt} su ${name}`);
    rebuildAll();
  });
} else {
  buildAllPages();
}