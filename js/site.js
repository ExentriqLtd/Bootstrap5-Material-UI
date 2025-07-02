
EqUI.site = {};

// jQuery reverse
$.fn.reverse = [].reverse;

// Init
EqUI.site.init = function() {
    // Global vars
    EqUI.site.body = $('body');

    // Is touch
    EqUI.site.isTouch = 'ontouchstart' in window || 'msmaxtouchpoints' in window.navigator;
    if(EqUI.site.isTouch){ $('html').addClass("is-touch"); }

    // Set checkbox to indeterminate
    EqUI.site.set_checkbox_indeterminate();

    // Active js table
    EqUI.site.table_js();

    // Dismissable list
    EqUI.site.dismissableList();

    // Search
    EqUI.site.search('.eq-ui-search');

    // Search Top
    EqUI.site.search_top('.eq-ui-top-search');

    // Search Expandable
    EqUI.site.search_expandable('.eq-ui-search-expandable');
};

// Update
EqUI.site.update = function() {

    var _layout_header_offset = 0;
    var _layout_header = $('.eq-ui-layout-header');
    var _layout_header_primary = $('.eq-ui-layout-header-primary');

    // Is header primary visible
    if(_layout_header_primary.length){
        _layout_header_offset = _layout_header_primary.outerHeight(true);
        if(_layout_header_offset > 0){ _layout_header_offset = _layout_header_offset-1; }
        $('.eq-ui-side-nav').css('top', _layout_header_offset+'px');
    } else {
        $('.eq-ui-side-nav').css('top', '0px');
    }

    // Is header fixed layout
    if(EqUI.site.body.hasClass('eq-ui-layout-header-fixed')){
        _layout_header.css('top', _layout_header_offset+'px');
        EqUI.site.body.css('margin-top', _layout_header.outerHeight(true)+_layout_header_offset+'px');
        EqUI.site.body.css('height', 'calc(100% - '+(_layout_header.outerHeight(true)+_layout_header_offset)+'px)');
    } else {
        _layout_header.css('top', '0px');
        EqUI.site.body.css('margin-top', _layout_header_offset+'px');
        EqUI.site.body.css('height', '');
    }
    
    if (window.innerWidth > 768) {
        
        
    }
    else {

        
    }
};

/* --------------------------------------- */
/* Helps
/* --------------------------------------- */

// Set checkbox to indeterminate
EqUI.site.set_checkbox_indeterminate = function() {
    $('[type="checkbox"].indeterminate-checkbox').each(function(index, element) {
        element.indeterminate = true;
    });
};

// Active js table
EqUI.site.table_js = function() {

    // Select all checkboxes
    $('.eq-ui-data-table.eq-ui-data-table-js thead input[type="checkbox"]').click(function(e) {
        var _tbody = $(this).parents('table').children('tbody');
        var _is_checked = this.checked;

        _tbody.find('tr input[type="checkbox"]').each(function() {
            var _self = this;
            _self.checked = _is_checked;

            var _parent = $(this).parent().parent();

            if(_self.checked){
                _parent.addClass('is-selected');
            } else {
                _parent.removeClass('is-selected');
            }
        });
    });

    // Select checkbox
    $('.eq-ui-data-table.eq-ui-data-table-js tbody tr input[type="checkbox"]').click(function(e) {
        var _parent = $(this).parent().parent();

        if(this.checked){
            _parent.addClass('is-selected');
        } else {
            _parent.removeClass('is-selected');
        }
    });
};

