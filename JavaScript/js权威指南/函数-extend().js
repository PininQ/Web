// 定义一个扩展函数，用来将第二个以及后续参数复制到第一个参数中
// 处理了 IE bug
// 如果 o 的属性拥有一个不可枚举属性，也就是说，将不会正确地处理诸如 toString 的属性,除非显式的检测它

// 将 函数的返回值赋值给 extend
var extend = (function () {
  // 在修复之前，先检擦是否存在 bug
  for (var p in { toString: null }) {
    // 如果代码执行到这里，那么 for/in 循环会正确工作并返回
    // 一个简单版本的 extend() 函数
    return function extend (o) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]
        for (var prop in source) o[prop] = source[prop]
      }
      return o
    }
  }


  // 如果代码执行 到这里，说明 for/in 循环不会被枚举测试对象的 toString 属性
  // 因此返回另一个版本的 extend() 函数，这个函数显示测试
  // Object.prototype 中不可枚举属性
  return function patchedExtend (o) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      // 复制所有的可枚举 属性
      for (var prop in source) o[prop] = source[prop]

      // 现在检查特殊属性
      for (var j = 0; j < protoprops.length; j++) {
        prop = protoprops[j]
        if (source.hasOwnProperty(prop))
          o[prop] = source[prop]
      }
    }
    return o
  }

  // 这个列表列出了需要检查的特殊属性
  var protoprops = ['toString', 'valueOf', 'constructor', 'hasOwnproperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString']
}())

var obj1 = { a: 1, b: 200 }
var obj2 = { c: 'ccc' }
// 复制第二个及后续的参数到第一个参数中
console.log(extend(obj1, obj2));
