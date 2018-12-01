function Student(name, gender, score) {
  this.name = name
  this.gender = gender
  this.score = score
  this.quality = 100

  this.sumScore = function () {
    return this.score + this.quality
  }
}

var whh = new Student('王花花', '女', 98)
var lsd = new Student('李栓蛋', '男', 78)

console.log('es5-whh.name :', whh.name, whh.sumScore());
console.log('es5-lsd.name :', lsd.name, lsd.sumScore());