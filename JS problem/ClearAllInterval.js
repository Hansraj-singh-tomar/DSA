// to store all the interval ids
window.intervalIds = [];
const originalIntervalFn = window.setInterval;
window.setInterval = function (fn, delay) {
    const id = originalIntervalFn(fn, delay);
    intervalIds.push(id);
    return id;
};

window.clearAllInterval = function () {
    while (intervalIds.length) {
        clearInterval(intervalIds.pop());
    }
};

setInterval(() => {
    console.log("hello-1");
}, 2000);

setInterval(() => {
    console.log("hello-2");
}, 500);

clearAllInterval();

setInterval(() => {
    console.log("hello-3");
}, 1000);