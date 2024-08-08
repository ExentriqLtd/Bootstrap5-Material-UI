const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Configura Pug come motore di visualizzazione
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Servire file statici dalla cartella public e dist
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware per estrarre i parametri di query
app.use((req, res, next) => {
  res.locals.query = req.query;
  next();
});

// Route principale per servire index.pug
app.get('/', (req, res) => {
  res.render('index', { title: 'My App', query: req.query });
});

// Serve index.html for any other route
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
