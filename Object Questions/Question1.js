// output - {p1: 3, p4: 3, p3: 3, p5: 1, p2: 1}

const data = {
    id: 1,
    name: ["p1", "p4"],
    next: {
        id: 2,
        name: ["p3"],
        next: {
            id: 3,
            name: ["p3", "p4", "p5"],
            next: {
                id: 4,
                name: ["p1", "p2", "p4"],
                next: {
                    id: 5,
                    name: ["p1", "p3"],
                    next: null
                }
            }
        }
    }
}

const playerCount = (data) => {
    if (data === null) {
        return {}
    }

    let countPlayer = {};

    // (countPlayer[player] || 0): This is a logical OR operation.It checks if countPlayer[player] is truthy(i.e., not undefined, null, 0, '', NaN, or false).If it's truthy, it returns countPlayer[player], otherwise, it returns 0.
    for (let player of data.name) {
        countPlayer[player] = (countPlayer[player] || 0) + 1
    }

    const nextPlayerCount = playerCount(data.next);

    // for (let key in nextPlayerCount) {
    //     countPlayer[key] = (countPlayer[key] || 0) + nextPlayerCount[key]
    // }

    for (let key in nextPlayerCount) {
        if (countPlayer[key]) {
            countPlayer[key] = countPlayer[key] + nextPlayerCount[key]
        } else {
            countPlayer[key] = nextPlayerCount[key]
        }
    }

    return countPlayer;
}

console.log(playerCount(data));

