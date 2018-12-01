let studentCount = 0

class Student {

}

class StudentBuilder {
  constructor() {
    this.student = new Student()
  }

  setName(name) {
    this.student.name = name
  }

  setGender(gender) {
    if (gender !== '男' && gender !== '女') {
      throw '好玩不'
    }

    this.student.gender = gender
  }

  setHairLength(hairLength) {
    if (
      (this.student.gender === '男' && hairLength > 1) ||
      (this.student.gender === '女' && hairLength > 25)
    ) {
      throw '回去剪头发'
    }

    this.student.hairLength = hairLength
  }

  build() {
    studentCount++
    console.log(studentCount)
    return this.student
  }
}

const builder = new StudentBuilder()
builder.setName('王花花')
builder.setGender('男')
builder.setHairLength(1)
const whh = builder.build()

const builder2 = new StudentBuilder()
builder2.setName('李栓蛋')
builder2.setGender('女')
builder2.setHairLength(20)
const lsd = builder2.build()

console.log(whh)
console.log(lsd)