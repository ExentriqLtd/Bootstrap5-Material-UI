# Exentriq Bootstrap 5 UI

Progetto di documentazione e sviluppo per componenti Bootstrap 5 con stile personalizzato Exentriq.  
Tutti i componenti sono scritti in HTML + SCSS, documentati tramite Pug e compilati come pagine statiche.

## ⚙️ Installazione

1. Clona il repository
2. Installa le dipendenze:
   npm install

## 🚀 Avvio in sviluppo

Per avviare il server di sviluppo, compilare SCSS e generare la documentazione con monitoraggio automatico:

npm run start-pug

Questo comando:
- Compila gli SCSS in dist/styles.css
- Applica Autoprefixer
- Genera tutte le pagine HTML statiche da views/page.pug + moduli views/modules/*.html
- Monitora automaticamente i file .html (grazie all’opzione --watch inclusa)
- Avvia un server statico sulla porta 8000 con hot reload

## 🛠️ Build manuale

Se vuoi eseguire i vari passaggi manualmente:

### 1. Compilare SCSS e applicare Autoprefixer
npm run build-css-autoprefixer

### 2. Generare le pagine HTML (documentazione)
npm run build-pug

Puoi anche usare:
npm run build-pug -- --watch

In modalità watch, lo script:
- compila tutte le pagine inizialmente
- rigenera la pagina se un file in views/modules/ viene modificato
- crea la nuova pagina se un file .html viene aggiunto
- rimuove il file HTML da /public se il relativo modulo viene eliminato

## 📁 Struttura del progetto

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

## ❗️Note e errori comuni

- Se il file dist/styles.css non viene rigenerato, assicurati di aver installato sass (npm install sass).
- Se il browser mostra contenuti errati durante la navigazione (es. index.html anche su buttons.html), assicurati che build-pug.js generi correttamente le pagine nella cartella public/.

## ✅ Requisiti

- Node.js >= 18
- npm >= 8