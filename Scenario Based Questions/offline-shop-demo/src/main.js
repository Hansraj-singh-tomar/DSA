import { registerSW } from 'virtual:pwa-register';
import {
  addToCart,
  getCartItems,
  getCartTotal,
  getPendingOrders,
  getOrderHistory,
  queuePendingOrder,
  clearCart,
  updateCartQty,
} from './db/indexedDB.js';
import { setupOnlineSync, syncPendingOrders } from './sync/syncManager.js';
import {
  renderStatusBanner,
  renderProducts,
  renderCart,
  renderPendingOrders,
  renderOrderHistory,
  renderArchitecturePanel,
  renderToast,
  formatPrice,
} from './ui/render.js';
import './styles.css';

// Register Service Worker (Workbox-generated via vite-plugin-pwa)
registerSW({
  onRegistered() {
    console.log('[SW] Service Worker registered');
  },
  onOfflineReady() {
    console.log('[SW] App ready to work offline');
  },
});

let products = [];
let productSource = 'network';
let isOnline = navigator.onLine;

async function fetchProducts() {
  try {
    const res = await fetch('/products.json');
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    products = data.products;

    // Detect if response came from cache (Service Worker)
    productSource = res.headers.get('X-From-Cache') ? 'cache' : 'network';
  } catch {
    // Fallback: try cache directly via caches API
    const cache = await caches.open('products-api');
    const cached = await cache.match('/products.json');
    if (cached) {
      const data = await cached.json();
      products = data.products;
      productSource = 'cache (offline)';
    } else {
      products = [];
      productSource = 'unavailable';
    }
  }
}

async function render() {
  const [cartItems, pendingOrders, orderHistory] = await Promise.all([
    getCartItems(),
    getPendingOrders(),
    getOrderHistory(),
  ]);

  const app = document.getElementById('app');
  app.innerHTML = `
    <header>
      <h1>🛍️ ShopKart</h1>
      <p>Real-life offline e-commerce demo — Flipkart/Amazon-style cart that works without internet</p>
    </header>

    ${renderStatusBanner(isOnline, pendingOrders.length)}

    <div class="layout-main">
      <div>
        ${renderProducts(products, productSource)}
        ${renderPendingOrders(pendingOrders)}
        ${renderOrderHistory(orderHistory)}
      </div>
      <div>
        ${renderCart(cartItems)}
      </div>
    </div>

    ${renderArchitecturePanel()}
  `;

  bindEvents(cartItems);
}

function bindEvents(cartItems) {
  // Add to cart
  document.querySelectorAll('.add-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const product = products.find((p) => p.id === btn.dataset.id);
      if (!product) return;
      await addToCart(product);
      renderToast(`${product.name} added to cart (saved in IndexedDB)`, 'success');
      render();
    });
  });

  // Quantity controls
  document.querySelectorAll('.qty-plus').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const item = cartItems.find((i) => i.productId === btn.dataset.id);
      if (item) {
        await updateCartQty(item.productId, item.qty + 1);
        render();
      }
    });
  });

  document.querySelectorAll('.qty-minus').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const item = cartItems.find((i) => i.productId === btn.dataset.id);
      if (item) {
        await updateCartQty(item.productId, item.qty - 1);
        render();
      }
    });
  });

  // Checkout
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckout);
  }
}

async function handleCheckout() {
  const cartItems = await getCartItems();
  if (cartItems.length === 0) return;

  const total = getCartTotal(cartItems);
  document.getElementById('checkout-btn')?.setAttribute('disabled', 'true');

  if (navigator.onLine) {
    try {
      // Online: simulate direct order
      await new Promise((r) => setTimeout(r, 600));
      renderToast(`Order placed! Total: ${formatPrice(total)}`, 'success');
      await clearCart();
    } catch {
      renderToast('Checkout failed — order queued for sync', 'warning');
      await queuePendingOrder(cartItems, total);
      await clearCart();
    }
  } else {
    // Offline: queue order in IndexedDB
    await queuePendingOrder(cartItems, total);
    await clearCart();
    renderToast(
      `Offline checkout — order queued (${formatPrice(total)}). Will sync when online.`,
      'warning'
    );
  }

  render();
}

// Online / offline status
function updateOnlineStatus() {
  isOnline = navigator.onLine;
  render();
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Sync pending orders when back online
setupOnlineSync((result) => {
  if (result?.synced > 0) {
    renderToast(`${result.synced} pending order(s) synced to server!`, 'success');
    render();
  }
});

// Initial load
async function init() {
  await fetchProducts();
  await render();
}

init();

// Expose helpers for DevTools testing
window.__shopkart = {
  syncNow: syncPendingOrders,
  goOffline: () => renderToast('Use DevTools → Network → Offline to simulate', 'info'),
};
