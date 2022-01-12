const PEDNING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
  const that = this
  that.state = PEDNING
  this.value = null
  this.resolvedCallbacks = []
  this.rejectedCallbacks = []

  // 待完善 resolve 和 reject 函数
  /*
    1. 首先两个函数都得判断当前状态是否为等待中，因为规范规定只有等待状态才可以改变状态
    2. 将当前状态更改为对应状态，并且将传入的值赋值给 value
    3. 遍历回调函数并执行
  */
  // 1. 对于 resolve 函数来说，首先需要判断传入的值 是否是 Promise 类型
  // 2. 为了保证函数的执行顺序，需要将两个函数体代码使用 setTimeout 包裹起来
  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject)
    }
    setTimeout(() => {
      if (that.state === PEDNING) {
        that.state = RESOLVED
        that.value = value
        that.resolvedCallbacks.map((cb) => cb(that.value))
      }
    }, 0)
  }

  function reject(value) {
    setTimeout(() => {
      if (that.state === PEDNING) {
        that.state = REJECTED
        that.value = value
        that.rejectedCallbacks.map((cb) => cb(that.value))
      }
    }, 0)
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r }

  /*
    1. 首先我们返回一个新的 Promise 对象，并在 Promise 中传入一个函数
    2. 函数的基本逻辑还是和之前一样，往回调数组中 push 函数
    3. 同样，在执行函数的过程中可能会遇到错误，所以使用的 try...catch 包裹
    4. 规范规定，指定 onFulfilled 或者 onRejected 函数时会返回一个 x，并且执行 Promise 解决过
       过程，这是为了不同的 Promise 都可以兼容使用，比如 jQuery 的 Promise 能兼容 ES6 的 Promis
  */

  if (that.state === PEDNING) {
    return (promise2 = new MyPromise((resolve, reject) => {
      that.resolvedCallbacks.push(() => {
        try {
          const x = onFulfilled(that.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (r) {
          reject(r)
        }
      })

      that.rejectedCallbacks.push(() => {
        try {
          const x = onRejected(that.value)
          resolutionProcedure(promise2, x, resolve, reject)
        }catch (r) {
          reject(r)
        }
      })
    }))
  }

  if (that.state === RESOLVED) {
    onFulfilled(that.value)
  }

  if (that.state === REJECTED) {
    onRejected(that.value)
  }
}