// Get query string
EqUI.site.query_string = function () {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            query_string[pair[0]] = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();

// Toogle class
EqUI.site.toogle_class = function(element,class_name) {
    if($(element).hasClass(class_name)){
        $(element).removeClass(class_name);
    } else  {
        $(element).addClass(class_name);
    }
};

/* --------------------------------------- */
/* Search
/* --------------------------------------- */

EqUI.site.search = function(search_selector) {

    //----------------------
    // Search
    //----------------------
    var _serach_input_selector  = search_selector+' input';
    var _serach_action_clear_element  = $(search_selector+' .eq-ui-search-clear');

    // Add active when element has focus
    $(document).on('focus', _serach_input_selector, function () {
        var _element = $(this);
        var _element_parent = _element.parent();
        _element_parent.addClass('active');
    });

    // Remove active when element has out focus
    $(document).on('blur', _serach_input_selector, function () {
        var _element = $(this);
        var _element_parent = _element.parent();
        if (_element.val().length === 0) {
            _element_parent.removeClass('active');
        }
    });

    // Clear input search
    _serach_action_clear_element.on('click', function(e) {
        var _element = $(this);
        var _element_parent = _element.parent();
        _element_parent.removeClass('active');
        // Clear autocomplete
        if(_element_parent.find('autocomplete-suggestions')){
            _element_parent.find('input').autocomplete('hide');
        }
        _element_parent.find('input').val('');
    });
};

/* --------------------------------------- */
/* Search Top
/* --------------------------------------- */

EqUI.site.search_top = function(search_selector) {

    var _top_serach_element  = $(search_selector);
    var _top_serach_action_close_element  = $(search_selector+' .eq-ui-top-search-close');
    var _top_serach_action_show_element  = $('.eq-ui-top-search-show');

    // Show top search
    _top_serach_action_show_element.on('click', function(e) {
        _top_serach_element.css('visibility', 'visible');
        _top_serach_element.css('top', '0');
        _top_serach_element.find('input').focus();
    });

    // Close top search
    _top_serach_action_close_element.on('click', function(e) {
        var _element = $(this);
        var _element_parent = _element.parent();
        _top_serach_element.css('visibility', 'hidden');
        _top_serach_element.css('top', '-64px');

        // Clear search
        _element_parent.children('.eq-ui-search').removeClass('active');
        // Clear autocomplete
        if(_element_parent.find('autocomplete-suggestions')){
            _element_parent.children('.eq-ui-search').find('input').autocomplete('hide');
        }
        _element_parent.children('.eq-ui-search').find('input').val('');
    });
};

/* --------------------------------------- */
/* Search Expandable
/* --------------------------------------- */

EqUI.site.search_expandable = function(search_selector) {

    var _serach_expandable_action_show_element = $(search_selector + ' .eq-ui-serach-expandable-show');

    // Show search expandable
    _serach_expandable_action_show_element.on('click', function(e) {
        var _element = $(this);
        var _element_parent = _element.parent();
        _element_parent.addClass('active');

        // Set focus
        _element_parent.find('input').focus();
    });
};

/* --------------------------------------- */
/* Transitions
/* --------------------------------------- */

// Image fade
EqUI.site.fadeInImage = function(selector) {
    var element = $(selector);
    element.css({opacity: 0});
    $(element).velocity({opacity: 1}, {
        duration: 650,
        queue: false,
        easing: 'easeOutSine'
    });
    $(element).velocity({opacity: 1}, {
        duration: 1300,
        queue: false,
        easing: 'swing',
        step: function(now, fx) {
            fx.start = 100;
            var grayscale_setting = now/100;
            var brightness_setting = 150 - (100 - now)/1.75;

            if (brightness_setting < 100) {
                brightness_setting = 100;
            }
            if (now >= 0) {
                $(this).css({
                    "-webkit-filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)",
                    "filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)"
                });
            }
        }
    });
};

// Horizontal staggered list
EqUI.site.showStaggeredList = function(selector) {
    var time = 0;
    $(selector).find('li').velocity(
    { translateX: "-100px"},
    { duration: 0 });

    $(selector).find('li').each(function() {
        $(this).velocity(
        { opacity: "1", translateX: "0"},
        { duration: 800, delay: time, easing: [60, 10] });
        time += 120;
    });
};

// Dismissable list
EqUI.site.dismissableList = function() {
    // Touch Event
    var swipeLeft = false;
    var swipeRight = false;

    $('.dismissable').each(function () {
        const $el = $(this);
        let startX = 0;
        let currentX = 0;
        let touching = false;
      
        $el.on('touchstart', function (e) {
          if (e.originalEvent.touches.length === 1) {
            startX = e.originalEvent.touches[0].clientX;
            touching = true;
          }
        });
      
        $el.on('touchmove', function (e) {
          if (!touching) return;
      
          currentX = e.originalEvent.touches[0].clientX;
          const deltaX = currentX - startX;
      
          $el.velocity({ translateX: deltaX }, { duration: 0, queue: false });
        });
      
        $el.on('touchend', function (e) {
          if (!touching) return;
      
          const deltaX = currentX - startX;
          const threshold = $el.innerWidth() / 2;
      
          if (Math.abs(deltaX) > threshold) {
            const fullWidth = deltaX > 0 ? $el.innerWidth() : -$el.innerWidth();
      
            $el.velocity({ translateX: fullWidth }, {
              duration: 100,
              easing: 'easeOutQuad',
              complete: function () {
                $el.css('border', 'none');
                $el.velocity({ height: 0, padding: 0 }, {
                  duration: 200,
                  easing: 'easeOutQuad',
                  complete: function () {
                    $el.remove();
                  }
                });
              }
            });
          } else {
            $el.velocity({ translateX: 0 }, { duration: 100, easing: 'easeOutQuad' });
          }
      
          touching = false;
          startX = 0;
          currentX = 0;
        });
      });
};

$(document).ready(function() {
    // Init
    EqUI.site.init();

    // Update
    EqUI.site.update();
});
