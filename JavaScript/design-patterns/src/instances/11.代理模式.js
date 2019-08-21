class ReadImg {
  constructor(filename) {
    this.filename = filename
    this.loadFromDisk() // 初始化即从硬盘中加载，模拟
  }
  display() {
    console.log('display... ' + this.filename);
  }
  loadFromDisk() {
    console.log('loading... ' + this.filename);
  }
}

class ProxyImg {
  constructor(filename) {
    this.readImg = new ReadImg(filename)
  }
  display() {
    this.readImg.display()
  }
}

// test
let proxyImg = new ProxyImg('1.jpg')
proxyImg.display()