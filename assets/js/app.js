document.addEventListener('DOMContentLoaded', () => {
  // Setup Routes
  Router.addRoute('#shop', renderShop);
  Router.addRoute('#product', renderProduct);
  Router.addRoute('#cart', renderCart);
  Router.addRoute('#checkout', renderCheckout);
  Router.addRoute('#confirm', renderConfirm);

  // Initialize Router
  Router.init();

  // Listen to store updates to update UI (like cart badge)
  document.addEventListener('storeUpdated', updateCartBadge);
  updateCartBadge();
});

function updateCartBadge() {
  const cart = Store.getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: var(--color-surface);
    color: white;
    padding: 1rem 2rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-gold);
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    font-family: var(--font-body);
    animation: slideIn 0.3s ease forwards;
  `;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add keyframes for toast
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes fadeOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);
