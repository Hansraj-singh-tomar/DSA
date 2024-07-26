function sqrt(target) {
    let start = 0;
    let end = target;
    let ans;

    if (target < 2) return target;

    while (start <= end) {
        let mid = Math.floor(start + (end - start) / 2)

        if (mid * mid == target) {
            ans = mid;
            break;

            // return mid // we can direct reurn from here this is also possible solution for us
        } else if (mid * mid < target) {
            ans = mid;
            start = mid + 1;
        } else if (mid * mid > target) {
            end = mid - 1;
        }
    }

    return ans
}

console.log(sqrt(144)) // 12