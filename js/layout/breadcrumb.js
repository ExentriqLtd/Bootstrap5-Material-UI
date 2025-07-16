EqUI.breadcrumb = {};
var _this = function(){return EqUI.breadcrumb;}();

_this.breadcrumb_class = 'eq-ui-breadcrumb';
_this.breadcrumb_min_class = 'eq-ui-breadcrumb-min';
_this.breadcrumb_item_class = 'eq-ui-breadcrumb-item';
_this.breadcrumb_item_truncate_class = 'eq-ui-breadcrumb-item-truncate';
_this.breadcrumb_item_min_class = 'eq-ui-breadcrumb-item-min';
_this.breadcrumb_item_hide_class = 'eq-ui-breadcrumb-item-hide';
_this.last_children_hiden_old_width = 0;

// Init
_this.init = function() {
    // Render
    _this.render();

    // Detect resize
    $('#main-eq-ui-app-bar').on('elementResize', function(event) {
        // Render
        _this.render();
    });
};

// Update
_this.update = function() {
    // Render
    _this.render();
};

// Load
_this.load = function() {
    // Render
    _this.render();
};

// Render
_this.render = function () {
    $('.' + _this.breadcrumb_class).each(function () {
        const $breadcrumb = $(this);
        const $wrapper = $breadcrumb.closest('.eq-ui-breadcrumb-wrapper');
        const only_one = $breadcrumb.data('onlyOne') === true || $breadcrumb.data('onlyOne') === "true";

        // 🔧 Reset prima di tutto
        $breadcrumb.removeClass(_this.breadcrumb_min_class);
        const items = $breadcrumb.children('.' + _this.breadcrumb_item_class);
        items.removeClass(_this.breadcrumb_item_hide_class)
             .removeClass(_this.breadcrumb_item_truncate_class)
             .removeClass(_this.breadcrumb_item_min_class);

        // 🧪 Misurazione naturale
        const $clone = $breadcrumb.clone()
            .css({
                position: 'absolute',
                visibility: 'hidden',
                width: 'auto',
                maxWidth: 'none',
                flex: 'none',
                whiteSpace: 'nowrap'
            })
            .appendTo('body');

        const breadcrumbNaturalWidth = $clone.outerWidth(true);
        $clone.remove();

        const wrapperEl = $wrapper.get(0);
        const wrapperWidth = wrapperEl.clientWidth;
        const overflow = breadcrumbNaturalWidth > wrapperWidth;

        if (overflow && only_one && items.length > 1) {
            console.log('⚠️ Overflow rilevato – riduco a un solo elemento');

            const visibleLast = $(items[items.length - 1]);
            const indicatorItem = $(items[items.length - 2]);

            $breadcrumb.addClass(_this.breadcrumb_min_class);
            items.slice(0, -1).addClass(_this.breadcrumb_item_hide_class);
            indicatorItem.addClass(_this.breadcrumb_item_min_class);

        } else if (items.length === 1) {
            $(items[0]).addClass(_this.breadcrumb_item_truncate_class);
        } else {
            console.log('✅ Nessun overflow – mostro tutti gli elementi');
        }
    });
};

// Ready
$(document).ready(function() {
    // Init
    _this.init();

    // Update
    _this.update();
});