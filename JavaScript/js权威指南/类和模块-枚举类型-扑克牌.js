// 通过原型继承创建一个新对象
function inherit (p) {
  // p 是一个对象，但不能是 null
  if (p == null)
    throw TypeError()

  if (Object.create) // 如果 Object.create 存在，直接使用它
    return Object.create(p)

  var t = typeof p // 否则进一步检测
  if (t !== 'object' && t !== 'function')
    throw TypeError()

  // 定义一个空构造函数
  function f () { }
  // 将其原型树熊设置为 p
  f.prototype = p
  return new f() // 使用 f() 创建 p 的继承对象
}

// 这个函数创建一个新的枚举类型，实参对象表示每个实例的名字和值
// 返回值是一个构造函数，它标识这个新类
// 注意：这个构造函数也会抛出异常：不能使用它来创建该类型的新实例
// 返回的构造函数包含 键/值对 的映射表
// 包括有 值 组成的数组，以及一个 foreach() 迭代器函数
function enumeration (namesToValues) {
  // 这个虚拟的构造函数是返回值
  var enumeration = function () {
    throw "Can't Instantiate Enumerations"
  }

  // 枚举值继承自这个对象
  var proto = enumeration.prototype = {
    constructor: enumeration, // 标识类型
    toString: function () { return this.name }, // 返回名字
    valueOf: function () { return this.value }, // 返回值
    toJSON: function () { return this.name }, // 转换为 JSON
  }

  enumeration.values = [] // 用以存放枚举对象的 数组

  // 现在创建新类型的实例
  for (name in namesToValues) {
    var e = inherit(proto)        // 创建一个代表它的对象
    e.name = name                 // 给它一个名字
    e.value = namesToValues[name]// 给它一个值
    enumeration[name] = e         // 将它设置为构造函数的属性
    enumeration.values.push(e)    // 将它存储到值数组中
  }

  // 一个类方法，用来对类的实例进行迭代
  enumeration.foreach = function (f, c) {
    for (var i = 0; i < this.values.length; i++) {
      f.call(c, this.values[i])
    }
  }

  // 返回标识这个新类型 的构造函数
  return enumeration
}


// 定义一个表示 "玩牌" 的类
function Card (suit, rank) {
  this.suit = suit // 每张牌都有花色
  this.rank = rank // 以及点数
}

// 使用枚举类型定义花色和点数
Card.Suit = enumeration({ Clubs: 1, Diamonds: 2, Hearts: 3, Spades: 4 })
Card.Rank = enumeration({
  Two: 2, Three: 3, Four: 4, Five: 5, Six: 6,
  Seven: 7, Eight: 8, Nine: 9, Ten: 10, Jack: 11,
  Queen: 12, King: 12, Ace: 14
})

// 定义用以描述牌面的文本
Card.prototype.toString = function () {
  return this.rank.toString() + ' of ' + this.suit.toString()
}

// 比较扑克牌中两张牌的大小
Card.prototype.compareTo = function (that) {
  if (this.rank < that.rank) return -1
  if (this.rank > that.rank) return 1
  return 0
}

// 以 扑克牌的玩法规则对 牌进行排序的函数
Card.orderByRank = function (a, b) {
  return a.compareTo(b)
}

// 以桥牌的玩法规则对扑克牌进行排序的函数
Card.orderBySuit = function (a, b) {
  if (a.suit < b.suit) return -1
  if (a.suit > b.suit) return 1
  if (a.rank < b.rank) return -1
  if (a.rank > b.rank) return 1
  return 0
}

// 定义用以表示一副标准扑克牌的类
function Deck () {
  var cards = this.cards = []

  Card.Suit.foreach(s => {
    Card.Rank.foreach(r => {
      cards.push(new Card(s, r))
    });
  });
}

// 洗牌的方法：重新洗牌并返回洗好的牌
Deck.prototype.shuffle = function () {
  // 遍历数组中的每个元素，随机找出牌面最小的元素，并与之（当前遍历的元素）交换
  var deck = this.cards, len = deck.length

  for (var i = len - 1; i > 0; i--) {
    // 随机类
    var r = Math.floor(Math.random() * (i + 1)), temp
    // 交换
    temp = deck[i], deck[i] = deck[r], deck[r] = temp
  }

  return this
} 

// 发牌的方法：返回牌的数组
Deck.prototype.deal = function (n) {
  if (this.cards.length < n)
    throw 'Out of cards'
  return this.cards.splice(this.cards.length - n, n)
}

// 创建一副新的扑克牌，洗牌并发牌
var deck = (new Deck()).shuffle()
var hand = deck.deal(13).sort(Card.orderBySuit)

