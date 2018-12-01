class Student {
  constructor(name, gender, score) {
    this.name = name
    this.gender = gender
    this.score = score
    this.quality = 100
  }

  sumScore() {
    return this.score + this.quality
  }
}

var whh = new Student('王花花', '女', 98)
var lsd = new Student('李栓蛋', '男', 78)

whh.score = 100;
console.log('es6-whh.name :', whh.name, whh.sumScore());
console.log('es6-lsd.name :', lsd.name, lsd.sumScore());