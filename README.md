# Exentriq Bootstrap 5 UI

Documentation and development project for Bootstrap 5 components with custom Exentriq styling.  
All components are written in HTML + SCSS, documented via Pug, and compiled as static pages.

## ⚙️ Installation

1. Clone the repository  
2. Install dependencies:  
   npm install

## 🚀 Development Startup

To start the development server, compile SCSS, and generate documentation with automatic watching:

npm run start-pug

This command:  
- Compiles SCSS into dist/styles.css  
- Applies Autoprefixer  
- Generates all static HTML pages from views/page.pug + views/modules/*.html modules  
- Automatically watches .html files (thanks to the included --watch option)  
- Starts a static server on port 8000 with hot reload

## 🛠️ Manual Build

To run individual steps manually:

### 1. Compile SCSS and apply Autoprefixer  
npm run build-css-autoprefixer

### 2. Generate HTML pages (documentation)  
npm run build-pug

You can also use:  
npm run build-pug -- --watch

In watch mode, the script:  
- Compiles all pages initially  
- Regenerates a page if a file in views/modules/ changes  
- Creates a new page if a .html file is added  
- Removes the HTML file from /public if the related module is deleted

## 📁 Project Structure

```
├── dist/                    # Output CSS
├── public/                 # Pagine HTML compilate
├── scss/                   # SCSS principali
├── views/
│   ├── modules/            # Moduli HTML da iniettare
│   ├── page.pug            # Template base unico
│   ├── _head.pug, etc.
├── scripts/
│   └── build-pug.js        # Script di compilazione
├── server.js               # Server di sviluppo statico
├── nodemon.json            # Configurazione server
└── package.json
```

## ❗️Notes and Common Errors

- If dist/styles.css is not regenerated, make sure you have installed sass (npm install sass).  
- If the browser shows wrong content while navigating (e.g., index.html even on buttons.html), make sure build-pug.js correctly generates the pages inside the public/ folder.

## ✅ Requirements

- Node.js >= 18  
- npm >= 8