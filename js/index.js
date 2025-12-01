import $ from './global'; // jQuery + librerie caricate

import 'jquery-ui/dist/jquery-ui.min';
import 'devbridge-autocomplete';

import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';

$.fn.velocity = Velocity;

// ora i tuoi script custom
import './helps/observe.js';
import './helps/sticky-table.js';
import './_init.js';
import './site.js';
import './layout/breadcrumb.js';
import './layout/side-nav.js';
import './buttons.js';
import './collapsible.js';
import './forms.js';
import './modals.js';
import './tabs.js';
import './table.js';
import './dropdown.js';
