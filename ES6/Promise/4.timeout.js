// 简单的范例-定时执行

console.log('here we go')

new Promise(resolve => {
    setTimeout(() => {
      resolve('hello');
    }, 2000)
  })
  .then(value => {
    console.log(value + ' world!')
  })