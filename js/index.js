import $ from './global'; // jQuery + librerie caricate

import 'jquery-ui/dist/jquery-ui.min';
import 'devbridge-autocomplete';

import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';


$.fn.velocity = Velocity;
$.Velocity = Velocity;

function eqUiSyncJQueryPlugins() {
    const sourceFn = $.fn;
    if (!sourceFn) return;

    const pluginNames = [
        'eq_select',
        'eq_collapsible',
        'tabs',
        'openModal',
        'closeModal',
        'dropdown',
        'parsley',
    ];

    const candidates = [];
    if (typeof window !== 'undefined') {
        candidates.push(window.$, window.jQuery);
    }
    if (typeof Package !== 'undefined' && Package && Package.jquery) {
        candidates.push(Package.jquery.$, Package.jquery.jQuery);
    }

    candidates.forEach((jq) => {
        if (!jq || !jq.fn) return;
        pluginNames.forEach((name) => {
            if (typeof sourceFn[name] === 'function' && typeof jq.fn[name] !== 'function') {
                jq.fn[name] = sourceFn[name];
            }
        });
    });
}

function eqUiSyncVelocity() {
    const candidates = [];
    if (typeof window !== 'undefined') {
        candidates.push(window.$, window.jQuery);
    }
    if (typeof Package !== 'undefined' && Package && Package.jquery) {
        candidates.push(Package.jquery.$, Package.jquery.jQuery);
    }

    candidates.forEach((jq) => {
        if (!jq) return;
        if (typeof jq.Velocity === 'undefined') {
            jq.Velocity = Velocity;
        }
        if (jq.fn && typeof jq.fn.velocity !== 'function') {
            jq.fn.velocity = Velocity;
        }
    });
}

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


eqUiSyncJQueryPlugins();
eqUiSyncVelocity();
$(document).ready(() => {
    eqUiSyncJQueryPlugins();
    eqUiSyncVelocity();
});
