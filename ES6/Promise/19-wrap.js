/*
把回调包装成Promise 最为常见，他有两个显而易见的好处
    1. 可读性更好
    2. 返回的结果可以加入任何 Promise 队列
*/
const fs = require('./FileSystem')

fs.readFile('./README.md', 'utf-8')
  .then(content => {
    console.log(content)
  })