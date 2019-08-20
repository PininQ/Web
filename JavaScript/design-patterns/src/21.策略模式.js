// class User {
//   constructor(type) {
//     this.type = type
//   }
//   buy() {
//     if (this.type === 'ordinary') {
//       console.log('普通用户购买');
//     } else if (this.type === 'member') {
//       console.log('会员用户购买');
//     } else if (this.type === 'vip') {
//       console.log('vip 用户购买');
//     }
//   }
// }

// // 测试代码
// let u1 = new User('ordinary')
// u1.buy()
// let u2 = new User('member')
// u2.buy()
// let u3 = new User('vip')
// u3.buy()

// start - 策略模式
class OrdinaryUser {
  buy() {
    console.log('普通用户购买');
  }
}

class MemberUser {
  buy() {
    console.log('会员用户购买');
  }
}

class VipUser {
  buy() {
    console.log('vip 用户购买');
  }
}

let u1 = new OrdinaryUser()
u1.buy()
let u2 = new MemberUser()
u2.buy()
let u3 = new VipUser()
u3.buy()
// end - 策略模式