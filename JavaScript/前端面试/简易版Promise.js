/*
1. 首先创建三个常量用于表示状态，对于经常使用的一些值都应该通过常量来管理，便于开发以及后期维护

2. 在函数体内首先创建了常量 that，因为代码可能会异步执行，用于胡哦去正确的 this 对象

3. 一开始 Promise 的状态应该是 pending

4. value 变量用于保存 resolve 或者 reject 中传入的值

5. resolvedCallbacks 和 rejectedCallbacks 用于保存 then 中的回调，因为当执行完 Promise 时状态可能
   还是等待中，这时候后应该把 then 中的回调保存起来用于状态改变时使用
*/

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
  function resolve(value) {
    if (that.state === PEDNING) {
      that.state = RESOLVED
      that.value = value
      that.resolvedCallbacks.map(cb => cb(that.value))
    }
  }

  function reject(value) {
    if (that.state === PEDNING) {
      that.state = REJECTED
      that.value = value
      that.rejectedCallbacks.map(cb => cb(that.value))
    }
  }
}


/*
  1. 实现执行传入的函数并且将之前两个函数当作参数传进去
  2. 需要注意的是，可能执行函数过程中会遇到错误，需要捕获错误并且执行 reject 函数
*/
// try {
//   fn(resolve, reject)
// } catch (e) {
//   reject(e)
// }

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r }

  if (that.state === PEDNING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }
  if (that.state === RESOLVED) {
    onFulfilled(that.value)
  }
  if (that.state === REJECTED) {
    onRejected(that.value)
  }
}


/*
  1. 首先判断两个参数是否为函数类型，一位内这两个参数是可选参数
  2. 当参数不是函数类型，需要创建一个函数赋值给对应的参数，同时也实现了透传，比如如下代码
*/

// 该代码在简单版中会报错
// 只是作为一个透传的例子
// Promise.resolve(4).then(value => console.log(value))

// 接下来就是一系列的判断状态的逻辑，当状态不是等待状态时，就去执行相对应的函数。
// 如果状态是等待态的话，就往回调函数中国 push 函数，比如如下代码就会进入等待态的逻辑

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 0)
}).then(value => {
  console.log(value);
})

















