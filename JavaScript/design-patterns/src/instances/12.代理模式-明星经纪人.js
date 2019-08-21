// 明星
let star = {
  name: '张三丰',
  age: 43,
  phone: 'star: 18556512523'
}

// 经纪人
let agent = new Proxy(star, {
  get: function (target, key) {
    if (key === 'phone') {
      // 返回经纪人自己的电话
      return 'agent: 16895555566'
    }
    if (key === 'price') {
      // 明星不报价，经纪人报价
      return 120000
    }
    return target[key]
  },
  set: function (target, key, val) {
    if (key === 'customPrice') {
      if (val < 100000) {
        // 最低 10w
        throw new Error('价格太低')
      } else {
        target[key] = val
        return true
      }
    }
  }
})

// 测试
console.log(agent.name);
console.log(agent.age);
console.log(agent.phone);
console.log(agent.price);

agent.customPrice = 150000
console.log('agent.customPrice', agent.customPrice);
agent.customPrice = 90000
console.log('agent.customPrice', agent.customPrice);