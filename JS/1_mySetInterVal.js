// 第 1 题：写一个 mySetInterVal(fn, a, b),
// 每次间隔 a,a+b,a+2b,...,a+nb 的时间，然后写一个 myClear，停止上面的 mySetInterVal
 function mySetInterVal(fn, a, b) {
    let timeId = { id: null };
    const helper = (fn, a, b) => {
        timeId.id = setTimeout(() => {
            fn();
            helper(fn, a + b, b)    
        }, a);
    }
    helper(fn, a, b)
    return timeId
}
 function myClear(timeId) {
    console.log('timeId:', timeId, typeof timeId)
    timeId && timeId.id && clearTimeout(timeId.id)
    timeId && clearTimeout(timeId)
    console.log('close')
}

const test = mySetInterVal(() => {console.log('start!!' + `time: ${ new Date().getSeconds()}`)}, 100, 500);


setTimeout(() => {
    myClear(test)

}, 5000);