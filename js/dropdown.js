EqUI.dropdown = {};

// Init
EqUI.dropdown.init = function () {
    // Nessuna inizializzazione necessaria se usi solo HTML Bootstrap
};

// Update
EqUI.dropdown.update = function () {
    // Esempio: chiudere tutti i dropdown aperti
    var dropdowns = bootstrap.Dropdown.getInstance(document.querySelectorAll('.dropdown-toggle'));
    if (dropdowns) {
        dropdowns.hide?.();
    }
};

// Load (se vuoi instanziare manualmente i dropdown)
EqUI.dropdown.load = function () {
    document.querySelectorAll('.dropdown-toggle').forEach(function (el) {
        new bootstrap.Dropdown(el);
    });
};

// Observe nuovi dropdown
if (EqUI.mutationObserver === null) {
    EqUI.dropdown.load();
} else {
    $(document).EqUIObserve('.dropdown-toggle', function () {
        new bootstrap.Dropdown(this);
    });
}

$(document).ready(function () {
    EqUI.dropdown.init();
});