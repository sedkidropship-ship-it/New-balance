const renderCart = () => {
  const cart = Store.getCart();
  if (cart.length === 0) {
    return `
      <section class="cart-section" style="padding: 120px 0; text-align: center; min-height: 60vh;">
        <div class="section-container">
          <h2>Votre panier est vide</h2>
          <a href="#shop" class="btn-gold" style="margin-top: 2rem; display: inline-block;">Continuer vos achats</a>
        </div>
      </section>
    `;
  }

  const total = Store.getCartTotal();

  let html = `
    <section class="cart-section" style="padding: 120px 0; min-height: 60vh;">
      <div class="section-container">
        <h2 class="section-title">Votre <span class="gold-text">Panier</span></h2>
        
        <div class="cart-layout" style="display: grid; gap: 2rem; grid-template-columns: 1fr 350px; margin-top: 3rem;">
          <div class="cart-items">
            ${cart.map(item => {
              const product = Store.getProduct(item.id);
              return `
                <div class="cart-item" style="display: flex; gap: 1.5rem; background: var(--color-surface); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1rem; border: 1px solid var(--color-border);">
                  <img src="${product.image}" style="width: 100px; height: 100px; object-fit: cover; border-radius: var(--radius-sm);" />
                  <div style="flex: 1;">
                    <h4 style="font-size: 1.1rem; font-family: var(--font-heading);">${product.name}</h4>
                    <p class="gold-text" style="font-weight: 500; margin-top: 0.5rem;">${product.price.toLocaleString()} DA</p>
                    
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1rem;">
                      <div class="qty-stepper" style="display: flex; align-items: center; gap: 1rem; background: rgba(0,0,0,0.5); padding: 0.25rem; border-radius: 4px; border: 1px solid var(--color-border);">
                        <button onclick="Store.updateQuantity(${product.id}, ${item.quantity - 1}); window.location.reload();" style="width: 30px; height: 30px; background: transparent; color: white; border: none; cursor: pointer;">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="Store.updateQuantity(${product.id}, ${item.quantity + 1}); window.location.reload();" style="width: 30px; height: 30px; background: transparent; color: white; border: none; cursor: pointer;">+</button>
                      </div>
                      <button onclick="Store.removeFromCart(${product.id}); window.location.reload();" style="background: transparent; border: none; color: #ff4444; cursor: pointer; text-decoration: underline;">Supprimer</button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          
          <div class="cart-summary" style="background: var(--color-surface); padding: 2rem; border-radius: var(--radius-md); height: fit-content; border: 1px solid var(--color-border);">
            <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem;">Résumé</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
              <span>Sous-total</span>
              <span>${total.toLocaleString()} DA</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem;">
              <span>Livraison</span>
              <span class="gold-text">Gratuite</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--color-border); padding-top: 1.5rem; font-size: 1.25rem; font-weight: bold; font-family: var(--font-heading);">
              <span>Total</span>
              <span class="gold-text">${total.toLocaleString()} DA</span>
            </div>
            <a href="#checkout" class="btn-gold btn-full" style="margin-top: 2rem; text-align: center; display: block;">Passer à la caisse</a>
          </div>
        </div>
      </div>
    </section>
  `;
  return html;
};
