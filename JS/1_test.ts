const mySetInterVal1 = (fn, a, b) => {
    let timeObj = { id: null }

    const helper = (timeout) => {
        timeObj.id = setTimeout(() => {
            fn()
            helper(timeout + b)
        }, timeout);
    }

    helper(a)

    return timeObj
}

const myClear1 = (timeObj) => {
    clearTimeout(timeObj)
}


// 测试用例
const timeObj = mySetInterVal1(() => {
    console.log(`time: ${ +new Date()}`)
}, 500, 100)


setTimeout(() => myClear1(timeObj.id), 10000);