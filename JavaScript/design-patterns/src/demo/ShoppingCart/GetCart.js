class Cart {
  constructor() {
    this.list = []
  }

  add(data) {
    this.list.push(data)
  }

  del(id) {
    this.list = this.list.filter(item => {
      if (item.id === id) {
        return false
      }
      return true
    })
  }

  getList() {
    let num = 1
    return this.list.map(item => {
      return (num++) + ' ' + item.name + ' ￥' + item.price
    }).join('\n')
  }
}

// 返回单例
let getCart = (function () {
  let cart
  return function () {
    if (!cart) {
      cart = new Cart()
    }
    return cart
  }
})()

export default getCart