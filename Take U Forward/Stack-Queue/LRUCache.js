// LRU cache implementation using js Map data structure

// Note :- In that map last value is most recently used and first value is least recently used

// GET
// In get we have to return value from map or -1 if not found
// Make it most recently used, for that we will have to delete it from map and add it at last

// In set we have to insert value
// In set firstly we have to check that,
// if it is already present than we have to delete it from map
// if capacity is full than we have to delete last element from map and add new one and make it most recently used
// then we have to add it at last

// Time complexity of get and set is O(1)


class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
    }

    get(key) {
        if (this.map.has(key)) {
            let value = this.map.get(key);
            this.map.delete(key);
            this.map.set(key, value);
            return value;
        }
        return -1;
    }

    put(key, value) {
        if (this.map.has(key)) {
            this.map.delete(key);
        }
        if (this.map.size >= this.capacity) {
            this.map.delete(this.map.keys().next().value); // this will return the first key and delete it from the map 
        }

        this.map.set(key, value);
    }
}

const lru = new LRUCache(3);

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
console.log(lru); // {capacity: 3, map: Map {3 => 3, 4 => 4, 5 => 5}}

