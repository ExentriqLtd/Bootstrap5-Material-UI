# Progetto Bootstrap 5 e React

## Installazione e Utilizzo

### Bootstrap 5

**Installa le dipendenze**
* npm install
* cd react-component/
* npm install
* cd ..

**Avvia server di sviluppo e genera la documentazione su cui lavorare e fai la build del css.**
* npm run start-pug

**Avvia server di sviluppo + genera la documentazione + fai la build del css + genera la versione react della documentazione.**
* npm run start-all

**Se necessario, avvia anche server di sviluppo su React**
* cd react-component/
* npm run start

**Fai la build del css, della documentazione, e del progetto react per il rilascio**
* npm run build-css-autoprefixer
* npm run build-pug
* cd react-component/
* npm run build


** Errori
* Se segnala un errore sul file style.css già esistente, cancellare il symlink da react-component/src/styles.css e ripetere l'azione.