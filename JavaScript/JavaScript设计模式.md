## 1. 构造器模式 - 创建类模式

### 1.1 构造器模式-ES5

```js
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
```
### 1.2 构造器模式-ES6

```js
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
```

## 2. 原型模式 - 创建类模式

```js
function Student(name, gender, score) {
  this.name = name
  this.gender = gender
  this.score = score
  this.quality = 100
}

Student.prototype.sumScore = function () {
  return this.score + this.quality
}

var whh = new Student('王花花', '女', 98)
var lsd = new Student('李栓蛋', '男', 78)

console.log('es5-whh.name :', whh.name, whh.sumScore());
console.log('es5-lsd.name :', lsd.name, lsd.sumScore());
```

### 2.1 原型模式的应用-ES5

```html
<table id="roster"></table>

<script>
  var rootElement = document.getElementById('roster')

  /* 构造器函数 */
  function Student(name, gender, score) {
    this.name = name
    this.gender = gender
    this.score = score
    this.quality = 100

    this.mount()
  }

  /* 计算总分 */
  Student.prototype.sumScore = function () {
    return this.score + this.quality
  }

  /* 将数据转换成 HTML 并插入到表格中 */
  Student.prototype.mount = function () {
    var tr = document.createElement('tr')
    tr.innerHTML =
      '<td>' + this.name + '</td>' +
      '<td>' + this.gender + '</td>' +
      '<td>' + this.score + '</td>' +
      '<td>' + this.quality + '</td>' +
      '<td>' + this.sumScore() + '</td>';

    rootElement.appendChild(tr)
  }

  var whh = new Student('王花花', '女', 98)
  var lsd = new Student('李栓蛋', '男', 78)

  console.log('es5-whh.name :', whh.name, whh.sumScore());
  console.log('es5-lsd.name :', lsd.name, lsd.sumScore());
</script>
```
### 2.2 原型模式的应用-ES5

```html
<table id="roster"></table>

<script>
  const rootElement = document.getElementById('roster')

  class Student {
    /* 构造函数 */
    constructor(name, gender, score) {
      this.name = name
      this.gender = gender
      this.score = score
      this.quality = 100

      this.mount()
    }

    /* 计算总分 */
    sumScore() {
      return this.score + this.quality
    }

    /* 将数据转换成 HTML 并插入到表格中 */
    mount() {
      const tr = document.createElement('tr')
      tr.innerHTML = `
        <td>${this.name}</td>
        <td>${this.gender}</td>
        <td>${this.score}</td>
        <td>${this.quality}</td>
        <td>${this.sumScore()}</td>
      `;

      rootElement.appendChild(tr)
    }
  }

  const whh = new Student('王花花', '女', 98)
  const lsd = new Student('李栓蛋', '男', 78)

  console.log('es5-whh.name :', whh.name, whh.sumScore());
  console.log('es5-lsd.name :', lsd.name, lsd.sumScore());
</script>
```


