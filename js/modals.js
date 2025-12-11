EqUI.modals = {};

EqUI.modals.element = $('.eq-ui-modal');
EqUI.modals.action_close_selector = '.eq-ui-modal-close';
EqUI.modals.overlay_selector = '.eq-ui-modal-overlay';
EqUI.modals.overlay_class = 'eq-ui-modal-overlay';
EqUI.modals.top_sheet_class = 'eq-ui-modal-top-sheet';
EqUI.modals.bottom_sheet_class = 'eq-ui-modal-bottom-sheet';
EqUI.modals.left_sheet_class = 'eq-ui-modal-left-sheet';
EqUI.modals.right_sheet_class = 'eq-ui-modal-right-sheet';
EqUI.modals.full_sheet_class = 'eq-ui-modal-full-sheet';

EqUI.modals.stack = 0;
EqUI.modals.last_id = 0;
EqUI.modals.base_zindex = 3000;

EqUI.modals.generate_id = function () {
    EqUI.modals.last_id++;
    return 'eq-ui-modal-overlay-' + EqUI.modals.last_id;
};

// Open Modal
$.fn.extend({
    openModal: function (options) {
        var $modal = $(this);

        // AUTO-DETECT: se è modale Bootstrap, usa .modal('show') nativo
        if ($modal.hasClass('modal') && !$modal.hasClass('eq-ui-modal')) {
            $modal.modal('show');
            return;
        }

        // Altrimenti continua con comportamento EqUI
        EqUI.site.body.css('overflow', 'hidden');

        var defaults = {
            opacity: 0.5,
            in_duration: 350,
            out_duration: 250,
            ready: undefined,
            complete: undefined,
            dismissible: true,
            starting_top: '4%'
        };

        var overlayID = EqUI.modals.generate_id(),
            $overlay = $('<div class="' + EqUI.modals.overlay_class + '"></div>'),
            lStack = (++EqUI.modals.stack);

        $overlay.attr('id', overlayID).css('z-index', EqUI.modals.base_zindex + lStack * 2);
        $modal.data('overlay-id', overlayID).css('z-index', EqUI.modals.base_zindex + lStack * 2 + 1);

        EqUI.site.body.append($overlay);

        options = $.extend(defaults, options);

        if (options.dismissible) {
            $overlay.on('click', function () {
                $modal.closeModal(options);
            });

            $(document).on('keyup.leanModal' + overlayID, function (e) {
                if (e.keyCode === 27) {
                    $modal.closeModal(options);
                }
            });
        }

        $modal.find(EqUI.modals.action_close_selector).on('click.close', function (e) {
            $modal.closeModal(options);
        });

        $overlay.css({ display: "block", opacity: 0 });
        $modal.css({ display: "block", opacity: 0 });

        $overlay.velocity({ opacity: options.opacity }, { duration: options.in_duration, easing: "easeOutCubic" });
        $modal.data('associated-overlay', $overlay[0]);

        // Transizioni EqUI
        if ($modal.hasClass(EqUI.modals.top_sheet_class) || $modal.hasClass(EqUI.modals.full_sheet_class)) {
            $modal.velocity({ top: "0px", opacity: 1 }, {
                duration: options.in_duration,
                easing: "easeOutCubic",
                complete: options.ready
            });
        } else if ($modal.hasClass(EqUI.modals.bottom_sheet_class)) {
            $modal.velocity({ bottom: "0px", opacity: 1 }, {
                duration: options.in_duration,
                easing: "easeOutCubic",
                complete: options.ready
            });
        } else if ($modal.hasClass(EqUI.modals.left_sheet_class)) {
            $modal.velocity({ left: "0px", opacity: 1 }, {
                duration: options.in_duration,
                easing: "easeOutCubic",
                complete: options.ready
            });
        } else if ($modal.hasClass(EqUI.modals.right_sheet_class)) {
            $modal.velocity({ right: "0px", opacity: 1 }, {
                duration: options.in_duration,
                easing: "easeOutCubic",
                complete: options.ready
            });
        } else {
            $.Velocity.hook($modal, "scaleX", 0.7);
            $modal.css({ top: options.starting_top });
            $modal.velocity({ top: "10%", opacity: 1, scaleX: '1' }, {
                duration: options.in_duration,
                easing: "easeOutCubic",
                complete: options.ready
            });
        }
    }
});

