const _this = EqUI.init;
_this.Waves = Waves;

// Stato interno per Waves
_this.WavesIsInit = false;

// Inizializza Waves se necessario
_this.initWaves = function () {
    if (_this.WavesIsInit) return;

    _this.Waves.init();
    _this.Waves.attach('.eq-ui-waves', ['waves-effect']);
    _this.Waves.attach('.eq-ui-waves-light', ['waves-effect', 'waves-light']);
    _this.WavesIsInit = true;

    console.log('[Waves] Inizializzato');
};

// Init (chiamato a ready)
_this.init = function () {
    _this.initWaves();
    // Altre inizializzazioni future...
};

// Update
_this.update = function () {
    EqUI.app_bar?.update();
    EqUI.side_nav?.update();
    EqUI.breadcrumb?.update();
    EqUI.table?.update();
    EqUI.buttons?.update();
    EqUI.cards?.update();
    EqUI.forms?.update();
    EqUI.collapsible?.update();
    EqUI.dropdown?.update();
    EqUI.modals?.update();
    EqUI.tabs?.update();
    EqUI.site?.update();
};

// Load (post-window-load)
_this.load = function () {
    EqUI.site?.update();
    EqUI.site?.body?.css('visibility', 'visible');
    EqUI.breadcrumb?.load();
    EqUI.dropdown?.load();
    EqUI.tabs?.load();
};

// ⏱ Mutation Observer per elementi dinamici
if (EqUI.mutationObserver !== null) {
    $(document).EqUIObserve('.eq-ui-waves', function () {
        _this.initWaves();
        _this.Waves.attach(this, ['waves-effect']);
    }, function () {
        _this.Waves.calm(this);
    });

    $(document).EqUIObserve('.eq-ui-waves-light', function () {
        _this.initWaves();
        _this.Waves.attach(this, ['waves-effect', 'waves-light']);
    }, function () {
        _this.Waves.calm(this);
    });
}

// DOM Ready
$(document).ready(function () {
    _this.init();

    $(window).resize(function () {
        _this.update();
    });

    $(window).on('load', function () {
        _this.load();
    });
});