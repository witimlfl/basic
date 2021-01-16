
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

// 2.柯里化 add(a,b,c) => add(fn, a)(b)(c)
function currying(fn, ...args) {
    const count = fn.length
    return function() {
        const arg = [...args, ...arguments]
        if(arg.length < count) {
            return currying.call(this, fn, ...arg)
        }else {
            return fn.call(this, ...arg)
        }
    }
}

function add(a,b,c) {
    return a+b+c
}

// console.log('--->', currying(add)(1)(2)(3))

//add(1)(2, 3)(4)() = 10  未接收到新的参数，直接输出
function newCurry(fn, ...args) {
    let curArgs = args || []
    return function next() {
        if(arguments.length > 0) {
            curArgs = [...curArgs, ...arguments]
            return next
        } else {
            return fn.apply(null, curArgs)
        }
    }
}
var newAdd = function(){
    var sum = 0;
    for(var i = 0; i < arguments.length; i++){
        sum += arguments[i];
    }
    return sum;
}

// console.log('3--->', newCurry(newAdd)(1)(2,4)(4)())

//3. promise
// 手写promise.all

Promise.all = (promises) => {
    let length = promises.length

    if(!length) {
        return Error('promises must is an array!')
    }
    return new Promise((resolve, reject) => {
        if(!length) {
            return resolve([])
        }

        let result = [];
        let hasOneReject = false
      
        for(let index in promises) {
            promises[index].then((res) => {
                if(hasOneReject) {
                    return;
                }
                result.push(res)
                length --;
                length || resolve(result)

            }, err => {
                if(hasOneReject) {
                    return;
                }
                hasOneReject = true
                reject(err+'')
                return
            })
        }
    })
}

Promise.any = (promises) => {
    if(!promises) {
        Error('arguments must is an array')
    }
    return new Promise((resolve, reject) => {
        let result = []
        let length = promises.length

        if(!length) {
            resolve(result)
        }
        let hasOneResolve = false

        for(let index in promises) {
            promises[index].then(res =>{
                if(hasOneResolve) return
                hasOneResolve = true
                resolve(res+'aa')
                return
            }, err => {
                if(hasOneResolve) return
                result.push(err)
                length --
                length || reject(result)
            })
        }


    })

}

Promise._all = function (promises) {
    promises = Array.from(promises);//将可迭代对象转换为数组
    return new Promise((resolve, reject) => {
        let index = 0;
        let result = [];
        if (promises.length === 0) {
            resolve(result);
        } else {
            function processValue(i, data) {
                result[i] = data;
                if (++index === promises.length) {
                    resolve(result);
                }
            }
            for (let i = 0; i < promises.length; i++) {
                  //promises[i] 可能是普通值
                  Promise.resolve(promises[i]).then((data) => {
                    processValue(i, data);
                }, (err) => {
                    reject(err);
                    return;
                });
            }
        }
    });
}


Promise._race = (promises) => {
    if(!promises) {
        Error('arguments must is an array')
    }
    return new Promise((resolve, reject) => {
        if(!promises.length) {
           return
        }
        promises.forEach(element => {
            element.then(res => resolve(res), err => reject(err))
        });
    })
}

// const mock = Promise.all([
//     new Promise((resolve, reject) => { resolve(1)}),
//     new Promise((resolve, reject) => { reject(23)}),
//     new Promise((resolve, reject) => { resolve(3)}),
// ])

// const mockAny = Promise.any([
//     new Promise((resolve, reject) => { resolve(1)}),
//     new Promise((resolve, reject) => { reject(2)}),
//     new Promise((resolve, reject) => { resolve(3)}),
// ])

const mockRace = Promise._race([
    new Promise((resolve, reject) => { 
        setTimeout(() => {
            resolve(1)
        }, 500)
       
    }),
    new Promise((resolve, reject) => { 
        setTimeout(() => {
            reject(2)
        }, 100)
       
    }),
    new Promise((resolve, reject) => { 
        setTimeout(() => {
            resolve(3)
        }, 200)
    }),
])

mockRace.then(data => {
    console.log('mock any--->', data)
}, err => {
    console.log('mock error -->', err)
})

