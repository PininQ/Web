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

console.log('es5-whh.name :', whh.name, whh.sumScore())
console.log('es5-lsd.name :', lsd.name, lsd.sumScore())
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
    // 将拼接好的 HTML 挂载到页面上
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
</script>
```
### 2.2 原型模式的应用-ES6

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
</script>
```

## 3. 构建者模式 - 创建类模式

```js
var studentCount = 0

function Student() {

}

function StudentBuilder() {
  this.student = new Student()

  this.setName = function (name) {
    this.student.name = name
  }

  this.setGender = function (gender) {
    if (gender !== '男' && gender !== '女') {
      throw '好玩不'
    }

    this.student.gender = gender
  }

  this.setHairLength = function (hairLength) {
    if (
      (this.student.gender === '男' && hairLength > 1) ||
      (this.student.gender === '女' && hairLength > 25)
    ) {
      throw '回去剪头发'
    }

    this.student.hairLength = hairLength
  }

  this.build = function () {
    studentCount++
    console.log(studentCount)
    return this.student
  }
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
```

### 3.1 构建者模式-原型化-ES5

```js
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
```

### 3.2 构建者模式-ES6

```js
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
```

### 3.3 构建者模式的应用-ES5

```html
<form id="create">
  <div>
    姓名：
    <input type="text" name="name" autofocus>
  </div>
  <div>
    性别：
    <input type="radio" name="gender" value="男" checked>男
    <input type="radio" name="gender" value="女">女
  </div>
  <div>
    头发长度：
    <input type="number" name="hairLength">
  </div>
  <input type="submit" value="创建学生">
</form>

<script>
  // <form> 元素；为了给它绑定提交事件
  var createForm = document.getElementById('create')

  // 从此处开始
  init()

  /* 初始化（启动） */
  function init() {
    // 绑定表单提交事件
    createForm.addEventListener('submit', function (e) {
      // 阻止默认跳转
      e.preventDefault()
      // 拿到用户输入的姓名、性别、头发长度
      var name = document.querySelector('[name=name]').value
      var gender = document.querySelector('[name=gender]:checked').value
      var hairLength = document.querySelector('[name=hairLength]').value

      try {
        // 开始使用 builder
        var builder = new StudentBuilder()
        // 分别为其设置属性
        builder.setName(name)
        builder.setGender(gender)
        builder.setHairLength(hairLength)
        // 获取构建好的实例（学生）
        var student = builder.build()
      } catch (e) { // 如果有错误信息，就捕获它，并且弹出错误消息
        alert(e)
      }

      console.log(student)
    })
  }

  function Student() {}

  function StudentBuilder() {
    this.student = new Student()
  }

  StudentBuilder.prototype.setName = function (name) {
    this.student.name = name
  }

  StudentBuilder.prototype.setGender = function (gender) {
    if (gender != '男' && gender != '女')
      throw '好玩不'

    this.student.gender = gender
  }

  StudentBuilder.prototype.setHairLength = function (hairLength) {
    if (
      (this.student.gender == '男' && hairLength > 1) ||
      (this.student.gender == '女' && hairLength > 25)
    ) throw '回去剪头发'

    this.student.hairLength = hairLength
  }

  StudentBuilder.prototype.build = function () {
    return this.student
  }
</script>
```

### 3.4 构建者模式的应用-ES6

