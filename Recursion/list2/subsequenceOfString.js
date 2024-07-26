function subsets(arr, output, index, ans) {
    if (index >= arr.length) {
        ans.push([...output].join(""));
        return;
    }

    // exclude
    subsets(arr, output, index + 1, ans);

    // include
    let element = arr[index];
    output.push(element);
    subsets(arr, output, index + 1, ans);

    // Backtrack to remove the element added above
    // output array se last element ko remove karne ke liye
    output.pop();
}

let str = "abc";
let arrStr = str.split('');
let ans = [];
let output = []
subsets(arrStr, output, 0, ans)
console.log(ans); // ['', 'c', 'b', 'bc', 'a', 'ac', 'ab', 'abc']
