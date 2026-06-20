const renderCheckout = () => {
  const cart = Store.getCart();
  if (cart.length === 0) {
    window.location.hash = '#shop';
    return '';
  }

  const total = Store.getCartTotal();

  let html = `
    <section class="checkout-section" style="padding: 120px 0 60px; min-height: 80vh; background: #050505;">
      <div class="section-container" style="max-width: 1200px;">
        
        <!-- Checkout Header -->
        <header style="text-align: center; margin-bottom: 3rem;">
          <h1 style="font-family: var(--font-heading); font-size: 2.5rem;">Paiement <span class="gold-text">Sécurisé</span></h1>
          <div style="display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 1rem; color: #888; font-size: 0.9rem;">
            <span style="color: var(--color-gold);">1. Panier</span>
            <span style="width: 30px; height: 1px; background: var(--color-gold);"></span>
            <span style="color: white; font-weight: bold;">2. Livraison & Paiement</span>
            <span style="width: 30px; height: 1px; background: var(--color-border);"></span>
            <span>3. Confirmation</span>
          </div>
        </header>

        <div class="checkout-layout" style="display: grid; gap: 4rem; grid-template-columns: 1.5fr 1fr; align-items: start;">
          
          <!-- Left Column: Forms -->
          <div class="checkout-form-container">
            <form id="checkoutForm" onsubmit="event.preventDefault(); window.location.hash='#confirm';">
              
              <!-- Section 1: Contact -->
              <div style="background: var(--color-surface); padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); margin-bottom: 2rem;">
                <h3 style="font-family: var(--font-heading); margin-bottom: 1.5rem; font-size: 1.3rem; display: flex; align-items: center; gap: 0.5rem;">
                  <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; background: var(--color-gold); color: black; border-radius: 50%; font-size: 0.9rem;">1</span>
                  Informations de Contact
                </h3>
                <div class="form-grid" style="display: grid; gap: 1.5rem; grid-template-columns: 1fr 1fr;">
                  <div class="input-group">
                    <label style="display: block; margin-bottom: 0.5rem; color: #ccc; font-size: 0.9rem;">Nom *</label>
                    <input type="text" required placeholder="Votre nom" style="width: 100%; padding: 0.8rem 1rem; background: rgba(0,0,0,0.5); border: 1px solid var(--color-border); color: white; border-radius: var(--radius-sm); font-family: var(--font-body);" />
                  </div>
                  <div class="input-group">
                    <label style="display: block; margin-bottom: 0.5rem; color: #ccc; font-size: 0.9rem;">Prénom *</label>
                    <input type="text" required placeholder="Votre prénom" style="width: 100%; padding: 0.8rem 1rem; background: rgba(0,0,0,0.5); border: 1px solid var(--color-border); color: white; border-radius: var(--radius-sm); font-family: var(--font-body);" />
                  </div>
                  <div class="input-group" style="grid-column: 1 / -1;">
                    <label style="display: block; margin-bottom: 0.5rem; color: #ccc; font-size: 0.9rem;">Téléphone *</label>
                    <input type="tel" required placeholder="05XX XX XX XX" style="width: 100%; padding: 0.8rem 1rem; background: rgba(0,0,0,0.5); border: 1px solid var(--color-border); color: white; border-radius: var(--radius-sm); font-family: var(--font-body);" />
                  </div>
                </div>
              </div>

              <!-- Section 2: Delivery -->
              <div style="background: var(--color-surface); padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); margin-bottom: 2rem;">
                <h3 style="font-family: var(--font-heading); margin-bottom: 1.5rem; font-size: 1.3rem; display: flex; align-items: center; gap: 0.5rem;">
                  <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; background: var(--color-gold); color: black; border-radius: 50%; font-size: 0.9rem;">2</span>
                  Adresse de Livraison
                </h3>
                <div class="form-grid" style="display: grid; gap: 1.5rem;">
                  <div class="input-group">
                    <label style="display: block; margin-bottom: 0.5rem; color: #ccc; font-size: 0.9rem;">Wilaya *</label>
                    <select required style="width: 100%; padding: 0.8rem 1rem; background: rgba(0,0,0,0.5); border: 1px solid var(--color-border); color: white; border-radius: var(--radius-sm); font-family: var(--font-body); appearance: none;">
                      <option value="">Sélectionnez votre wilaya</option>
                      <option value="06">06 - Bejaia</option>
                      <option value="15">15 - Tizi Ouzou</option>
                      <option value="19">19 - Sétif</option>
                      <option value="10">10 - Bouira</option>
                      <option value="16">16 - Alger</option>
                    </select>
                  </div>
                  <div class="input-group">
                    <label style="display: block; margin-bottom: 0.5rem; color: #ccc; font-size: 0.9rem;">Adresse complète *</label>
                    <textarea required rows="2" placeholder="N° de rue, bâtiment, quartier..." style="width: 100%; padding: 0.8rem 1rem; background: rgba(0,0,0,0.5); border: 1px solid var(--color-border); color: white; border-radius: var(--radius-sm); font-family: var(--font-body);"></textarea>
                  </div>
                </div>
              </div>

              <!-- Section 3: Payment -->
              <div style="background: var(--color-surface); padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); margin-bottom: 2rem;">
                <h3 style="font-family: var(--font-heading); margin-bottom: 1.5rem; font-size: 1.3rem; display: flex; align-items: center; gap: 0.5rem;">
                  <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; background: var(--color-gold); color: black; border-radius: 50%; font-size: 0.9rem;">3</span>
                  Méthode de Paiement
                </h3>
                <div class="payment-methods">
                  <label class="payment-option" style="display: flex; align-items: flex-start; gap: 1rem; background: rgba(212, 175, 55, 0.05); padding: 1.5rem; border: 2px solid var(--color-gold); border-radius: var(--radius-sm); cursor: pointer; transition: all 0.3s ease;">
                    <input type="radio" name="payment" value="cod" checked style="margin-top: 4px; accent-color: var(--color-gold); width: 18px; height: 18px;">
                    <div>
                      <strong style="display: block; font-size: 1.1rem; color: white; margin-bottom: 0.25rem;">Paiement à la livraison (COD)</strong>
                      <span style="color: #aaa; font-size: 0.9rem; line-height: 1.4; display: block;">Payez en espèces directement au livreur une fois que vous avez reçu et inspecté vos meubles.</span>
                    </div>
                    <svg style="margin-left: auto; color: var(--color-gold);" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </label>
                </div>
              </div>

              <button type="submit" class="btn-gold btn-full btn-magnetic" style="font-size: 1.1rem; padding: 1.25rem; letter-spacing: 1px; text-transform: uppercase;">
                Confirmer la Commande — ${total.toLocaleString()} DA
              </button>
              
              <div style="text-align: center; margin-top: 1rem; color: #888; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Vos données sont cryptées et sécurisées
              </div>
            </form>
          </div>

          <!-- Right Column: Order Summary -->
          <div class="checkout-summary" style="position: sticky; top: 100px;">
            <div style="background: var(--color-surface); padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
              <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">Résumé de la Commande</h3>
              
              <div class="summary-items" style="margin-bottom: 2rem; display: flex; flex-direction: column; gap: 1.5rem; max-height: 400px; overflow-y: auto; padding-right: 0.5rem;">
                ${cart.map(item => {
                  const p = Store.getProduct(item.id);
                  return `
                    <div style="display: flex; gap: 1rem; align-items: flex-start;">
                      <div style="position: relative;">
                        <img src="${p.image}" style="width: 70px; height: 70px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
                        <span style="position: absolute; top: -8px; right: -8px; background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold;">${item.quantity}</span>
                      </div>
                      <div style="flex: 1;">
                        <div style="font-size: 0.95rem; font-weight: 500; line-height: 1.3; margin-bottom: 0.25rem;">${p.name}</div>
                        <div style="color: #888; font-size: 0.8rem;">Catégorie: ${p.category}</div>
                      </div>
                      <div class="gold-text" style="font-weight: bold; white-space: nowrap;">${(p.price * item.quantity).toLocaleString()} DA</div>
                    </div>
                  `;
                }).join('')}
              </div>
              
              <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: #ccc;">
                  <span>Sous-total</span>
                  <span style="color: white;">${total.toLocaleString()} DA</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; color: #ccc;">
                  <span>Frais de Livraison</span>
                  <span style="color: var(--color-gold); font-weight: bold;">Offerte</span>
                </div>
                <div style="display: flex; justify-content: space-between; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 1.5rem; font-size: 1.4rem; font-family: var(--font-heading);">
                  <span>Total à Payer</span>
                  <span class="gold-text" style="font-weight: bold;">${total.toLocaleString()} DA</span>
                </div>
              </div>
            </div>
            
            <a href="#cart" style="display: inline-block; margin-top: 1.5rem; color: var(--color-gold); text-decoration: none; font-size: 0.9rem; border-bottom: 1px solid transparent; transition: 0.3s;">
              ← Retour au panier
            </a>
          </div>

        </div>
      </div>
    </section>
  `;
  return html;
};
