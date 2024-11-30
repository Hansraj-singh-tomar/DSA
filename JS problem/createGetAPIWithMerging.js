// Problem statement
// suppose we have a utility functions getAPI() which fetches data.

const getAPI = async (path, config) {... }

// const list1 = await getAPI("/list", { keyword: "learnWithChirag" });
// const list2 = await getAPI("/list", { keyword: "engineerchirag" });

// Implement: createGetAPIWithMerging to avoid the unnecessary API calls.
const getAPIWithMerging = createGetAPIWithMerging(getAPI)

getAPIWithMerging('/list', { keyword: 'learnWithChirag' }).then(...)
// 1st call, this will call getAPI

getAPIWithMerging('/list', { keyword: 'learnWithChirag' }).then(...)
// 2nd call is identical to 1st call, so getAPI is not called
// it resolves when 1st call resolves

getAPIWithMerging('/list', { keyword: 'engineerchirag' }).then(...)
// 3rd call is not identical, so getAPI is called

// after 1000ms
getAPIWithMerging('/list', { keyword: 'learnWithChirag' }).then(...)
// 4th call is identical to 1st call,
// but since after 1000ms, getAPI is called.


// -----------------------------------------------------------------------------------------

// solution - 1 (which is wrong solution)
// const getAPI = async (path, config) => {
//     return await fetch(path, config).then(res => res.json());
// }
// const createGetAPIWithMerging = (getAPI) => {
//     let store = {};
//     return (path, config) => {
//         if (store[path] == path && store[keyword] == config.keyword) {
//             return store[result];
//         } else
//             const promiseRef = getAPI(path, config);
//             store[path] = path;
//             store[keyword] = config.keyword;
//             store[result] = promiseRef;
//             return result;
//         }
//     }
// }
// const getAPIWithMerging = createGetAPIWithMerging(getAPI);

// const list1 = await getAPIWithMerging("/list", { keyword: "learnWithChirag" });
// const list2 = await getAPIWithMerging("/list", { keyword: "learnWithChirag" });
// const list3 = await getAPIWithMerging("/list", { keyword: "engineerchirag" });

// -----------------------------------------------------------------------------------------------------

// second solution - which maybe wrong or right
const getAPI = async (path, config) => {
    return await fetch(path, config).then(res => res.json());
}

const createGetAPIWithMerging = (getAPI) => {
    let store = {};

    return (path, config) => {
        const cacheKey = `${path}-${config.keyword}`; // Unique key based on path and keyword

        // Check if we already have a cached promise for this path and keyword
        if (store[cacheKey]) {
            console.log('Returning cached result');
            return store[cacheKey];  // Return the cached promise
        }

        console.log('Fetching new data');
        // Make the API call and store the promise in the cache
        const promiseRef = getAPI(path, config);
        store[cacheKey] = promiseRef;

        return promiseRef;  // Return the promise (resolves when fetch completes)
    };
}

const getAPIWithMerging = createGetAPIWithMerging(getAPI);

// Example usage
const list1 = await getAPIWithMerging("/list", { keyword: "learnWithChirag" });
const list2 = await getAPIWithMerging("/list", { keyword: "learnWithChirag" });  // Cached result
const list3 = await getAPIWithMerging("/list", { keyword: "engineerchirag" });   // New API call


// -----------------------------------------------------------------------------------------------------------

// third solution - from chatgpt
const createGetAPIWithMerging = (getAPI, cacheDuration = 1000) => {
    let store = {};  // Cache for promises

    return (path, config) => {
        const cacheKey = `${path}-${config.keyword}`;  // Unique cache key based on path and keyword

        // Check if there's already a cached promise and it's still valid
        if (store[cacheKey] && (Date.now() - store[cacheKey].timestamp < cacheDuration)) {
            console.log('Returning cached result');
            return store[cacheKey].promise;  // Return cached promise
        }

        // Make the API call and store the promise
        console.log('Fetching new data');
        const promiseRef = getAPI(path, config);

        // Store the promise and the current timestamp for cache invalidation
        store[cacheKey] = {
            promise: promiseRef,
            timestamp: Date.now()
        };

        return promiseRef;  // Return the new promise
    };
};

// Example usage
const getAPI = async (path, config) => {
    return await fetch(path, config).then(res => res.json());
};

const getAPIWithMerging = createGetAPIWithMerging(getAPI);

// Calls
getAPIWithMerging('/list', { keyword: 'learnWithChirag' }).then(data => console.log(data));  // New API call
getAPIWithMerging('/list', { keyword: 'learnWithChirag' }).then(data => console.log(data));  // Cached result
getAPIWithMerging('/list', { keyword: 'engineerchirag' }).then(data => console.log(data));   // New API call

setTimeout(() => {
    getAPIWithMerging('/list', { keyword: 'learnWithChirag' }).then(data => console.log(data));  // New API call after 1000ms
}, 1500);  // After 1500ms, cache expires
