// 假如一个Promise已经完成了，再.then()会怎样？

console.log('start')

let promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('the promise fulfilld')
    resolve('hello, world')
  }, 1000)
})

// 给 promise 追加 then
setTimeout(() => {
  promise.then(value => {
    console.log(value) // 两秒钟后执行
  })
}, 3000)