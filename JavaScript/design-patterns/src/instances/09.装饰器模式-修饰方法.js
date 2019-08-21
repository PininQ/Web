function readonly(target, name, descriptor) {
  descriptor.writable = false
  return descriptor
}

class Person {
  constructor() {
    this.first = 'A'
    this.last = 'B'
  }

  // 装饰器修饰方法
  @readonly
  name() {
    return `${this.first} ${this.last}`
  }
}

let p = new Person()
console.log(p.name());

// 只读的方法不不能修改
// p.name = function () {
//   alert(100)
// }