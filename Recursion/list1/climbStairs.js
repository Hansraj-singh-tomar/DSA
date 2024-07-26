function climbStairs(nStairs) {
    // base case

    // 1. stair which is under land
    if (nStairs < 0) {
        return 0
    }

    // when the user standed on the first stair
    if (nStairs == 0) {
        return 1
    }

    let ans = climbStairs(nStairs - 1) + climbStairs(nStairs - 2)
    return ans
}

console.log(climbStairs(5)) // 5 // stair climb karne ke five way hai 