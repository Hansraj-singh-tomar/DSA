function linearSeacrchUsingRec(arr, elm, length) {
    if (length == 0) {
        return false;
    }


    if (arr[0] == elm) {
        return true
    }

    return linearSeacrchUsingRec(arr.splice(1), elm, length - 1)
}

let arr = [1, 35, 2, 54, 4]
console.log(linearSeacrchUsingRec(arr, 4, arr.length));