// Close Modal
$.fn.extend({
    closeModal: function (options) {
        var $modal = $(this);

        // AUTO-DETECT: se è una modale Bootstrap, chiama direttamente .modal('hide')
        if ($modal.hasClass('modal') && !$modal.hasClass('eq-ui-modal')) {
            $modal.modal('hide');
            return;
        }

        // Modale EqUI (comportamento originale)
        var defaults = {
            out_duration: 250,
            complete: undefined,
            starting_top: '4%',
        };

        options = $.extend(defaults, options);

        var overlayID = $modal.data('overlay-id'),
            $overlay = $('#' + overlayID);

        if ($(EqUI.modals.overlay_selector).length < 2) {
            $('body').css('overflow', '');
        }

        $modal.find(EqUI.modals.action_close_selector).off('click.close');
        $(document).off('keyup.leanModal' + overlayID);

        $overlay.velocity({ opacity: 0 }, { duration: options.out_duration, easing: "easeOutQuart" });

        // Chiudi con animazione
        var closeCallback = function () {
            $overlay.css({ display: "none" });

            if (typeof options.complete === "function") {
                options.complete();
            }

            $overlay.remove();
            EqUI.modals.stack--;
        };

        if ($modal.hasClass(EqUI.modals.top_sheet_class) || $modal.hasClass(EqUI.modals.full_sheet_class)) {
            $modal.velocity({ top: "-100%", opacity: 0 }, {
                duration: options.out_duration,
                easing: "easeOutCubic",
                complete: closeCallback
            });
        } else if ($modal.hasClass(EqUI.modals.bottom_sheet_class)) {
            $modal.velocity({ bottom: "-100%", opacity: 0 }, {
                duration: options.out_duration,
                easing: "easeOutCubic",
                complete: closeCallback
            });
        } else if ($modal.hasClass(EqUI.modals.left_sheet_class)) {
            $modal.velocity({ left: "-100%", opacity: 0 }, {
                duration: options.out_duration,
                easing: "easeOutCubic",
                complete: closeCallback
            });
        } else if ($modal.hasClass(EqUI.modals.right_sheet_class)) {
            $modal.velocity({ right: "-100%", opacity: 0 }, {
                duration: options.out_duration,
                easing: "easeOutCubic",
                complete: closeCallback
            });
        } else {
            $modal.velocity({ top: options.starting_top, opacity: 0, scaleX: 0.7 }, {
                duration: options.out_duration,
                complete: function () {
                    $(this).css('display', 'none');
                    closeCallback();
                }
            });
        }
    }
});

// Lean Modal
$.fn.extend({
    leanModal: function (option) {
        return this.each(function () {

            var defaults = {
                starting_top: '4%'
            },
            options = $.extend(defaults, option);

            $(this).click(function (e) {
                e.preventDefault();

                options.starting_top =
                    ($(this).offset().top - $(window).scrollTop()) / 1.15;

                // 🔥 PRIORITÀ:
                // 1) data-modal → modale EqUI
                // 2) href → fallback legacy
                // 3) data-target → compatibilità vecchio codice
                var modal_id =
                    $(this).attr("data-modal") ||
                    $(this).attr("href") ||
                    '#' + $(this).attr("data-target");

                if (!modal_id) {
                    console.warn("leanModal: nessuna modale trovata per", this);
                    return;
                }

                $(modal_id).openModal(options);
            });
        });
    }
});

// Init
EqUI.modals.init = function () {

};

// Update
EqUI.modals.update = function () {

};

$(document).on('click', '.eq-ui-modal-close', function (e) {
    e.preventDefault();

    var $btn = $(this);
    var $modal = $btn.closest('.eq-ui-modal, .modal');

    if ($modal.length === 0) return;

    // Se è una modale EqUI
    if ($modal.hasClass('eq-ui-modal')) {
        $modal.closeModal();
    }
    // Se è una modale Bootstrap
    else if ($modal.hasClass('modal')) {
        $modal.modal('hide');
    }
});

$(document).ready(function () {
    // Init
    EqUI.modals.init();

    // Update
    EqUI.modals.update();
});
