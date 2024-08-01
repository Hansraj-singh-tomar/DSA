// Best time to buy or sell stock

function maximumProfit(prices) {
    let n = prices.length;
    let maxProfit = 0;
    let miniPrice = prices[0];

    for (let i = 0; i < prices.length; i++) {
        let profit = prices[i] - miniPrice;
        maxProfit = Math.max(maxProfit, profit);
        miniPrice = Math.min(miniPrice, prices[i]);
    }

    return maxProfit;
}

let prices = [7, 1, 5, 3, 6, 4];
console.log(maximumProfit(prices)); // 5