```html
<form id="create">
  <div>
    姓名：
    <input type="text" name="name" autofocus>
  </div>
  <div>
    性别：
    <input type="radio" name="gender" value="男" checked>男
    <input type="radio" name="gender" value="女">女
  </div>
  <div>
    头发长度：
    <input type="number" name="hairLength">
  </div>
  <input type="submit" value="创建学生">
</form>

<script>
  // <form> 元素；为了给它绑定提交事件
  const createForm = document.getElementById('create')

  // 从此处开始
  init()

  /* 初始化（启动） */
  function init() {
    // 绑定表单提交事件
    createForm.addEventListener('submit', e => {
      // 阻止默认跳转
      e.preventDefault()
      // 拿到用户输入的姓名、性别、头发长度
      const name = document.querySelector('[name=name]').value
      const gender = document.querySelector('[name=gender]:checked').value
      const hairLength = document.querySelector('[name=hairLength]').value

      try {
        // 开始使用 builder
        const builder = new StudentBuilder()
        // 分别为其设置属性
        builder.setName(name)
        builder.setGender(gender)
        builder.setHairLength(hairLength)
        // 获取构建好的实例（学生）
        const student = builder.build()

        console.log(student)
      } catch (e) { // 如果有错误信息，就捕获它，并且弹出错误消息
        alert(e)
      }
    })
  }

  function Student() {}

  class StudentBuilder {
    constructor() {
      this.student = new Student()
    }

    setName(name) {
      this.student.name = name
    }

    setGender(gender) {
      if (gender != '男' && gender != '女')
        throw '好玩不'

      this.student.gender = gender
    }

    setHairLength(hairLength) {
      if (
        (this.student.gender == '男' && hairLength > 1) ||
        (this.student.gender == '女' && hairLength > 25)
      ) throw '回去剪头发'

      this.student.hairLength = hairLength
    }

    build() {
      return this.student
    }
  }
</script>
```
## 4. 工厂模式 - 创建类模式

### 4.1 工厂模式-ES5

```js
function Student(name, subjects) {
  this.name = name
  // ...

  // 如果是文科生：['政治', '历史', '地理']
  // 如果是理科生：['数学', '物理', '化学']
  // liberal_arts / science
  this.subjects = subjects
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

var whh = factory('王花花', '文科')
var lsd = factory('李栓蛋', '理科')
var zks = factory('赵可爽', '体育')
var lbb = factory('刘贝贝', '啦啦')

console.log(whh)
console.log(lsd)
console.log(zks)
```
### 4.2 工厂模式-ES6

```js
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
```

### 4.3 工厂模式的应用-ES5

```html
<form id="create">
  <div>
    姓名：<input type="text" name="name">
  </div>
  <div>
    专业：<select name="type">
      <option value="文科">文科</option>
      <option value="理科">理科</option>
      <option value="体育">体育</option>
    </select>
  </div>
  <div>
    <input type="submit" value="创建用户">
  </div>
</form>

<script>
  init()

  /* 初始化 */
  function init() {
    // 获取表单元素，等着绑定事件
    var form = document.getElementById('create')
    // 给表单绑定提交事件
    form.addEventListener('submit', function (e) {
      e.preventDefault()

      // 获取姓名和专业
      var name = document.querySelector('[name=name]').value
      var type = document.querySelector('[name=type]').value
      // 新建用户
      var student = studentFactory(name, type)

      // 重置表单
      form.reset()

      console.log(student);
    })
  }

  function Student(name, subjects) {
    this.name = name
    // ...

    // 如果是文科生：['政治', '历史', '地理']
    // 如果是理科生：['数学', '物理', '化学']
    // liberal_arts / science
    this.subjects = subjects
  }

  /**
   * 创建学生
   * @param {string} name 姓名
   * @param {string} type 文科还是理科
   * @return {Student}
   */
  function studentFactory(name, type) {
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
</script>
```

### 4.4 工厂模式的应用-ES6

```html
<form id="create">
  <div>
    姓名：<input type="text" name="name">
  </div>
  <div>
    专业：<select name="type">
      <option value="文科">文科</option>
      <option value="理科">理科</option>
      <option value="体育">体育</option>
    </select>
  </div>
  <div>
    <input type="submit" value="创建用户">
  </div>
</form>

<script>
  init()

  /* 初始化 */
  function init() {
    // 获取表单元素，等着绑定事件
    const form = document.getElementById('create')
    // 给表单绑定提交事件
    form.addEventListener('submit', e => {
      e.preventDefault()

      // 获取姓名和专业
      const name = document.querySelector('[name=name]').value
      const type = document.querySelector('[name=type]').value
      // 新建用户
      const student = studentFactory(name, type)
      // 重置表单
      form.reset()

      console.log(student);
    })
  }

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
  function studentFactory(name, type) {
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
</script>
```

### 4.5 抽象工厂模式-ES5

```js
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
```
