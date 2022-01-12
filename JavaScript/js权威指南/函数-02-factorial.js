// 计算阶乘，并将结果缓存至函数的属性中
function factorial (n) {
  // 有限的正整数
  if (isFinite(n) && n > 0 && n == Math.round(n)) {
    // 如果没有缓存结果
    if (!(n in factorial)) {
      // 计算结果并缓存之
      factorial[n] = n * factorial(n - 1)
    }
    return factorial[n]
  }
  else {
    return NaN // 如果输入有误
  }
}

factorial[1] = 1
console.log(factorial(10));