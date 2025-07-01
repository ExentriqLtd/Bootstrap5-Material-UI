// js/index.js
import 'bootstrap'; // carica jQuery internamente, se serve
import $ from 'jquery';
window.$ = $;
window.jQuery = $;

// Ora gli altri script possono usare import $ da 'jquery'
import './script1.js';