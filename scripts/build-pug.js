const fs = require('fs');
const path = require('path');
const pug = require('pug');

const modulesDir = path.resolve(__dirname, '../views/modules');
const templatePath = path.resolve(__dirname, '../views/page.pug');
const outputDir = path.resolve(__dirname, '../public');

const files = fs.readdirSync(modulesDir).filter(file => file.endsWith('.html'));

files.forEach(file => {
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
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}