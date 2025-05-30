function subSequence(arr, index, n, output) {
    if (index === n) {
        console.log(output);
        return;
    }

    output.push(arr[index]);
    subSequence(arr, index + 1, n, output);
    output.pop();
    subSequence(arr, index + 1, n, output);
}
let arr = [3, 1, 2];
subSequence(arr, 0, arr.length, []); // [ 3, 1, 2 ] [ 3, 1 ] [ 3, 2 ] [ 3 ] [ 1, 2 ] [ 1 ] [ 2 ] []