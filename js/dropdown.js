
EqUI.dropdown = {};

EqUI.dropdown.element_class = 'eq-ui-dropdown';

$.fn.dropdown = function (option) {
    var defaults = {
        inDuration: 300,
        outDuration: 225,
        hover: true,
        gutter: 0,
        belowOrigin: false,
        close: false
    };

    this.each(function () {
        var origin = $(this);
        // Permettiamo il click anche sugli elementi figli (es: <i>)
        // --- PATCH: cattura click sui figli del trigger (icone, span, svg, etc.)
        origin.addClass('eq-ui-dropdown-trigger-auto');
        origin.data('dropdown-initialized', true);

        origin.find('*').each(function() {
            $(this).on('click', function(e) {
                console.log('[Dropdown DEBUG] click intercettato su child → rerouted a origin:', this);

                e.preventDefault();    // impedisce effetti waves
                e.stopPropagation();   // impedisce bubble verso html/document

                origin.trigger('click'); // reroute verso il trigger vero
            });
        });
        console.log('[Dropdown Init]', origin.attr('class'), origin.attr('data-target'));
        var options = $.extend({}, defaults, option);
        var targetId = origin.attr('data-target');

        // 1️⃣ Se data-target manca o è vuoto → NON è dropdown
        if (!targetId || !targetId.trim()) {
            console.warn("[EqUI Dropdown] Ignorato elemento con data-target vuoto:", origin.get(0));
            return;
        }

        var target = $("#" + targetId);

        // 2️⃣ Se l’ID non esiste → NON è dropdown
        if (!target.length) {
            console.warn("[EqUI Dropdown] Target inesistente per:", origin.get(0), " → ", targetId);
            return;
        }

        // 3️⃣ Se il target NON ha la classe eq-ui-dropdown → NON è dropdown
        if (!target.hasClass('eq-ui-dropdown')) {
            console.warn("[EqUI Dropdown] Target NON è un dropdown:", target.get(0));
            return;
        }

        // 4️⃣ Se il trigger NON è un tag valido →
        if (origin.is('input, textarea, select')) {
            console.warn("[EqUI Dropdown] Ignorato: elemento non valido come trigger dropdown:", origin.get(0));
            return;
        }

        console.log('[Dropdown Init] trigger valido:', origin.get(0), ' -> ', targetId);
        console.log('[Dropdown Target]', target.length ? 'Found' : 'Not found', target.attr('id'));

        var target_auto_align = $("#" + origin.attr('data-auto-align-target'));
        if (!target_auto_align || target_auto_align.length <= 0) {
            target_auto_align = $("." + origin.attr('data-auto-align-target'));
        }
        var is_auto_align = !!target_auto_align[0];
        var target_items = $("#" + origin.attr('data-target') + ' li');

        // Update options
        updateOptions();
        options.hover = false;

        // Is close option
        if (options.close) {
            dropdownClose(target);
            return;
        }

        // If below Origin
        if (options.belowOrigin) {
            target.addClass('eq-ui-dropdown-below-origin');
        }

        // Set Gutter
        setGutter(target);

        // Close on items click
        target_items.on('click', function (e) {
            var element = $(e.target);
            if (element.attr('data-target') === undefined) {
                dropdownClose(target);
            }
        });

        // Is Touch
        if (EqUI.site.isTouch) {
            origin.on('click', function (e) {
                console.log('[Dropdown Click Triggered]', origin.attr('class'), '->', target.attr('id'));
                dropdownOpen(target);
            });

            $('html').on('touchstart', function (e) {
                var element = $(e.target);
                if (!element.hasClass(EqUI.dropdown.element_class) && element.parents('.' + EqUI.dropdown.element_class).length !== 1) {
                    dropdownClose(target);
                }
            });
        } else {
            // Hover
            if (options.hover) {
                var _close_process = false;

                origin.on('mouseenter', function (e) {
                    dropdownOpen(target);
                    _close_process = false;
                });

                origin.on('mouseleave', function (e) {
                    _close_process = true;
                    setTimeout(function () {
                        if (_close_process) {
                            dropdownClose(target);
                            _close_process = false;
                        }
                    }, 350);
                });

                target.on('mouseleave', function (e) {
                    _close_process = true;
                    setTimeout(function () {
                        if (_close_process) {
                            dropdownClose(target);
                            _close_process = false;
                        }
                    }, 350);
                });

                target.on('mouseenter', function (e) {
                    _close_process = false;
                });
            } else { // CLICK MODE
                
                // 🔥 Patch aggiuntiva: clic sui contenuti interni NON chiude la dropdown
                target.on('click', function(e){
                    e.stopPropagation();
                });
            }
        }

        //----------------------
        // Helper Functions
        //----------------------

        // Dropdown Open
        function dropdownOpen(object) {
            console.log(
                '%c[Dropdown DEBUG] OPEN chiamato su ' + object.attr('id'),
                'color:#2196F3; font-weight:bold'
            );

            // 🔥 Chiudi tutti gli altri dropdown aperti
            $('.eq-ui-dropdown.open, .eq-ui-dropdown.active').not(object).each(function () {
                $(this).stop(true, false).slideUp(200).removeClass('open active');
            });

            // console.log('[Dropdown Open]', object.attr('id'));

            if (is_auto_align) {
                autoAlign(object);
            }

            if ((options.hover && !object.hasClass('active')) || (!options.hover && !object.hasClass('open'))) {

                if (!object.hasClass("active")) {
                    object.addClass('active');

                    object.stop(true, false).slideDown({
                        duration: options.inDuration, easing: "easeOutQuart", queue: false, complete: function () {
                            object.addClass('open');
                            $(this).css('height', '');
                        }
                    });
                }

            }
        }

        // Dropdown Close
        function dropdownClose(object) {
            console.log(
                '%c[Dropdown DEBUG] CLOSE chiamato su',
                'color:#E91E63; font-weight:bold',
                object && object.attr ? object.attr('id') : object,
                ' object=', object
            );

            // console.log('[Dropdown Close]', object.attr('id'));

            if ((options.hover && object.hasClass('active')) || (!options.hover && object.hasClass('open'))) {

                object.removeClass('active');

                object.stop(true, false).slideUp({
                    duration: options.outDuration, easing: "easeOutQuart", queue: false, complete: function () {
                        object.removeClass('open');
                        $(this).css('height', '');
                    }
                });

                // Close all dropdown children
                object.find('.' + EqUI.dropdown.element_class).each(function () {
                    var element = $(this);

                    element.removeClass('active');

                    element.stop(true, false).slideUp({
                        duration: (options.outDuration / 2), easing: "easeOutQuart", queue: false, complete: function () {
                            $(this).removeClass('open');
                            $(this).css('height', '');
                        }
                    });
                });
            }
        }

        // Auto Align
        function autoAlign(object) {
            // Clean
            object.removeClass('eq-ui-dropdown-right-top');
            object.removeClass('eq-ui-dropdown-left-bottom');
            object.removeClass('eq-ui-dropdown-right-bottom');

            var contSize = {
                width: target_auto_align.outerWidth(true),
                height: target_auto_align.outerHeight(true)
            }

            var targetSize = {
                width: object.outerWidth(true),
                height: object.outerHeight(true)
            }

            var originSize = {
                width: origin.outerWidth(true),
                height: origin.outerHeight(true)
            }

            var originPos = origin.offset();
            var contPos = target_auto_align.offset();
            var originOffset = {
                top: originPos.top - contPos.top,
                left: originPos.left - contPos.left
            }

            var isTop = false;
            var isBottom = false;
            var isLeft = false;
            var isRight = false;

            // Is Left/Right
            if ((originOffset.left + targetSize.width) <= contSize.width) {
                isLeft = true;
            } else if (((originOffset.left + originSize.width) - targetSize.width) >= 0) {
                isRight = true;
            }

            // Is Top/Bottom
            if (((originOffset.top + originSize.height) + targetSize.height) <= contSize.height) {
                isTop = true;
            } else if ((originOffset.top - targetSize.height) >= 0) {
                isBottom = true;
            }

            if (isRight && isTop) {
                object.addClass('eq-ui-dropdown-right-top');
            }

            if (isLeft && isBottom) {
                object.addClass('eq-ui-dropdown-left-bottom');
            }

            if (isRight && isBottom) {
                object.addClass('eq-ui-dropdown-right-bottom');
            }

            // Set Gutter
            setGutter(target);
        }

        // Set Gutter
        function setGutter(object) {
            if (options.gutter === 0) {
                return;
            }

            var origin_height = origin.outerHeight(true);

            // Bottom
            if (object.hasClass('eq-ui-dropdown-left-bottom') || object.hasClass('eq-ui-dropdown-right-bottom')) {

                // CSS
                object.css({
                    bottom: origin_height + options.gutter
                });

            } else { // Top

                // CSS
                object.css({
                    top: origin_height + options.gutter
                });
            }
        }

        // Update options
        function updateOptions() {
            if (origin.data('inDuration') !== undefined) {
                options.inDuration = origin.data('inDuration');
            }
            if (origin.data('outDuration') !== undefined) {
                options.outDuration = origin.data('outDuration');
            }
            if (origin.data('hover') !== undefined) {
                options.hover = origin.data('hover');
            }
            if (origin.data('gutter') !== undefined) {
                options.gutter = origin.data('gutter');
            }
            if (origin.data('belowOrigin') !== undefined) {
                options.belowOrigin = origin.data('belowOrigin');
            }
        }

    });
}; // End dropdown plugin

