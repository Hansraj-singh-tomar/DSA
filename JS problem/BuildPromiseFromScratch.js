class MyPromise {
    constructor(executor) {
        this.state = 'pending'; // initial state
        this.value = undefined; // resolved value
        this.reason = undefined; // rejection reason
        this.onFulfilledCallbacks = []; // callbacks for fulfillment
        this.onRejectedCallbacks = []; // callbacks for rejection

        // The resolve function
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallbacks.forEach(callback => callback(this.value));
            }
        };

        // The reject function
        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(callback => callback(this.reason));
            }
        };

        // Execute the executor function
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    // Then method to handle fulfilled and rejected states
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const handleFulfilled = () => {
                try {
                    const result = onFulfilled(this.value);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            };

            const handleRejected = () => {
                try {
                    if (onRejected) {
                        const result = onRejected(this.reason);
                        resolve(result);
                    } else {
                        reject(this.reason);
                    }
                } catch (error) {
                    reject(error);
                }
            };

            if (this.state === 'fulfilled') {
                handleFulfilled();
            } else if (this.state === 'rejected') {
                handleRejected();
            } else {
                this.onFulfilledCallbacks.push(handleFulfilled);
                this.onRejectedCallbacks.push(handleRejected);
            }
        });
    }

    // Catch method for handling rejections
    catch(onRejected) {
        return this.then(null, onRejected);
    }
}

// Example usage
const asyncOperation = (success = true) => {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve('Operation succeeded!');
            } else {
                reject('Operation failed!');
            }
        }, 1000);
    });
};

// Using the custom MyPromise
asyncOperation(true)
    .then(result => {
        console.log(result); // "Operation succeeded!"
        return asyncOperation(false); // Chain another operation
    })
    .catch(error => {
        console.error(error); // "Operation failed!"
    });
