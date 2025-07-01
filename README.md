# Exentriq Bootstrap 5 UI

Documentation and development project for Bootstrap 5 components with custom Exentriq styling.  
All components are written in HTML + SCSS + JS, documented via Pug, and compiled as static pages.

## ⚙️ Installation

1. Clone the repository  
2. Install dependencies:  
   npm install

## 🚀 Development (DEV mode)

To start the development environment with file watchers and hot reload:

npm run dev

This command:
- Watches SCSS files and compiles them into dist/css/styles.css
- Watches JS files and compiles them into dist/js/exentriq-bootstrap-ui-5.min.js without minification
- Generates all static HTML pages from views/page.pug + views/modules/*.html
- Automatically watches .html and .pug files
- Starts a static server on port 8000 with hot reload

## 🏗️ Production Build (BUILD mode)

To build all assets and documentation for production:

npm run build

This will:
- Clean and prepare the dist/ directory
- Compile SCSS and apply Autoprefixer
- Minify the final CSS (dist/css/styles.css)
- Bundle and minify JS (dist/js/exentriq-bootstrap-ui-5.min.js)
- Copy Bootstrap's minified bundle JS to dist/js/
- Generate all HTML documentation pages

## 🛠️ Manual Tasks

### Compile SCSS + Autoprefixer + Minify:
npm run build-css
npm run autoprefixer
npm run minify-css

### Compile JS:
npm run build-js

### Generate HTML documentation:
npm run build-pug
# or for watch mode
npm run build-pug -- --watch

## 📁 Project Structure

├── dist/
│   ├── css/                        # Compiled CSS
│   └── js/                         # Compiled & minified JS
├── public/                         # Static documentation HTML pages
├── js/
│   ├── index.js                    # Entry point for JS bundling
│   └── other-scripts.js           # Other modules to be imported
├── scss/
│   └── styles.scss                 # Main SCSS entry file
├── views/
│   ├── modules/                    # HTML modules injected into templates
│   ├── page.pug                    # Base Pug template
│   └── _head.pug, etc.
├── scripts/
│   └── build-pug.js                # HTML generation script
├── server.js                       # Development server
├── nodemon.json                    # Server config
└── package.json

## 🧪 Available Scripts

Script:                Description:
--------------------------------------------------------------
npm run dev            Start full dev environment with watchers
npm run build          Production build: clean, compile, minify, copy
npm run build-css      Compile SCSS only
npm run watch-css      Watch SCSS for changes
npm run build-js       Bundle and minify JavaScript
npm run watch-js       Watch JS for changes
npm run build-pug      Compile all documentation pages
npm run build-pug -- --watch    Same as above, with live watch
npm run clean-dist     Delete all files in /dist
npm run prepare-dist   Recreate /dist/css and /dist/js folders

## ✅ Requirements

- Node.js >= 18  
- npm >= 8