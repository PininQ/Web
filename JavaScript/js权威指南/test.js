/* function counter (n) {
  return {
    get count () { return n++ },
    set count (m) {
      if (m >= n) n = m
      else throw Error('count can only be set to a larger value')
    }
  }
}

var c = counter(1000)
console.log(c.count); // 1000
console.log(c.count); // 1001
c.count = 2000
console.log(c.count); // 2000
c.count = 2000 // Error
 */

/* function f (y) { // 待绑定的函数
  return this.x + y
}
var o = { x: 1 } // 将要绑定的对象
var g = f.bind(o) // 通过调用 g(x) 来调用 o.f(x)
console.log(g(3)); */

/* // 自己实现 bind 功能
// 返回一个函数，通过调用 它来调用 o 中的方法 f()，传递它所有的实参
function bind (f, o) {
  // 如果 bind() 方法存在的话，使用 bind() 方法
  if (f.bind) return f.bind(o)
  else return function () {
    return f.apply(o, arguments);
  }
}

// 返回两个实参的和
var sum = function (x, y) { return x + y }
// 创建一个类似 sum 的新函数，但 this 的值绑定到 null
// 并且第一个参数 绑定到 1，这个新的函数期望只传入一个实参
var succ = sum.bind(null, 1)
// 3: x 绑定到 1，并传入 2 作为实参 y
console.log(succ(2));

// 另外一个做累加计算的函数
function f (y, z) { return this.x + y + z }
// 绑定 this 和 y
var g = f.bind({ x: 1 }, 2)
// 6: this.x 绑定到 1，y 绑定到 2，z 绑定到 3
console.log(g(3)); */

/* // ES3 中实现 Function.bind() 方法
if (!Function.prototype.mybind) {
  Function.prototype.mybind = function (o) {
    // 将 this 和 arguments 的值保存至变量中
    // 以便在后面嵌套的函数中可以使用它们
    var self = this;
    var boundArgs = arguments;

    // bind() 方法的返回值是一个函数
    return function () {
      // 创建一个实参列表，将传入 bind() 的第二个及后续的实参都传入这个函数
      var args = [], i;
      for (var i = 1; i < boundArgs.length; i++) {
        args.push(boundArgs[i])
      }
      console.log(boundArgs);
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i])
      }
      console.log(arguments);
      // 现在将 self 作为 o 的方法来调用，传入这些实参
      return self.apply(o, args)
    }
  }
}

function f (y, z) { return this.x + y + z }
// 绑定 this 和 y
var g = f.mybind({ x: 1 }, 2)
console.log(g(5)); */

/* // 计算元素的平均值和标准差
var data = [1, 1, 3, 5, 5] // 待处理的数组

// 平均数是所有元素的累加和值除以元素个数
var total = 0

for (var i = 0; i < data.length; i++) {
  total += data[i]
}
var mean = total / data.length

// 计算标准差，首先计算每个数据减去 平均数之后偏差的平方然后求和
total = 0
for (var j = 0; j < data.length; j++) {
  var deviation = data[j] - mean;
  total += deviation * deviation;
}

// 标准差
var stddev = Math.sqrt(total / (data.length - 1))
console.log(stddev); */

/* // 使用 map reduce 计算标准差
var sum = function (x, y) { return x + y }
var square = function (x) { return x * x }

// 计算平均和 和 标准差
var data = [1, 1, 3, 5, 5]
var mean = data.reduce(sum) / data.length
var deviations = data.map(function (x) { return x - mean })
var stddev = Math.sqrt(deviations.map(square).reduce(sum) / (data.length - 1))
console.log(stddev); */


/* // 自定义 map 函数
// 对于每个数组元素调用函数 f()，并返回一个结果数组
var mymap = Array.prototype.map
  ? function (a, f) { return a.map(f) } // 如果已经存在 map 方法，就直接使用它
  : function (a, f) {                   // 否则，自己实现一个
    var result = []
    for (var i = 0, len = a.length; i < len; i++) {
      if (i in a) result[i] = f.call(null, a[i], i, a)
    }
    return result
  }

mymap([1, 2, 11, 5, 5], (a, b, c) => { return { a: a, b: b, c: c } })

// 自定义 reduce 函数
// 使用函数 f() 和可选的初始值将数组 a 减至一个值
var myreduce = Array.prototype.reduce
  ? function (a, f, initial) { // 如果 Array.prototype.reduce 存在的话，就是用这个方法
    if (arguments.length > 2)
      a.reduce(f, initial) // 如果传入了一个初始值
    else return a.reduce(f) // 否则没有初始值

  }
  : function (a, f, initial) { // 该算法来自 ES5 规范
    var i = 0, len = a.length, accumulator

    // 以特定的初始值开始，否则第一个值取自 a
    if (arguments.length > 2) accumulator = initial
    else { // 找到数组中第一个已定义的索引
      if (len == 0) throw TypeError()

      while (i < len) {
        if (i in a) {
          accumulator = a[i++]
          break;
        }
        else i++;
      }

      if (i == len) throw TypeError()
    }

    // 对于数组中剩下的元素依次调用 f()
    while (i < len) {
      if (i in a) {
        accumulator = f.call(undefined, accumulator, a[i], i, a)
      }
      i++
    }

    return accumulator
  }

myreduce([1, 2, 3, 4, 5], (a, b) => a + b) */

