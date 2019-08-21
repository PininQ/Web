// 一个原型 对象
const prototype = {
  getName: function () {
    return this.first + ' ' + this.last
  },
  say: function () {
    alert('hello')
  }
}

// 基于原型创建 x
let x = Object.create(prototype)
x.first = 'A'
x.last = 'B'
alert(x.getName())
x.say()

// 基于原型创建 y
let y = Object.create(prototype)
y.first = 'C'
y.last = 'D'
alert(y.getName())
y.say()