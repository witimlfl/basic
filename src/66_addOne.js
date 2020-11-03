// 数组加1

// 方法一，递归

const plusOne1 = function(arr) {
    const nums = handlePlusOne(arr, 0, arr.length - 1)
    console.log('nums = ', nums)
    return arr
}

const handlePlusOne = function(arr, start, end) {
    if(arr[end] < 9) {
        arr[end] += 1
        return 
    } else {
        arr[end] = 0
        if(start === end) {
            arr.unshift(1)
        } else {
            handlePlusOne(arr, start, end -1)
        } 
    }
}

// 解法2 循环
const plusOne2 = function(arr) {
    const len = arr.length
    for(let i = len -1; i >= 0; i --) {
        arr[i] += 1
        arr[i] = arr[i] % 10
        if(arr[i] !== 0) {
            return arr
        }
    }
    // arr.unshift(1)
    // return [1, ...arr]
    return [1].concat(arr)
}

// 解法3 arr => num => string => arr
console.log('plusOne2 --->', plusOne2([1,2,3]))
console.log('plusOne1 --->', plusOne2([4,9,9]))
console.log('plusOne1 --->', plusOne2([9,9,9]))
