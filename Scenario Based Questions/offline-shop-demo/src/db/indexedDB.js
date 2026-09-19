const DB_NAME = 'shopkart-db';
const DB_VERSION = 1;

let dbPromise = null;

function openDB() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('cart')) {
        db.createObjectStore('cart', { keyPath: 'productId' });
      }

      if (!db.objectStoreNames.contains('pendingOrders')) {
        const store = db.createObjectStore('pendingOrders', {
          keyPath: 'id',
        });
        store.createIndex('status', 'status', { unique: false });
      }

      if (!db.objectStoreNames.contains('orderHistory')) {
        db.createObjectStore('orderHistory', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return dbPromise;
}

function runTransaction(storeName, mode, callback) {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, mode);
        const store = tx.objectStore(storeName);

        let result;
        try {
          result = callback(store);
        } catch (err) {
          reject(err);
          return;
        }

        tx.oncomplete = () => {
          if (result instanceof Promise) {
            result.then(resolve).catch(reject);
          } else {
            resolve(result);
          }
        };
        tx.onerror = () => reject(tx.error);
      })
  );
}

function getAll(storeName) {
  return runTransaction(storeName, 'readonly', (store) => {
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
}

function put(storeName, value) {
  return runTransaction(storeName, 'readwrite', (store) => {
    store.put(value);
  });
}

function remove(storeName, key) {
  return runTransaction(storeName, 'readwrite', (store) => {
    store.delete(key);
  });
}

function clear(storeName) {
  return runTransaction(storeName, 'readwrite', (store) => {
    store.clear();
  });
}

// --- Cart API ---

export async function getCartItems() {
  return getAll('cart');
}

export async function addToCart(product, qty = 1) {
  const items = await getCartItems();
  const existing = items.find((i) => i.productId === product.id);

  if (existing) {
    existing.qty += qty;
    await put('cart', existing);
    return existing;
  }

  const item = {
    productId: product.id,
    name: product.name,
    price: product.price,
    emoji: product.emoji,
    qty,
    addedAt: Date.now(),
  };
  await put('cart', item);
  return item;
}

export async function updateCartQty(productId, qty) {
  const items = await getCartItems();
  const item = items.find((i) => i.productId === productId);
  if (!item) return;

  if (qty <= 0) {
    await remove('cart', productId);
    return null;
  }

  item.qty = qty;
  await put('cart', item);
  return item;
}

export async function clearCart() {
  return clear('cart');
}

export function getCartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// --- Pending orders (offline checkout queue) ---

export async function queuePendingOrder(cartItems, total) {
  const order = {
    id: `local-${Date.now()}`,
    items: cartItems,
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  await put('pendingOrders', order);
  return order;
}

export async function getPendingOrders() {
  return getAll('pendingOrders');
}

export async function removePendingOrder(id) {
  return remove('pendingOrders', id);
}

export async function saveToOrderHistory(order) {
  await put('orderHistory', { ...order, status: 'synced', syncedAt: Date.now() });
}

export async function getOrderHistory() {
  return getAll('orderHistory');
}
