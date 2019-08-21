function log(target, name, descriptor) {
  let oldValue = descriptor.value
  descriptor.value = function () {
    console.log(`calling ${name} width `, arguments);
    return oldValue.apply(this, arguments)
  }
  return descriptor
}

class Math {
  @log
  add(a, b) {
    return a + b
  }
}

// 测试
let math = new Math()
const result = math.add(2, 4)
console.log(result);