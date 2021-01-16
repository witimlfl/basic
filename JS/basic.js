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

// 防抖debounce: 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。立即执行、非立即执行
// 立即执行：触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果
function debounce(fn, delay) {
    let timer = null;
    return function() {
        const that = this;
        const args = arguments;
        if(timer) {
            clearTimeout(timer);
        }else {
            fn.apply(that, args)
        }
        timer = setTimeout(() =>{
            timer = null
        }, delay)
    }
}
// 非立即执行版:  触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
function newDebounce(fn, delay) {
    let timer = null
    return function() {
        const that = this;
        const args = arguments;
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(that, args)
        }, delay)
    }
}