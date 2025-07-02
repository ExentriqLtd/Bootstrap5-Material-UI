// js/index.js
import $ from './global'; // importa una sola volta
import 'bootstrap';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';

$.fn.velocity = Velocity;

import './helps/observe.js';
import './buttons.js';
import './collapsible.js';
import './site.js';
import './layout/side-nav.js';
import './_init.js'
