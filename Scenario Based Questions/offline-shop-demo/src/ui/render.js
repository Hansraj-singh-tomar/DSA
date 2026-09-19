export function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function renderStatusBanner(isOnline, pendingCount) {
  if (isOnline && pendingCount === 0) {
    return `<div class="banner banner-online">🟢 Online — all systems go</div>`;
  }
  if (isOnline && pendingCount > 0) {
    return `<div class="banner banner-sync">🔄 Online — syncing ${pendingCount} pending order(s)...</div>`;
  }
  return `<div class="banner banner-offline">🔴 Offline — browse cached products, cart saved locally</div>`;
}

export function renderProducts(products, source) {
  if (products.length === 0) {
    return `<p class="empty">No products available. Go online once to cache the catalog.</p>`;
  }

  return `
    <section class="section">
      <div class="section-header">
        <h2>Products</h2>
        <span class="badge">Source: ${source}</span>
      </div>
      <div class="product-grid">
        ${products
          .map(
            (p) => `
          <article class="product-card" data-id="${p.id}">
            <div class="product-emoji">${p.emoji}</div>
            <h3>${p.name}</h3>
            <p class="category">${p.category}</p>
            <p class="price">${formatPrice(p.price)}</p>
            <button class="btn btn-primary add-btn" data-id="${p.id}">Add to Cart</button>
          </article>
        `
          )
          .join('')}
      </div>
    </section>
  `;
}

export function renderCart(cartItems) {
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  if (cartItems.length === 0) {
    return `
      <section class="section cart-section">
        <h2>🛒 Cart</h2>
        <p class="empty">Your cart is empty</p>
      </section>
    `;
  }

  return `
    <section class="section cart-section">
      <h2>🛒 Cart <span class="count">${cartItems.length} item(s)</span></h2>
      <ul class="cart-list">
        ${cartItems
          .map(
            (item) => `
          <li class="cart-item" data-id="${item.productId}">
            <span class="cart-emoji">${item.emoji}</span>
            <div class="cart-info">
              <strong>${item.name}</strong>
              <span>${formatPrice(item.price)} × ${item.qty}</span>
            </div>
            <div class="cart-actions">
              <button class="btn btn-sm qty-minus" data-id="${item.productId}">−</button>
              <span class="qty">${item.qty}</span>
              <button class="btn btn-sm qty-plus" data-id="${item.productId}">+</button>
            </div>
          </li>
        `
          )
          .join('')}
      </ul>
      <div class="cart-footer">
        <strong>Total: ${formatPrice(total)}</strong>
        <button class="btn btn-checkout" id="checkout-btn">Checkout</button>
      </div>
    </section>
  `;
}

export function renderPendingOrders(orders) {
  if (orders.length === 0) return '';

  return `
    <section class="section pending-section">
      <h2>⏳ Pending Sync (${orders.length})</h2>
      <p class="hint">These orders are saved in IndexedDB and will sync when you're back online.</p>
      <ul class="pending-list">
        ${orders
          .map(
            (o) => `
          <li>
            <span>${o.id}</span>
            <span>${formatPrice(o.total)}</span>
            <span class="status-pending">${o.status}</span>
          </li>
        `
          )
          .join('')}
      </ul>
    </section>
  `;
}

export function renderOrderHistory(orders) {
  if (orders.length === 0) return '';

  return `
    <section class="section history-section">
      <h2>✅ Synced Orders</h2>
      <ul class="history-list">
        ${orders
          .slice(-5)
          .reverse()
          .map(
            (o) => `
          <li>
            <span>${o.serverOrderId || o.id}</span>
            <span>${formatPrice(o.total)}</span>
            <span class="status-synced">synced</span>
          </li>
        `
          )
          .join('')}
      </ul>
    </section>
  `;
}

export function renderArchitecturePanel() {
  return `
    <details class="arch-panel">
      <summary>How this demo works (Service Worker + Cache + IndexedDB)</summary>
      <div class="arch-grid">
        <div class="arch-card">
          <h4>Service Worker + Workbox</h4>
          <p>Intercepts network requests. Serves cached <code>products.json</code> when offline (NetworkFirst strategy).</p>
        </div>
        <div class="arch-card">
          <h4>Cache Storage</h4>
          <p>Stores app shell (HTML, JS, CSS) and product catalog API responses with 1-day expiry.</p>
        </div>
        <div class="arch-card">
          <h4>IndexedDB</h4>
          <p>Cart items & pending orders persist across sessions — works fully offline.</p>
        </div>
        <div class="arch-card">
          <h4>Online Sync</h4>
          <p>When connection returns, pending orders in IndexedDB are sent to the (mock) server.</p>
        </div>
      </div>
    </details>
  `;
}

export function renderToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