// Proteggi il plugin EqUI: impedisci sovrascritture successive
const eqDropdown = $.fn.dropdown;
Object.defineProperty($.fn, "dropdown", {
    configurable: false,
    enumerable: true,
    get() { return eqDropdown; },
    set(value) {
        console.warn("⛔ Tentativo di sovrascrivere $.fn.dropdown bloccato", value);
    }
});

// Init
EqUI.dropdown.init = function () {

};

// Update
EqUI.dropdown.update = function () {

};

// Load
// Override anche di EqUI.dropdown.load
// Load (versione neutra se non esiste)
if (typeof EqUI.dropdown.load !== "function") {
    EqUI.dropdown.load = function(selector){
        // versione base non fa nulla
        return;
    };
}
const originalLoad = EqUI.dropdown.load;
EqUI.dropdown.load = function(selector) {
    const result = originalLoad.call(this, selector);

    $(selector).each(function () {
        const el = $(this);

        // Identifica solo trigger reali
        const id = el.attr('data-target');
        if (!id) return;
        const menu = $('#' + id);
        if (!menu.length || !menu.hasClass('eq-ui-dropdown')) return;

        // Aggiungi marcatura SOLO se non già fatto
        if (!el.data('dropdown-initialized')) {
            el.addClass('eq-ui-dropdown-trigger-auto');
            el.data('dropdown-initialized', true);
        }
    });

    return result;
};

