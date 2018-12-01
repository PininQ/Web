class Student {
  constructor(name, subjects) {
    this.name = name
    // ...

    // 如果是文科生：['政治', '历史', '地理']
    // 如果是理科生：['数学', '物理', '化学']
    // liberal_arts / science
    this.subjects = subjects
  }
}

/**
 * 创建学生
 * @param {string} name 姓名
 * @param {string} type 文科还是理科
 * @return {Student}
 */
function factory(name, type) {
  switch (type) {
    case '文科':
      return new Student(name, ['政治', '历史', '地理'])
    case '理科':
      return new Student(name, ['数学', '物理', '化学'])
    case '体育':
      return new Student(name, ['长跑', '跳远', '跳高'])
    default:
      throw new Error('没有这个专业，别瞎填')
  }
}

const whh = factory('王花花', '文科')
const lsd = factory('李栓蛋', '理科')
const zks = factory('赵可爽', '体育')
const lbb = factory('刘贝贝', '啦啦')

console.log(whh)
console.log(lsd)
console.log(zks)