const renderConfirm = () => {
  Store.clearCart();
  
  return `
    <section class="confirm-section" style="padding: 150px 0; min-height: 70vh; text-align: center; display: flex; align-items: center; justify-content: center;">
      <div class="section-container" style="max-width: 600px;">
        <div style="width: 80px; height: 80px; background: rgba(212, 175, 55, 0.1); border: 2px solid var(--color-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 class="section-title" style="margin-bottom: 1rem;">Commande <span class="gold-text">Confirmée</span></h2>
        <p style="color: #ccc; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">
          Merci pour votre confiance. Votre commande a été enregistrée avec succès. Notre équipe vous contactera dans les plus brefs délais pour confirmer la livraison.
        </p>
        <div style="background: var(--color-surface); padding: 2rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border); margin-bottom: 2rem;">
          <h4 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">Numéro de Commande</h4>
          <div class="gold-text" style="font-size: 1.5rem; letter-spacing: 2px;">#MGP-${Math.floor(10000 + Math.random() * 90000)}</div>
        </div>
        <a href="#home" class="btn-ghost">Retour à l'accueil</a>
      </div>
    </section>
  `;
};
