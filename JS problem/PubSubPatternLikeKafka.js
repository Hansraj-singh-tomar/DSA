class PubSub {
    constructor() {
        // An object to hold events and their subscribers
        this.events = {};
    }

    /**
     * Subscribe to an event with a callback.
     * @param {string} event - The name of the event to subscribe to.
     * @param {Function} callback - The callback function to execute when the event is published.
     * @returns {Function} - A function to unsubscribe the callback from the event.
     */
    subscribe(event, callback) {
        // If the event doesn't exist, create an empty array for it
        if (!this.events[event]) {
            this.events[event] = [];
        }

        // Add the callback to the event's subscriber list
        this.events[event].push(callback);

        // Return an unsubscribe function
        return () => {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
            // If no subscribers left, delete the event key
            if (this.events[event].length === 0) {
                delete this.events[event];
            }
        };
    }

    /**
     * Publish an event with optional data.
     * @param {string} event - The name of the event to publish.
     * @param {*} [data] - Optional data to pass to the subscribers.
     */
    publish(event, data) {
        // If the event has subscribers, call each callback with the data
        if (this.events[event]) {
            this.events[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error executing callback for event "${event}":`, error);
                }
            });
        }
    }

    /**
     * Unsubscribe a specific callback from an event.
     * @param {string} event - The name of the event.
     * @param {Function} callback - The callback function to remove.
     */
    unsubscribe(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
            // If no subscribers left, delete the event key
            if (this.events[event].length === 0) {
                delete this.events[event];
            }
        }
    }

    /**
     * Remove all subscribers from a specific event.
     * @param {string} event - The name of the event to clear.
     */
    clear(event) {
        if (event) {
            delete this.events[event];
        } else {
            // Clear all events if no specific event is provided
            this.events = {};
        }
    }

    // Implement a subscribeOnce method that automatically unsubscribes the callback after it is invoked once.
    subscribeOnce(event, callback) {
        const wrapper = (data) => {
            callback(data);
            this.unsubscribe(event, wrapper);
        };
        this.subscribe(event, wrapper);
    }

    // Modifying the publish Method for Asynchronous Operations
    async publish(event, data) {
        if (this.events[event]) {
            // Create an array of promises from subscriber callbacks
            const promises = this.events[event].map(async (callback) => {
                try {
                    // Await the callback in case it's a promise
                    await callback(data);
                } catch (error) {
                    console.error(`Error in subscriber for event "${event}":`, error);
                    // Optionally, you can choose to rethrow or handle errors differently
                }
            });

            // Await all subscriber promises
            await Promise.all(promises);
        }
    }

    subscribeOnce(event, callback) {
        const wrapper = async (data) => {
            await callback(data);
            this.unsubscribe(event, wrapper);
        };
        this.subscribe(event, wrapper);
    }

}


// Instantiate the PubSub system
const pubSub = new PubSub();

// Subscriber 1 subscribes to the 'user:login' event
const unsubscribeLogin = pubSub.subscribe('user:login', (user) => {
    console.log(`Subscriber 1: User logged in: ${user.name}`);
});

// Subscriber 2 subscribes to the 'user:login' event
const unsubscribeLogin2 = pubSub.subscribe('user:login', (user) => {
    console.log(`Subscriber 2: Welcome, ${user.name}!`);
});

// Subscriber 3 subscribes to the 'user:logout' event
const unsubscribeLogout = pubSub.subscribe('user:logout', (user) => {
    console.log(`Subscriber 3: User logged out: ${user.name}`);
});

// Publish a 'user:login' event
pubSub.publish('user:login', { name: 'Alice' });
// Output:
// Subscriber 1: User logged in: Alice
// Subscriber 2: Welcome, Alice!

// Publish a 'user:logout' event
pubSub.publish('user:logout', { name: 'Alice' });
// Output:
// Subscriber 3: User logged out: Alice

// Unsubscribe Subscriber 2 from 'user:login'
unsubscribeLogin2();

// Publish another 'user:login' event
pubSub.publish('user:login', { name: 'Bob' });
// Output:
// Subscriber 1: User logged in: Bob

// Clear all subscriptions for 'user:logout'
pubSub.clear('user:logout');

// Attempt to publish 'user:logout' again
pubSub.publish('user:logout', { name: 'Bob' });
// No output, as there are no subscribers

// -------------------------------------------------------------------------------------

//  Asynchronous Subscribers Using Promises
// Instantiate the PubSub system
const pubSub = new PubSub();

// Subscriber 1: Asynchronous operation (e.g., fetching data)
pubSub.subscribe('data:fetch', async (query) => {
    console.log(`Subscriber 1: Fetching data for query "${query}"...`);
    // Simulate asynchronous operation with a timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Subscriber 1: Data fetched for query "${query}".`);
});

// Subscriber 2: Asynchronous operation (e.g., writing to a database)
pubSub.subscribe('data:fetch', async (query) => {
    console.log(`Subscriber 2: Logging fetch event for query "${query}"...`);
    // Simulate asynchronous operation with a timeout
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Subscriber 2: Fetch event logged for query "${query}".`);
});

// Publisher: Initiate the 'data:fetch' event
(async () => {
    console.log('Publishing "data:fetch" event...');
    await pubSub.publish('data:fetch', 'JavaScript PubSub');
    console.log('"data:fetch" event processing completed.');
})();

// output:-
// Publishing "data:fetch" event...
// Subscriber 1: Fetching data for query "JavaScript PubSub"...
// Subscriber 2: Logging fetch event for query "JavaScript PubSub"...
// Subscriber 2: Fetch event logged for query "JavaScript PubSub".
//     Subscriber 1: Data fetched for query "JavaScript PubSub".
// "data:fetch" event processing completed.

// --------------------------------------------------------------

// Handling Subscriber Errors

// Instantiate the PubSub system
const pubSub = new PubSub();

// Subscriber 1: Successful asynchronous operation
pubSub.subscribe('process:data', async (data) => {
    console.log(`Subscriber 1: Processing data "${data}"...`);
    await new Promise(resolve => setTimeout(resolve, 700));
    console.log(`Subscriber 1: Data "${data}" processed successfully.`);
});

// Subscriber 2: Asynchronous operation that throws an error
pubSub.subscribe('process:data', async (data) => {
    console.log(`Subscriber 2: Validating data "${data}"...`);
    await new Promise(resolve => setTimeout(resolve, 300));
    throw new Error(`Validation failed for data "${data}".`);
});

// Subscriber 3: Another successful asynchronous operation
pubSub.subscribe('process:data', async (data) => {
    console.log(`Subscriber 3: Archiving data "${data}"...`);
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Subscriber 3: Data "${data}" archived.`);
});

// Publisher: Initiate the 'process:data' event
(async () => {
    console.log('Publishing "process:data" event...');
    await pubSub.publish('process:data', 'SampleData');
    console.log('"process:data" event processing completed.');
})();

// output:-
// Publishing "process:data" event...
// Subscriber 1: Processing data "SampleData"...
// Subscriber 2: Validating data "SampleData"...
// Subscriber 3: Archiving data "SampleData"...
// Subscriber 2: Validating data "SampleData"...
// Error in subscriber for event "process:data": Error: Validation failed for data "SampleData".
//     at ... (stack trace)
// Subscriber 3: Data "SampleData" archived.
//     Subscriber 1: Data "SampleData" processed successfully.
// "process:data" event processing completed.
