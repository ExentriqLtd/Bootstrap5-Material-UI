// js/index.js
import $ from './global'; // importa una sola volta
import 'bootstrap';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';

$.fn.velocity = Velocity;

import './observe.js';
import './buttons.js';
import './collapsible.js';
import './site.js';
import './side-nav.js';