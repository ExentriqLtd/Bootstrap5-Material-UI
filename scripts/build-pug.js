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

const sectionsMap = {
  // index.html non ha root_path e name_section (home)
  "index": { root_path: "", name_section: "" },

  // Getting Started è link esterno, lo escludo perché non punta a file locale

  // Layout (css)
  "grid": { root_path: "css", name_section: "Layout" },
  "spacing-methods": { root_path: "css", name_section: "Layout" },
  "typography": { root_path: "css", name_section: "Layout" },
  "color": { root_path: "css", name_section: "Layout" },
  "icons": { root_path: "css", name_section: "Layout" },
  "helpers": { root_path: "css", name_section: "Layout" },

  // Components
  "buttons": { root_path: "components", name_section: "Components" },
  "cards": { root_path: "components", name_section: "Components" },
  "list": { root_path: "components", name_section: "Components" },
  "table": { root_path: "components", name_section: "Components" },
  "sticky-table": { root_path: "components", name_section: "Components" },
  "forms": { root_path: "components", name_section: "Components" },
  "form-validation": { root_path: "components", name_section: "Components" },
  "badges": { root_path: "components", name_section: "Components" },
  "loader": { root_path: "components", name_section: "Components" },

  // JavaScript
  "collapsible": { root_path: "java-script", name_section: "JavaScript" },
  "dropdown": { root_path: "java-script", name_section: "JavaScript" },
  "modals": { root_path: "java-script", name_section: "JavaScript" },
  "tabs": { root_path: "java-script", name_section: "JavaScript" },

  // Showcase
  "showcase": { root_path: "", name_section: "" },

  // 2023 Elements (exentriq)
  "tablev2": { root_path: "exentriq", name_section: "2023 Elements" },
  "cardsv2": { root_path: "exentriq", name_section: "2023 Elements" },
  "buttonsv2": { root_path: "exentriq", name_section: "2023 Elements" },
};

function compilePage(file) {
  var name = path.basename(file, '.html');
  const content = fs.readFileSync(path.join(modulesDir, file), 'utf8');

  let root_path = '';
  let name_section = '';

  if (name !== 'index') {
    if (sectionsMap[name]) {
      root_path = sectionsMap[name].root_path;
      name_section = sectionsMap[name].name_section;
    } else {
      // fallback se non trovato
      root_path = '';
      name_section = '';
    }
  }

  const data = {
    doc_route: {
      path: name,
      name_chapter: name == 'index' ? 'Home' : capitalize(name),
      content: content,
      root_path,
      name_section
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

function copyDocs() {
  const srcDir = path.resolve(__dirname, '../doc');
  const destDir = path.resolve(__dirname, '../public/doc');

  if (!fs.existsSync(srcDir)) {
    console.warn('⚠️  La cartella doc/ non esiste. Nessun file copiato.');
    return;
  }

  fs.mkdirSync(destDir, { recursive: true });

  fs.readdirSync(srcDir).forEach(file => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);

    if (fs.lstatSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`📄 Copiato ${file} → public/doc/`);
    }
  });
}

function copyFonts() {
  const dest = path.resolve(__dirname, '../dist/fonts');

  // Percorsi font da copiare
  const fontsToCopy = [
    {
      from: path.resolve(__dirname, '../node_modules/@mdi/font/fonts'),
      files: fs.readdirSync(path.resolve(__dirname, '../node_modules/@mdi/font/fonts')),
    },
    {
      from: path.resolve(__dirname, '../node_modules/material-icons/iconfont'),
      files: fs.readdirSync(path.resolve(__dirname, '../node_modules/material-icons/iconfont'))
        .filter(f => f.endsWith('.woff2') || f.endsWith('.woff') || f.endsWith('.ttf')),
    },
    {
      from: path.resolve(__dirname, '../node_modules/material-symbols'),
      files: fs.readdirSync(path.resolve(__dirname, '../node_modules/material-symbols'))
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
}

console.log('[START] build-pug.js avviato con argomenti:', process.argv);
console.log('[DEBUG] cwd:', path.resolve(__dirname, '..'));

if (process.argv.includes('--watch')) {
  // Prima compilazione
  const isDev = process.argv.includes('--dev');
  const cmd = isDev ? 'npm run build-assets-dev' : 'npm run build-assets';

  console.log('🛠️  Compilazione iniziale assets...');
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Errore iniziale build-assets:\n${stderr}`);
      return;
    }
    console.log(stdout);

    copyFonts();   // ← qui, una sola volta e DOPO build-assets
    copyDocs();    // ← idem, opzionale
    buildAllPages();

    // Avvia watcher solo dopo prima compilazione completa
    console.log('👀 Watch mode attivo con node-watch');

    watch(modulesDir, { recursive: true, filter: /\.html$/ }, (evt, name) => {
      console.log(`[WATCH] Evento ${evt} su ${name}`);
      if (evt === 'remove') {
        removePage(name);
      } else {
        rebuildAll(); // qui NON ricopi più i font
      }
    });

    watch(path.resolve(__dirname, '../views'), { recursive: true, filter: /\.pug$/ }, (evt, name) => {
      console.log(`[WATCH] Evento ${evt} su ${name}`);
      rebuildAll(); // qui NON ricopi più i font
    });
  });
} else {
  buildAllPages();
}