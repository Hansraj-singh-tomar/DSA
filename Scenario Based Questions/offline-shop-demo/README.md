# ShopKart — Offline E-commerce Demo

A **real-life e-commerce example** showing production-grade offline support using:

| Layer | Technology | What it does in this demo |
|-------|------------|---------------------------|
| **Network intercept** | Service Worker + Workbox | Serves cached assets when offline |
| **Read cache** | Cache Storage | Stores `products.json` + app shell |
| **Read/write data** | IndexedDB | Cart + pending orders persist offline |
| **Sync** | Online event listener | Queued orders sync when connection returns |

---

## Quick Start

```bash
cd "Scenario Based Questions/offline-shop-demo"
npm install
npm run dev
```

Open http://localhost:5173

---

## How to Test Offline Flow

### Step 1: Load while online
1. Open the app in Chrome
2. Browse products — catalog loads from network
3. Add items to cart

### Step 2: Go offline
1. Open **DevTools → Network tab**
2. Check **Offline** checkbox
3. Refresh the page — app still loads (Service Worker cache)
4. Products still visible (cached `products.json`)
5. Add more items to cart — saved in **IndexedDB**

### Step 3: Checkout offline
1. Click **Checkout** while offline
2. Order moves to **Pending Sync** section (IndexedDB queue)
3. Cart clears locally

### Step 4: Come back online
1. Uncheck **Offline** in DevTools
2. Pending orders auto-sync to mock server
3. Appear under **Synced Orders**

---

## Architecture

```
User Browser
     │
     ▼
┌─────────────┐     miss      ┌──────────┐
│ Service     │──────────────►│ Network  │
│ Worker      │               └──────────┘
│ (Workbox)   │
└──────┬──────┘
       │ hit
       ▼
┌─────────────┐     ┌─────────────┐
│ Cache       │     │ IndexedDB   │
│ Storage     │     │             │
│             │     │ • cart      │
│ • app shell │     │ • pending   │
│ • products  │     │   orders    │
└─────────────┘     └─────────────┘
```

---

## File Structure

```
offline-shop-demo/
├── public/
│   ├── products.json    # Mock product catalog API
│   └── icon.svg
├── src/
│   ├── main.js          # App entry + event wiring
│   ├── db/
│   │   └── indexedDB.js # Cart & order persistence
│   ├── sync/
│   │   └── syncManager.js # Offline → online sync
│   ├── ui/
│   │   └── render.js    # UI components
│   └── styles.css
├── vite.config.js       # Workbox caching rules
└── package.json
```

---

## Workbox Caching Strategy

```javascript
// products.json → NetworkFirst
// Try network → if fail/timeout → serve from Cache Storage
// Expires after 1 day, max 5 entries
```

App shell (HTML, JS, CSS) is **precached** at Service Worker install time.

---

## Real-World Mapping

| This Demo | Production (Flipkart, etc.) |
|-----------|----------------------------|
| `products.json` | Product catalog API |
| IndexedDB cart | Offline cart persistence |
| Pending orders queue | Background Sync / retry queue |
| Workbox NetworkFirst | CDN + API caching strategy |
| Mock server sync | `POST /api/orders` |

---

## Console Helpers

```javascript
// Force sync pending orders
await window.__shopkart.syncNow()
```

---

## Build for Production

```bash
npm run build
npm run preview
```

Service Worker only works on `localhost` or HTTPS in production.
