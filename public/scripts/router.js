document.addEventListener("DOMContentLoaded", function() {
    const routes = {
      '/': '/modules/_index.html',
      '/about': '/modules/_about.html',
      '/contact': '/modules/_contact.html'
    };
  
    function loadContent(path) {
      const contentDiv = document.getElementById('content');
      const route = routes[path] || routes['/'];
      fetch(route)
        .then(response => response.text())
        .then(html => {
          contentDiv.innerHTML = html;
        })
        .catch(error => console.error('Error loading content:', error));
    }
  
    function router() {
      const path = window.location.hash.slice(1) || '/';
      loadContent(path);
    }
  
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
  });
  