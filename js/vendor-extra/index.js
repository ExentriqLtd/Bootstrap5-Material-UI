console.log('🔥 vendor-extra index loaded');

// ----- FASTCLICK -----
import FastClick from 'fastclick';

// l'export moderno è una factory → la assegno comunque su window
window.FastClick = FastClick;

// se non esiste FastClick.attach (versioni moderne), ricreo l’API legacy
if (typeof window.FastClick.attach !== 'function') {
  window.FastClick.attach = function(target) {
    // la factory moderna restituisce direttamente un'istanza
    return FastClick(target);
  };
}
console.log('✅ FastClick promoted with legacy .attach support');

// ---- npm + local plugins (initialized *after* jQuery is available) ----
function initVendorPlugins() {
    console.log('VENDOR-BUNDLE IS BEING USED');
    // npm packages
    require('exif-js');

    // jsonrpc
    require('./jsonrpc.js');
    if (typeof JSONRpcClient === 'function') {
        window.JSONRpcClient = JSONRpcClient;
        console.log('✅ JSONRpcClient promoted to window');
    } else {
        console.warn('⚠️ JSONRpcClient is not defined yet at this point');
    }

    require('enquire.js');
    require('./jquery_extension.js');
    require('./patternSelector.js');
    require('./jquery.fontselect.min.js');
    require('masonry-layout');
    require('imagesloaded');
    const riotMod = require('riot/riot+compiler.min.js');
    if (typeof window.riot === 'undefined' && riotMod) {
      window.riot = riotMod;
      console.log('✅ Riot promoted to window.riot');
    }

    require('./bootstrap-wysiwyg.js');
    require('jquery-hotkeys');
    require('./jquery-cloneya.js');
    require('./jquery.screwdefaultbuttons.js');
    require('magnific-popup');
    require('jquery-nestable');
    require('twitter-bootstrap-wizard');
    require('./bootstrap.lightbox.js');
    // --- jquery.validate
    require('./jquery.validate.js');
    if (!window.jQuery.fn.validate) {
        if (typeof window.validate === 'function') {
            console.log('✅ validate export found → invoking with jQuery');
            window.validate(window.jQuery);
        } else {
            console.warn('⚠️ validate plugin did not attach → forcing $.fn.validate');
            window.jQuery.fn.validate = require('./jquery.validate.js');
        }
    }

    require('./popupWindow.js');
    require('./jquery.polyglot.language.switcher.js');
    require('nanoscroller');

    // 1) carica il plugin (creerà una nuova instanza di jQuery interna)
    require('./jquery.cookie.js');

    // 2) se la funzione è stata attaccata su un altro jQuery, la ricopio sul nostro
    if (window.jQuery && !window.jQuery.cookie) {
        const pluginJquery = require('jquery'); // <-- la copia "interna"
        if (pluginJquery.cookie) {
            console.log('✅ copying $.cookie from internal copy to window.jQuery');
            window.jQuery.cookie = pluginJquery.cookie;
        } else {
            console.warn('⚠️ $.cookie not found (neither internal nor global)');
        }
    }

    require('jquery-mousewheel');
    // --- toastr
    require('./toastr.min.js');
    if (typeof window.toastr === 'undefined') {
        console.warn('⚠️ toastr not found → forcing window.toastr');
        window.toastr = require('./toastr.min.js');
    }

    require('jquery-smooth-scroll');
}

// Execute only when jQuery is available
(function waitForjQuery() {
    if (window.jQuery) {
        console.log('✅ jQuery ready → init vendor');
        initVendorPlugins();
    } else {
        console.log('⏳ waiting for jQuery…');
        setTimeout(waitForjQuery, 50);
    }
})();