const renderProduct = (id) => {
  const product = Store.getProduct(id);
  if (!product) return `<div class="section-container" style="padding: 150px 0; text-align: center;"><h2>Produit non trouvé</h2></div>`;

  return `
    <section class="product-detail-page" style="padding: 120px 0 60px;">
      <div class="section-container">
        
        <!-- Breadcrumbs -->
        <nav aria-label="breadcrumb" style="margin-bottom: 2rem; font-size: 0.9rem; color: #888;">
          <a href="#home" style="color: inherit; text-decoration: none;">Accueil</a>
          <span style="margin: 0 0.5rem;">/</span>
          <a href="#shop" style="color: inherit; text-decoration: none;">Boutique</a>
          <span style="margin: 0 0.5rem;">/</span>
          <a href="#" style="color: inherit; text-decoration: none;">${product.category}</a>
          <span style="margin: 0 0.5rem;">/</span>
          <span class="gold-text">${product.name}</span>
        </nav>

        <div class="product-detail" style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;">
          
          <!-- Product Info -->
          <div class="product-info-pro">
            <h1 style="font-family: var(--font-heading); font-size: 2.5rem; margin-bottom: 0.5rem; line-height: 1.2;">${product.name}</h1>
            
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
              <div style="color: var(--color-gold); display: flex; gap: 0.2rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <span style="color: #888; font-size: 0.9rem;">(24 Avis clients)</span>
            </div>

            <div style="font-size: 2rem; font-weight: bold; font-family: var(--font-heading); color: var(--color-gold); margin-bottom: 1.5rem;">
              ${product.price.toLocaleString()} <span style="font-size: 1rem;">DA</span>
            </div>

            <p style="color: #ccc; line-height: 1.6; margin-bottom: 2rem; font-size: 1.05rem;">
              ${product.description} Conçu avec des matériaux premium pour assurer longévité et élégance. Ce meuble s'intègre parfaitement dans un intérieur moderne et luxueux.
            </p>

            <div style="margin-bottom: 2rem; border-top: 1px solid var(--color-border); padding-top: 2rem;">
              <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <label style="font-weight: bold; width: 80px;">Quantité</label>
                <div style="display: flex; align-items: center; border: 1px solid var(--color-border); border-radius: 4px; overflow: hidden; background: var(--color-surface);">
                  <button onclick="document.getElementById('qty').value = Math.max(1, parseInt(document.getElementById('qty').value) - 1)" style="padding: 0.5rem 1rem; background: transparent; color: white; border: none; border-right: 1px solid var(--color-border); cursor: pointer;">-</button>
                  <input type="number" id="qty" value="1" min="1" style="width: 50px; text-align: center; background: transparent; color: white; border: none; -moz-appearance: textfield;" />
                  <button onclick="document.getElementById('qty').value = parseInt(document.getElementById('qty').value) + 1" style="padding: 0.5rem 1rem; background: transparent; color: white; border: none; border-left: 1px solid var(--color-border); cursor: pointer;">+</button>
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
              <button class="btn-gold" style="flex: 1; padding: 1rem;" onclick="Store.addToCart(${product.id}, parseInt(document.getElementById('qty').value)); showToast('Ajouté au panier'); window.location.hash='#cart'">
                Ajouter au Panier
              </button>
              <button class="btn-ghost" style="padding: 1rem;" onclick="Store.toggleWishlist(${product.id}); this.style.color = 'var(--color-gold)';">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>
            </div>

            <!-- Trust Features -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: var(--color-surface); padding: 1.5rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon></svg>
                <span style="font-size: 0.9rem;">Livraison Offerte</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                <span style="font-size: 0.9rem;">Installation Incluse</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <span style="font-size: 0.9rem;">Garantie 2 Ans</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span style="font-size: 0.9rem;">Support 24/7</span>
              </div>
            </div>

          </div>
          
          <!-- Image Gallery -->
          <div class="product-gallery-pro">
            <div class="gallery-main" style="border-radius: var(--radius-md); overflow: hidden; background: var(--color-surface); border: 1px solid var(--color-border); aspect-ratio: 4/3; position: relative;">
              <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" />
              <div style="position: absolute; top: 1rem; left: 1rem; background: var(--color-gold); color: black; padding: 0.25rem 0.75rem; border-radius: 4px; font-weight: bold; font-size: 0.8rem;">En Stock</div>
            </div>
            <div class="gallery-thumbs" style="display: flex; gap: 1rem; margin-top: 1rem;">
              <div style="width: 80px; height: 80px; border-radius: var(--radius-sm); border: 2px solid var(--color-gold); overflow: hidden; cursor: pointer;">
                <img src="${product.image}" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <!-- Placeholder for more thumbs -->
              <div style="width: 80px; height: 80px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); overflow: hidden; cursor: pointer; opacity: 0.6;">
                <img src="${product.image}" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%);" />
              </div>
            </div>
          </div>
        </div>

        <!-- Description & Specs Tabs -->
        <div style="margin-top: 5rem; border-top: 1px solid var(--color-border); padding-top: 3rem;">
          <h2 style="font-family: var(--font-heading); margin-bottom: 2rem;">Détails du Produit</h2>
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 4rem;">
            <div>
              <h3 style="color: var(--color-gold); margin-bottom: 1rem;">Description Complète</h3>
              <p style="color: #ccc; line-height: 1.8; margin-bottom: 1.5rem;">
                Le modèle <strong>${product.name}</strong> représente le summum du savoir-faire de Meuble Galaxy Plus. 
                Chaque détail a été pensé pour offrir une esthétique luxueuse tout en garantissant une fonctionnalité optimale. 
                Que ce soit la qualité des matériaux, la finesse des finitions, ou la robustesse de la structure, ce produit est conçu pour durer.
              </p>
              <p style="color: #ccc; line-height: 1.8;">
                Idéal pour les intérieurs contemporains ou classiques revisités, il apporte une touche de raffinement indéniable.
              </p>
            </div>
            <div style="background: var(--color-surface); padding: 2rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
              <h3 style="margin-bottom: 1.5rem;">Spécifications</h3>
              <ul style="list-style: none; padding: 0; margin: 0; color: #ccc;">
                <li style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 0.75rem;">
                  <span>Catégorie</span> <strong style="color: white;">${product.category}</strong>
                </li>
                <li style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 0.75rem;">
                  <span>Disponibilité</span> <strong style="color: var(--color-gold);">En Stock</strong>
                </li>
                <li style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 0.75rem;">
                  <span>Origine</span> <strong style="color: white;">Algérie (Bejaia)</strong>
                </li>
                <li style="display: flex; justify-content: space-between;">
                  <span>Montage</span> <strong style="color: white;">Inclus</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
};
