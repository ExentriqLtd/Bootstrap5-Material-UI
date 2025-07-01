import $ from 'jquery';
export { $ };

import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';

// collega velocity a jquery come plugin: $.fn.velocity diventa disponibile
$.fn.velocity = Velocity;

import './global.js';
// js/index.js
import 'bootstrap'; // carica jQuery internamente, se serve

// Ora gli altri script possono usare import $ da 'jquery'
import './script1.js';
import './site.js';
import './observe.js';
import './buttons.js';
