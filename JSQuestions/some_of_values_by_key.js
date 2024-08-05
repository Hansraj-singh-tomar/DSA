let transactions = [
    { amount: 100, type: "credit" },
    { amount: 200, type: "debit" },
    { amount: 50, type: "credit" },
    { amount: 75, type: "debit" }
];

let hash = {};

for (let account of transactions) {
    if (!hash[account.type]) {
        hash[account.type] = 0
    }

    hash[account.type] += account.amount;
}

console.log(hash); // {credit: 150, debit: 275}



