const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

const app = express();
const PORT = process.env.PORT || 8000;

// LiveReload setup
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
app.use(connectLivereload());

// Static file serving
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root to index
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

// Serve static HTML
app.get('*', (req, res, next) => {
  if (req.path.includes('.well-known')) {
    return res.status(404).end(); // ignora silenziosamente
  }
  const filePath = path.join(__dirname, 'public', req.path);
  res.sendFile(filePath, (err) => {
    if (err) next(); // fallback se il file non esiste
  });
});

// LiveReload browser refresh
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});