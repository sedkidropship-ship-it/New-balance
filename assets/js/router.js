const Router = (() => {
  const routes = {};

  const init = () => {
    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange();
  };

  const addRoute = (hash, renderer) => {
    routes[hash] = renderer;
  };

  const handleRouteChange = () => {
    let hash = window.location.hash || '#home';
    let routeMatch = hash;
    let params = null;

    if (hash.startsWith('#product/')) {
       routeMatch = '#product';
       params = hash.split('/')[1];
    } else if (hash.startsWith('#shop/')) {
       routeMatch = '#shop';
       params = decodeURIComponent(hash.split('/')[1]);
    }

    const homeSections = ['#home', '#hero', '#collections', '#products', '#about', '#contact'];
    const isHomeRoute = homeSections.some(sec => routeMatch.startsWith(sec));

    const appView = document.getElementById('app-view');
    const mainContent = document.getElementById('main-content');

    if (isHomeRoute) {
      mainContent.style.display = 'block';
      appView.style.display = 'none';
      appView.innerHTML = '';
      
      // Scroll to the specific section if hash points to one
      if (hash && hash !== '#home') {
        const target = document.querySelector(hash);
        if (target) {
          const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;
          const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
        }
      }
      
      // Trigger animations for home if needed
      if (typeof window.initScrollAnimations === 'function') {
        setTimeout(window.initScrollAnimations, 100);
      }
    } else {
      mainContent.style.display = 'none';
      appView.style.display = 'block';
      const renderer = routes[routeMatch];
      if (renderer) {
        appView.innerHTML = renderer(params);
      } else {
        appView.innerHTML = `<div class="section-container" style="padding: 150px 0; text-align: center;"><h2>Page non trouvée</h2></div>`;
      }
      window.scrollTo(0,0);
    }
    
    document.dispatchEvent(new Event('routeChanged'));
  };

  return { init, addRoute };
})();
