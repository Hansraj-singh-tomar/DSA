// LRU cache implementation using js Map data structure

// GET
// In get we have to return value from map or -1 if not found
// Make it most recently used, for that we will have to delete it from map and add it at last

// PUT
// In set firstly we have to check that,
// if it is already present than we have to delete it from map
// if capacity is full than we have to delete last element from map and add new one and make it most recently used
// then we have to add it at last

// Time complexity of get and set is O(1)

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity; // Max number of items the cache can hold
        this.cache = new Map(); // Store the cache items
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1; // If the key is not in the cache, return -1
        }

        // Move the accessed item to the end (most recently used)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);

        return value; // Return the value associated with the key
    }

    put(key, value) {
        if (this.cache.has(key)) {
            // If the key is already in the cache, delete it to update the order
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // If the cache is full, remove the least recently used item (the first item in the Map)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }

        // Insert the item as the most recently used (at the end)
        this.cache.set(key, value);
    }
}

// Example usage:
const lru = new LRUCache(3); // Create a cache with a capacity of 3

lru.put(1, 1); // Cache is {1=1}
lru.put(2, 2); // Cache is {1=1, 2=2}
lru.put(3, 3); // Cache is {1=1, 2=2, 3=3}
console.log(lru.get(1)); // Returns 1, Cache is {2=2, 3=3, 1=1}
lru.put(4, 4); // Cache is {3=3, 1=1, 4=4} (removes key 2)
console.log(lru.get(2)); // Returns -1 (not found)
console.log(lru.get(3)); // Returns 3, Cache is {1=1, 4=4, 3=3}
lru.put(5, 5); // Cache is {4=4, 3=3, 5=5} (removes key 1)
console.log(lru.get(1)); // Returns -1 (not found)
console.log(lru.get(4)); // Returns 4, Cache is {3=3, 5=5, 4=4}
console.log(lru.get(5)); // Returns 5, Cache is {3=3, 4=4, 5=5}
