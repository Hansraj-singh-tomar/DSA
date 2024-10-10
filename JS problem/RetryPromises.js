// Q. if I have four promises and the second promise fails then how do I restart it back

function retryPromise(promiseFunc, retries = 3) {
    return promiseFunc().catch((error) => {
        if (retries === 0) {
            throw error; // If no retries left, throw the error
        }
        console.log(`Retrying... Attempts left: ${retries}`);
        return retryPromise(promiseFunc, retries - 1); // Retry the promise
    });
}

// Simulating four promises
const promise1 = () => {
    return new Promise((resolve, reject) => {
        const shouldFail = Math.random() < 0.5;
        shouldFail ? reject('First promise failed') : resolve('First promise succeeded');
    });
};

const promise2 = () => {
    return new Promise((resolve, reject) => {
        const shouldFail = Math.random() < 0.5;
        shouldFail ? reject('Second promise failed') : resolve('Second promise succeeded');
    });
};

const promise3 = () => {
    return new Promise((resolve, reject) => {
        const shouldFail = Math.random() < 0.5;
        shouldFail ? reject('Third promise failed') : resolve('Third promise succeeded');
    });
};

const promise4 = () => {
    return new Promise((resolve, reject) => {
        const shouldFail = Math.random() < 0.5;
        shouldFail ? reject('Fourth promise failed') : resolve('Fourth promise succeeded');
    });
};

// Retry each promise individually
Promise.all([
    retryPromise(promise1),
    retryPromise(promise2),
    retryPromise(promise3),
    retryPromise(promise4)
])
    .then((results) => {
        console.log('All promises succeeded:', results);
    })
    .catch((error) => {
        console.error('One or more promises failed after retries:', error);
    });
