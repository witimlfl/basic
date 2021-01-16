// promise A+规范源码
// https://juejin.cn/post/6915719287395057671#heading-0
class MyPromise {

    static PENDING = 'pending'
    static RESOLVED = 'resolved'
    static REJECTED = 'rejected'

    constructor(executor) { // executor 函数，参数是（resolve, reject）
        this.state = MyPromise.PENDING;
        this.value = '';
        this.reason = ''
        this.resolvedCallback = []
        this.rejectedCallback = []

        let resolve = (value) => {
            if(this.state === MyPromise.PENDING) {
                this.state = MyPromise.RESOLVED;
                this.value = value;
                this.resolvedCallback.forEach(fn => fn(value))
            }
        }

        let reject = (reason) => {
            if(this.state === MyPromise.PENDING) {
                this.state = MyPromise.REJECTED;
                this.reason = reason;
                this.rejectedCallback.forEach(fn => fn(reason))
            }
        }

        try{
            executor(resolve, reject)
        }catch(err) {
            console.log('reject reason:', err)
            reject(err)
        }
    }

    then() {

    }

    static resolve() {

    }

    static reject() {

    }

    static all() {

    }

    static race() {

    }

    static any() {

    }

    static allSettled() {

    }


}