// READY & OBSERVE
if (EqUI.mutationObserver === null) {
    // Nessun observer attivo → inizializzazione diretta
    $(document).ready(function () {
        EqUI.dropdown.init();
        EqUI.dropdown.update();
        EqUI.dropdown.load(); // carica i dropdown standard
    });
} else {
    // Attiva osservatore per aggiunte dinamiche al DOM
    $(document).EqUIObserve('[data-target]', function () {
        $(this).dropdown();
    });
}

// --- PATCH universale: chiusura dropdown su click esterno ---
$(document).on('click', function (e) {
    // console.log('%c[Dropdown DEBUG] evento document.click', 'color:#FF9800; font-weight:bold', e.target);

    const $target = $(e.target);

    // Se clicco dentro un dropdown o su un trigger con data-target, non chiudere
    if ($target.closest('.' + EqUI.dropdown.element_class).length > 0) return;
    if ($target.closest('[data-target]').length > 0) return;

    // Chiudi tutti i dropdown aperti
    const $openDropdowns = $('.' + EqUI.dropdown.element_class + '.open, .' + EqUI.dropdown.element_class + '.active');
    if ($openDropdowns.length) {
        // console.log('[Dropdown Global Close] click esterno → chiudo tutti');
        $openDropdowns.stop(true, false).slideUp(200).removeClass('open active');
    }
});

document.addEventListener('click', function(e) {
    // Cerca qualsiasi trigger inizializzato dal plugin
    const trigger = e.target.closest('[data-target].eq-ui-dropdown-trigger-auto');
    if (!trigger) return;

    e.stopPropagation();
    e.preventDefault();

    setTimeout(() => {
        const id = trigger.getAttribute('data-target');
        if (!id) return;

        const $menu = $('#' + id);
        if (!$menu.length) return;

        // 🔥 SICUREZZA: procedi solo se è un vero dropdown EqUI
        if (!$menu.hasClass('eq-ui-dropdown')) return;

        // Toggle
        if ($menu.hasClass('open')) {
            $menu.stop(true, false).slideUp(200).removeClass('open active');
        } else {
            $menu.stop(true, false).slideDown(200).addClass('open active');
        }
    });
}, true);