/* // 高阶函数：高阶函数是操作函数的函数，它接受一个或多个函数作为参数，并返回一个新函数

// 这个高阶函数返回一个新的函数，这个新的函数将它的实参传入 f()，并返回 f 的返回值的逻辑非
function not (f) {
  // 返回一个新的函数
  return function () {
    // 调用 f()
    var result = f.apply(this, arguments)
    return !result // 对结果求反
  }
}

// 判断 x 是否为偶数的函数
var even = function (x) {
  return x % 2 === 0
}

var odd = not(even) // 一个新函数，所做的事情和 even() 相反
console.log([1, 1, 3, 5, 5].every(odd)) // true 每个元素都是奇数 */

/* // 不完全函数：一种函数变换技巧，即把一次完整的函数调用拆成多次函数调用，每次传入的实参都是完整实参的一部分
// 每个拆分的函数叫做不完全函数，每次函数的调用叫做不完全调用。

// 实现一个工具函数，将类数组对象或对象转换为整整的数组
// 在后面的代码中使用这个方法将 arguments 对象转换为真正的数组
function array (a, n) {
  return Array.prototype.slice.call(a, n || 0)
}

// 这个函数的实参传递至左侧
function partialLeft (f) {
  var args = arguments; // 保存外部表的实参数组
  return function () {
    var a = array(args, 1) // 开始处理外部的第一个 args
    a = a.concat(array(arguments)) // 然后增加所有的内部实参
    return f.apply(this, a) // 然后基于这个实列列表调用 f()
  }
}

// 这个函数的实参传递至右侧
function partialRight (f) {
  var args = arguments; // 保存外部表的实参数组
  return function () {
    var a = array(arguments) // 从内部参数开始
    a = a.concat(array(args, 1)) // 然后从外部第1个 args 开始添加
    return f.apply(this, a) // 然后基于这个实列列表调用 f()
  }
}

// 实参列表中的 undefined 值都被填充
function partial (f) {
  var args = arguments // 保存外部实参数组
  return function () {
    var a = array(args, 1) // 从外部 args 开始
    var i = 0, j = 0;
    // 遍历 args 从内部实参填充 undefined 值
    for (; i < a.length; i++) {
      if (a[i] === undefined)
        a[i] = arguments[j++]
    }

    // 现在将剩下的内部实参都追加进去
    a = a.concat(array(arguments, j))
    return f.apply(this, a)
  }
}


// 这个函数带有三个惨实参
var f = function (x, y, z) {
  return x * (y - z)
}

// 注意这三个不完全调用之间的区别
console.log(partialLeft(f, 2)(3, 4)) // -2 绑定第 1 个实参：2 * (3 - 4)
console.log(partialRight(f, 2)(3, 4)) // 6 绑定最后一个实参：3 * (4 - 2)
console.log(partial(f, undefined, 2)(3, 4)) // -6 绑定中间的实参：3 * (2 - 4)


// 使用不完全调用的组合来求平均数和标准差
var data = [1, 1, 3, 5, 5]
var sum = function (x, y) {
  return x + y
}
var product = function (x, y) {
  return x * y
}
var neg = partial(product, -1) // 定义其它函数
var square = partial(Math.pow, undefined, 2)
var sqrt = partial(Math.sqrt, undefined, .5)
var reciprocal = partial(Math.pow, undefined, -1)

var mean = product(reduce(data, sum), reciprocal(data.length))
var stddev = sqrt(product(reduce(map(data,
              compose(square,
                partial(sum, neg(mean)))),
                sum),
                reciprocal(sum(data.length, -1))))

console.log(stddev); */


// 判断值类型的 type() 函数

/**
 * 以自渡川形式返回 o 的类型：
 * -如果 o 是 null，返回 "null"；如果 o 是 NaN，返回 "nan"
 * -如果 typeof 所返回的值不是 "object"，则返回这个值
 * -（注意：有一些 JavaScript 的实现将正则表达式识别为函数）
 * -如果 o 的类不是 "Object"，则返回这个值
 * -如果 o 包含构造函数并且这个构造函数具有名称，则返回这个名称
 * -否则，一律返回 "Object"
 * @param {*} o
 */
/* function type(o) {
  var t, c, n; // type, class, name

  // 处理 null 值的特殊情形
  if (o === null) return 'null'

  // 另一种特殊情况：NaN 和它自身不相等
  if (o !== o) return 'nan'

  // 如果 typeof 的值不是 "object" 则返回这个值
  // 可以识别出原始值的类型和函数
  if ((t = typeof o) !== 'object') return t

  // 返回对象的类名 除非值为 "Object"
  // 可以识别出大多数的内置对象
  if ((c = classof(o)) !== 'Object') return c

  // 如果对象构造函数的名称存在的话，则返回它
  if (o.constructor && typeof o.constructor === 'function' && (n = o.constructor.getName())) return n

  // 其他类型都无法辨别，一律返回 "Object"
  return 'Object'
}

// 返回对象的类
function classof(o) {
  return Object.prototype.toString.call(o).slice(8, -1)
}

// 返回函数的名称（可能是空字符串），不是函数的话返回 null
Function.prototype.getName = function () {
  if ('name' in this) return this.name
  return this.name = this.toString().match(/function\s*([^(]*)\(/)[1]
} */












