const { execSync } = require('child_process');

// Dati da passare ai template Pug
const docRoute = {
  root_path: '',
  path: 'index',
  name_section: '',
  name_chapter: 'Home'
};

// Compila i file Pug
try {
  execSync(`npx pug --obj '${JSON.stringify({ doc_route: docRoute })}' views/ -o public/ -P`, { stdio: 'inherit' });
  console.log('Pug files compiled successfully.');
} catch (error) {
  console.error('Error compiling Pug files:', error.message);
}
