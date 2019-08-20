import StateMachine from 'javascript-state-machine'

// 状态机模型
let fsm = new StateMachine({
  init: 'pending', // 初始化状态
  transitions: [{
      name: 'resolve', // 事件名称
      from: 'pending',
      to: 'fullfilled'
    },
    {
      name: 'reject', // 事件名称
      from: 'pending',
      to: 'rejected'
    },
  ],
  methods: {
    // 监听 resolve - 成功
    onResolve: function (state, data) {
      // state - 当前状态机实例； data - fsm.resolve(xxx) 传递的参数
      data.successList.forEach(fn => fn());
    },
    // 监听 reject - 失败
    onReject: function (state, data) {
      // state - 当前状态机实例；data - fsm.reject(xxx) 传递的参数
      data.failList.forEach(fn => fn());
    }
  }
})

// 定义 Promise
class MyPromise {
  constructor(fn) {
    this.successList = []
    this.failList = []

    fn(() => {
      // resolve 函数
      fsm.resolve(this)
    }, () => {
      // reject 函数
      fsm.reject(this)
    })
  }
  then(successFn, failFn) {
    this.successList.push(successFn)
    this.failList.push(failFn)
  }
}

// 测试代码
function loadImg(src) {
  const promise = new Promise(function (resolve, reject) {
    let img = document.createElement('img')
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject()
    }
    img.src = src
  })
  return promise
}
let src = 'https://biaoyansu.com/img/biaoyansu_logo.svg'
let result = loadImg(src)

result.then(function () {
  console.log('ok1');
}, function () {
  console.log('fail1');
})

result.then(function () {
  console.log('ok2');
}, function () {
  console.log('fail2');
})