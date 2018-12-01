function Student() {
  this.intro = '我是个学生'
}

function Teacher() {
  this.intro = '我是个老师'
}

/**
 * 生产学生
 * @param {string} factory
 */
function studentFactory() {
  return new Student()
}

/**
 * 生产老师
 * @param {string} factory
 */
function teacherFactory() {
  return new Teacher()
}

/**
 * 用户抽象工厂
 * @param {string} factory
 */
function userAbstractFactory(factory) {
  // 判断工厂类型
  switch (factory) {
    case 'student':
      return studentFactory
    case 'teacher':
      return teacherFactory
    default:
      throw '没有这个工厂'
  }
}

var taeFactory = userAbstractFactory('teacher')
var tea = taeFactory('王花花', '特级')
console.log(tea)
var stuFactory = userAbstractFactory('student')
var stu = stuFactory('李栓蛋')
console.log(stu)