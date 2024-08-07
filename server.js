const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Servire file statici dalla cartella dist e public
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

// Route per la documentazione React
app.use('/react-docs', express.static(path.join(__dirname, 'public/react-docs')));

// Fallback per qualsiasi altra route
app.get('/react-docs/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/react-docs', 'index.html'));
});

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
