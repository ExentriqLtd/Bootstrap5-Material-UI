$( document ).ready(function() {
    $('.toggleDocSidebar').click(function(e) {
        e.preventDefault(); // Evita che il link esegua la sua azione di default
        $('body').toggleClass('eq-side-nav-hide');
      });
});