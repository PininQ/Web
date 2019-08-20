const EventEmitter = require('events').EventEmitter

// 继承
class Dog extends EventEmitter {
  constructor(name) {
    super()
    this.name = name
  }
}

let simon = new Dog('simon')
// 监听
simon.on('bark', function () {
  console.log(this.name, 'barked-1');
})
simon.on('bark', function () {
  console.log(this.name, 'barked-2');
})
// 触发自定义事件 bark，每 1s 触发依次
setInterval(function () {
  simon.emit('bark')
}, 1000)