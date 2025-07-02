import $ from './global'; // jQuery + librerie caricate
import 'bootstrap';

import 'jquery-ui/dist/jquery-ui.min';
import 'jquery-ui/ui/widget';
import 'jquery-ui/ui/widgets/autocomplete';
import "jquery-ui/themes/base/autocomplete.css";

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
import './dropdown.js';
import './tabs.js';
import './modals.js';
import './forms.js';
import './table.js';
