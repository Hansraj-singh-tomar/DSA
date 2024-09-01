// Online Stock Span - Maximum consecutive days for which
// the stock price was less than or equal to current day.
// stock spanner = [7,2,1,3,3,1,8]
// Next -> 7 -> return 1 // [7]
// Next -> 2 -> return 1 // [7,2]
// Next -> 1 -> return 1 // [7,2,1]
// Next -> 3 -> return 3 // [2,1,3] // [7,2,1,3]
// Next -> 3 -> return 4 // [2,1,3,3] // [7,2,1,3,3]
// Next -> 1 -> return 1
// Next -> 8 -> return 7 // [7,2,1,3,3,1,8] // [7,2,1,3,3,1,8]

// TC = O(no. of days)
// SC = O(total no. of next calls)

class StockSpanner {
    constructor() {
        this.arr = [];
    }

    next(val) {
        this.arr.push(val);
        this.count = 1;

        for (let i = this.arr.length - 2; i >= 0; i--) {
            if (this.arr[i] <= val) this.count++;
            else break;
        }
        return this.count;
    }
}

let stockSpanner = new StockSpanner();
console.log(stockSpanner.next(7)); // 1
console.log(stockSpanner.next(2)); // 1
console.log(stockSpanner.next(1)); // 1
console.log(stockSpanner.next(3)); // 3
console.log(stockSpanner.next(3)); // 4
console.log(stockSpanner.next(1)); // 1
console.log(stockSpanner.next(8)); // 7

// --------------------------------------------------------------------------

// optimal approach 
class StockSpanner {
    constructor() {
        this.st = [];
    }

    next(price) {
        let count = 1;

        while (this.st.length > 0 && this.st[this.st.length - 1][0] <= price) {
            count += this.st.pop()[1];
        }

        this.st.push([price, count])

        return count;
    }
}

const stockSpanner = new StockSpanner();
console.log(stockSpanner.next(7)); // 1
console.log(stockSpanner.next(2)); // 1
console.log(stockSpanner.next(1)); // 1
console.log(stockSpanner.next(3)); // 3
console.log(stockSpanner.next(3)); // 4
console.log(stockSpanner.next(1)); // 1
console.log(stockSpanner.next(8)); // 7


// --------------------------------------------------------------


// using pge(previous greater element)

class StockSpanner {
    constructor() {
        this.st = [];
        this.index = -1;
    }

    next(price) {
        this.index++;

        while (this.st.length > 0 && this.st[this.st.length - 1][0] <= price) {
            this.st.pop();
        }

        let ans = this.index - (this.st.length == 0 ? -1 : this.st[this.st.length - 1][1])

        this.st.push([price, this.index])

        return ans;
    }
}

const stockSpanner = new StockSpanner();
console.log(stockSpanner.next(7)); // 1
console.log(stockSpanner.next(2)); // 1
console.log(stockSpanner.next(1)); // 1
console.log(stockSpanner.next(3)); // 3
console.log(stockSpanner.next(3)); // 4
console.log(stockSpanner.next(1)); // 1
console.log(stockSpanner.next(8)); // 7


