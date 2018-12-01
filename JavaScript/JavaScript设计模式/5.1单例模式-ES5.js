function Resource() {
  // 如果不是第一次 new (instance 肯定是存在的)
  if (Resource.instance)
    return Resource.instance
  else { // 否则 (instance 不存在)
    // 组装新对象
    this.balance = 100
    // 将其存在 Resource 机器上
    Resource.instance = this
  }
}

var r = new Resource()

console.log('r :', r) // 100
r.balance = 50
console.log('r :', r) // 50

var r2 = new Resource()

console.log('r2 :', r2) // 50

r.balance = 55

console.log('r2 :', r2) // 55