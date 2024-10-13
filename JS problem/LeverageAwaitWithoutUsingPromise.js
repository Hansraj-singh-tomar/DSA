function getRandomData() {
    const random = Math.random() * 100;
    return {
        then: (cb) => {
            return cb(random);
        }
    }
}

// using await without using promise
const response = await getRandomData();
console.log(response)

// using then without using promise
getRandomData().then(console.log);