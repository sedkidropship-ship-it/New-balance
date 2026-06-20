const renderShop = (category) => {
  let products = Store.getProducts();
  if (category) {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  let html = `
    <section class="shop-section">
      <div class="section-container">
        <header class="section-header">
          <div class="section-eyebrow">
            <span class="eyebrow-line-sm"></span>
            <span>Notre Catalogue</span>
            <span class="eyebrow-line-sm"></span>
          </div>
          <h2 class="section-title">
            Collection <span class="gold-text">${category ? category : 'Complète'}</span>
          </h2>
          ${category ? `
            <div style="margin-top: 1rem;">
              <a href="#shop" style="color: var(--color-gold); text-decoration: none; font-size: 0.95rem; display: inline-flex; align-items: center; gap: 0.5rem; transition: opacity var(--transition-fast);" onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1">
                <span>←</span> Voir toutes les catégories
              </a>
            </div>
          ` : ''}
        </header>

        <div class="collections-grid shop-grid">
          ${products.map(p => `
            <article class="collection-card">
              <div class="card-image-wrap" onclick="window.location.hash='#product/${p.id}'" style="cursor:pointer;">
                <img src="${p.image}" alt="${p.name}" class="card-img" />
                <div class="card-overlay"></div>
                <button class="wishlist-btn ${Store.getWishlist().includes(p.id) ? 'active' : ''}" onclick="event.stopPropagation(); Store.toggleWishlist(${p.id}); this.classList.toggle('active')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
              </div>
              <div class="card-body">
                <div class="card-category">${p.category}</div>
                <h3 class="card-title" onclick="window.location.hash='#product/${p.id}'" style="cursor:pointer; transition: color var(--transition-fast);" onmouseover="this.style.color='var(--color-gold)'" onmouseout="this.style.color='white'">${p.name}</h3>
                <div class="card-footer">
                  <span class="card-price">${p.price.toLocaleString()} DA</span>
                  <button class="btn-gold btn-sm" onclick="Store.addToCart(${p.id}); showToast('Ajouté au panier')">Ajouter</button>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
  return html;
};
