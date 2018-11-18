// Promise会自动捕获内部异常，并交给rejected响应函数处理-catch捕获（推荐做法）

console.log('here we go')
new Promise(resolve => {
    setTimeout(() => {
      throw new Error('bye')
    }, 2000)
  })

  .then(value => {
    console.log(value + ' world')
  })
  .catch(error => {
    console.log('Error: ', error.message)
  })