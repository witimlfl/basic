// 1.防抖 + 节流

// 节流：多长时间段里无论有多少次触发，只执行一次，使用场景：搜索，搜索数据渲染
// 规定在一个单位时间内，只能触发一次函数，如果这个单位时间内触发多次函数，只有一次生效。
function throttle(fn, delay = 500) { // 时间戳
    let prev = Date.now()
    return function() {
        const that = this;
        const args = arguments
        const now = Date.now()
        if(now - prev > delay) {
            fn.apply(that, args)
            prev = now;
        }
    }

}

function newThrottle(fn, delay) { // 定时器
    let timer = null
    return function() {
        const that = this;
        const args = arguments
        if(!timer) {
            timer = setTimeout(() =>{
                fn.apply(that, args)
                timer = null
            }, delay)
        }
    }

}