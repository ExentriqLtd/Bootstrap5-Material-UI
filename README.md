# Exentriq Bootstrap 5 UI

Progetto di documentazione e sviluppo per componenti Bootstrap 5 con stile personalizzato Exentriq.  
Tutti i componenti sono scritti in HTML + SCSS, documentati tramite Pug e compilati come pagine statiche.

## ⚙️ Installazione

1. Clona il repository
2. Installa le dipendenze:
   npm install

## 🚀 Avvio in sviluppo

Per avviare il server di sviluppo, compilare SCSS e generare la documentazione:

npm run build-pug
npm run start-pug

Questo comando:
- Compila gli SCSS in dist/styles.css
- Applica Autoprefixer
- Genera le pagine HTML statiche da views/page.pug + moduli views/modules/*.html
- Avvia un server statico sulla porta 8000 con hot reload

I file HTML vengono creati nella cartella public/.

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

- Node.js >= 16
- npm >= 8