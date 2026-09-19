import {
  getPendingOrders,
  removePendingOrder,
  saveToOrderHistory,
} from '../db/indexedDB.js';

const SYNC_DELAY_MS = 800; // Simulate network latency

/**
 * Simulates POST /api/orders — fails when offline.
 * In production this would be a real API call.
 */
async function submitOrderToServer(order) {
  if (!navigator.onLine) {
    throw new Error('Network unavailable');
  }

  await new Promise((r) => setTimeout(r, SYNC_DELAY_MS));

  // Simulate occasional server errors (10% chance) for demo realism
  if (Math.random() < 0.1) {
    throw new Error('Server error — will retry');
  }

  return {
    ...order,
    serverOrderId: `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    syncedAt: new Date().toISOString(),
  };
}

export async function syncPendingOrders() {
  const pending = await getPendingOrders();
  if (pending.length === 0) return { synced: 0, failed: 0 };

  let synced = 0;
  let failed = 0;

  for (const order of pending) {
    try {
      const result = await submitOrderToServer(order);
      await saveToOrderHistory(result);
      await removePendingOrder(order.id);
      synced++;
    } catch {
      failed++;
    }
  }

  return { synced, failed, remaining: failed };
}

export function setupOnlineSync(onSyncComplete) {
  const handleOnline = async () => {
    const result = await syncPendingOrders();
    onSyncComplete?.(result);
  };

  window.addEventListener('online', handleOnline);

  // Also try sync on page load if there are pending orders
  if (navigator.onLine) {
    syncPendingOrders().then(onSyncComplete);
  }

  return () => window.removeEventListener('online', handleOnline);
}
