var studentCount = 0

function Student() {

}

function StudentBuilder() {
  this.student = new Student()
}

/* 下面部分改成 ES5 的原型模式 */
StudentBuilder.prototype.setName = function (name) {
  this.student.name = name
}

StudentBuilder.prototype.setGender = function (gender) {
  if (gender !== '男' && gender !== '女') {
    throw '好玩不'
  }

  this.student.gender = gender
}

StudentBuilder.prototype.setHairLength = function (hairLength) {
  if (
    (this.student.gender === '男' && hairLength > 1) ||
    (this.student.gender === '女' && hairLength > 25)
  ) {
    throw '回去剪头发'
  }

  this.student.hairLength = hairLength
}

StudentBuilder.prototype.build = function () {
  studentCount++
  console.log(studentCount)
  return this.student
}

var builder = new StudentBuilder()
builder.setName('王花花')
builder.setGender('男')
builder.setHairLength(1)
var whh = builder.build()

var builder2 = new StudentBuilder()
builder2.setName('李栓蛋')
builder2.setGender('女')
builder2.setHairLength(20)
var lsd = builder2.build()

console.log(whh)
console.log(lsd)