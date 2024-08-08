const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Configura Pug come motore di visualizzazione
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Servire file statici dalla cartella dist e public
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

// Route principale
app.get('/', (req, res) => {
  res.render('layout', { title: 'My App' });
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
