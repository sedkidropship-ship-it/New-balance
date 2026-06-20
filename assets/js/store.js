const Store = (() => {
  const products = [
    { id: 1, name: 'Chambre Gold Prestige XXL', category: 'Chambres', price: 102000, image: 'assets/images/gold_collection.jpg', description: 'Lit capitonné velours or, armoire miroir.' },
    { id: 2, name: 'Chambre Capitonné Velours Navy', category: 'Chambres', price: 89000, image: 'assets/images/bedroom_collection.jpg', description: 'Ensemble complet avec lit capitonné.' },
    { id: 3, name: 'Armoire Coulissante Miroir', category: 'Armoires', price: 54000, image: 'assets/images/wardrobe_collection.jpg', description: '3 vantaux avec miroir plein.' },
    { id: 4, name: 'Armoire Dressing Palace', category: 'Armoires', price: 68000, image: 'assets/images/wardrobe_collection.jpg', description: 'Aménagement sur mesure, finitions premium.' },
    { id: 5, name: 'Lit Royale King Size', category: 'Lits', price: 45000, image: 'assets/images/hero_bedroom.jpg', description: 'Confort absolu, design majestueux.' },
    { id: 6, name: 'Commode 6 Tiroirs Laqué Or', category: 'Rangement', price: 28000, image: 'assets/images/storage_collection.jpg', description: 'Rangement élégant et pratique.' },
    { id: 7, name: 'Chevet Flottant Duo', category: 'Rangement', price: 15000, image: 'assets/images/storage_collection.jpg', description: 'Design minimaliste, gain de place.' },
    { id: 8, name: 'Ensemble Rangement Smart', category: 'Rangement', price: 38000, image: 'assets/images/storage_collection.jpg', description: 'Solutions intelligentes pour votre espace.' },
    { id: 9,  name: 'Chambre à Coucher Gazelle',       category: 'Chambres',  price: 200000, image: 'assets/images/chambre_gazelle.jpg',           description: 'Chambre capitonnée haut de gamme (lit 1.90×1.60m), coffre de rangement intelligent, tables de nuit design et armoire miroir spacieuse. Livraison et montage inclus.' },
    { id: 10, name: 'Salon Capitonné Prestige',         category: 'Salons',    price: 145000, image: 'assets/images/salon_capitonne_prestige.png',    description: 'Ensemble salon capitonné 3+2 places en velours premium avec pieds dorés. Table basse en marbre noir incluse. Finitions haut de gamme, disponible en plusieurs coloris.' },
    { id: 11, name: 'Salle à Manger Royale 6 Places',  category: 'Salons',    price: 118000, image: 'assets/images/salle_manger_royale.png',          description: 'Table extensible laquée blanc et or avec 6 chaises capitonnées en velours. Structure acier doré robuste. Idéal pour un intérieur luxueux et convivial.' },
    { id: 12, name: 'Chambre Enfant Prestige',          category: 'Chambres',  price:  72000, image: 'assets/images/chambre_enfant_luxe.png',          description: 'Chambre enfant haut de gamme en bois laqué beige et or. Inclut lit capitonné, commode 4 tiroirs, table de nuit et bureau. Sécuritaire et élégant.' },
    { id: 13, name: 'Dressing Panoramique Miroir',      category: 'Armoires',  price:  95000, image: 'assets/images/dressing_panoramique.png',         description: 'Dressing panoramique à portes coulissantes miroir pleine hauteur, poignées dorées et éclairage LED intégré. Structure laquée blanc mat, sur-mesure possible.' },
    { id: 14, name: 'Bureau Exécutif Gold',             category: 'Rangement', price:  58000, image: 'assets/images/bureau_executive.png',             description: 'Bureau exécutif en L laqué blanc avec pieds et accents dorés. Plateau spacieux, bibliothèque intégrée et chaise directeur cuir noir incluse.' },
    { id: 15, name: 'Meuble TV Flottant LED',           category: 'Salons',    price:  42000, image: 'assets/images/tv_meuble_luxe.png',               description: 'Console TV suspendue en laqué blanc mat avec poignées dorées, niches ouvertes et rétro-éclairage LED intégré. Supporte les TV jusqu\'à 85 pouces.' },
  ];

  let cart = JSON.parse(localStorage.getItem('galaxy_cart')) || [];
  let wishlist = JSON.parse(localStorage.getItem('galaxy_wishlist')) || [];

  const saveState = () => {
    localStorage.setItem('galaxy_cart', JSON.stringify(cart));
    localStorage.setItem('galaxy_wishlist', JSON.stringify(wishlist));
    document.dispatchEvent(new Event('storeUpdated'));
  };

  return {
    getProducts: () => products,
    getProduct: (id) => products.find(p => p.id === parseInt(id)),
    getCart: () => cart,
    getWishlist: () => wishlist,
    addToCart: (productId, quantity = 1) => {
      const item = cart.find(i => i.id === productId);
      if (item) item.quantity += quantity;
      else cart.push({ id: productId, quantity });
      saveState();
    },
    removeFromCart: (productId) => {
      cart = cart.filter(i => i.id !== productId);
      saveState();
    },
    updateQuantity: (productId, quantity) => {
      const item = cart.find(i => i.id === productId);
      if (item) {
        item.quantity = Math.max(1, quantity);
        saveState();
      }
    },
    clearCart: () => {
      cart = [];
      saveState();
    },
    toggleWishlist: (productId) => {
      if (wishlist.includes(productId)) wishlist = wishlist.filter(id => id !== productId);
      else wishlist.push(productId);
      saveState();
    },
    getCartTotal: () => {
      return cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.id);
        return total + (product ? product.price * item.quantity : 0);
      }, 0);
    }
  };
})();
