function Set () {
  this.values = {} // 集合数据保存在对象的属性里
  this.n = 0 // 集合中值的个数
  this.add.apply(this, arguments) // 把所有参数都添加进这个集合中
}

// 将每个参数都添加到集合中
Set.prototype.add = function () {
  for (var i = 0; i < arguments.length; i++) {
    var val = arguments[i]
    var str = Set._v2s(val) // 把它转换为字符串

    // 如果不在集合中
    if (!this.values.hasOwnProperty(str)) {
      this.values[str] = val // 把字符串和值对应起来
      this.n++ //集合中值的计数加一
    }
  }

  return this // 支持链式方法调用
}

// 从集合删除元素，这些元素由参数指定
Set.prototype.remove = function () {
  for (var i = 0; i < arguments.length; i++) {
    var str = Set._v2s(arguments[i])

    // 如果它在集合中
    if (this.values.hasOwnProperty(str)) {
      delete this.values[str] // 删除它
      this.n-- // 集合中值的计数减一
    }
  }

  return this // 支持链式方法调用
}

// 如果集合包含这个值，则返回  true，否则返回 false
Set.prototype.contains = function (values) {
  return this.values.hasOwnProperty(Set._v2s(values))
}

// 返回集合的大小
Set.prototype.size = function () {
  return this.n
}

// 遍历集合中的所有元素，在指定的上下文中调用 f
Set.prototype.foreach = function (f, context) {
  for (var s in this.values) { // 遍历集合中的所有字符串
    if (this.values.hasOwnProperty(s)) { // 忽略继承的属性
      f.call(context, this.values[s]) // 调用 f, 传入 value
    }
  }
}

// 这是一个内部函数，用以将任意 JavaScript 值和唯一的字符串对应起来
Set._v2s = function (val) {
  switch (val) {
    case undefined:
      return 'u' // 特殊的原始值
    case null:
      return 'n' // 值只有一个字母
    case true:
      return 't' // 代码
    case false:
      return 'f'
    default:
      switch (typeof val) {
        case 'number':
          return '#' + val // 数字都带有 #  前缀
        case 'string':
          return '"' + val // 字符串都带有 " 前缀
        default:
          return '@' + objectId(val) // Objs and funcs get @
      }
  }

  // 对任意对象来说，都会返回一个字符串
  // 针对不同的对象，这个函数会返回不同的字符串
  // 对于同一个对象的多次调用，总是返回相同的字符串
  // 给 o 创建了一个属性，在 ES5 中，这个属性是不可枚举且是只读的
  function objectId (o) {
    var prop = "|**objectid**|" // 私有属性，用以存放id

    // 如果对象没有 id
    if (!o.hasOwnProperty(prop)) {
      o[prop] = Set._v2s.next++ // 将下一个值赋给它
    }
    return o[prop] // 返回这个 id
  }
}

Set._v2s.next = 100

// 测试
var s = new Set()
s.add(123)
 .add(3333)
 .size()
 .remove(123)
 .add('test')
 .add(null)
 .add(undefined)
 .add(a => a)
 .add([])
 .add({ name: 'xiaoming' })
 .add(new Date())
 .foreach(a => console.log(a), this)
