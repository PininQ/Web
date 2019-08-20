// stream 用到自定义事件
const fs = require('fs')
const readline = require('readline')

let rl = readline.createInterface({
  input: fs.createReadStream('./data/file.txt')
})

let lineNum = 1
rl.on('line', function (line) {
  // console.log(line);
  lineNum++
})

rl.on('close', function () {
  console.log('lineNum: ', lineNum);
})