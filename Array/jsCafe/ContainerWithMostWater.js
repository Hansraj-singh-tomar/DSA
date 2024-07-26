// By vedant jain
function mostWater(height) {
    let l = 0;
    let r = height.length - 1;
    let mx = 0;
    while (l < r) {
        mx = Math.max(mx, Math.min(height[l], height[r]) * (r - l))

        if (height[l] < height[r]) l += 1;
        else if (height[l] > height[r]) r -= 1;
        else {
            r -= 1;
            l += 1;
        }
    }
    return mx;
}

let height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
console.log(mostWater(height)); // 49