var scope = 'global scope' // 全局变量
function checkscope () {
  var scope = 'local scope' // 局部变量
  function f () { return scope } // 在作用域中返回这个值
  return f()
}
// console.log(checkscope()); // local scope


var scope = 'global scope'
function checkscope () {
  var scope = 'local scope'
  function f () { return scope }
  return f
}

console.log(checkscope()());