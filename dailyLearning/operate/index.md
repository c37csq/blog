# 前端风骚操作

## 左移运算迅速得到2的n次方

```javascript
console.log(1 << 2) // --> 4
console.log(1 << 3) // --> 8
console.log(1 << 4) // --> 16
```

## 快速切换0和1

```javascript
let toggle = 0;
toggle ^= 1; // toggle: 1
console.log(toggle);
toggle ^= 1; // toggle: 0
console.log(toggle);
toggle ^= 1; // toggle: 1
console.log(toggle);
```

## 快速取整

```javascript
console.log(~~3.14); // 3
console.log(3.14 >> 0) // 3
console.log(3.14 << 0) // 3
console.log(3.14 | 0) // 3
```

## 快速判断符号是否相同

```javascript
console.log((3 ^ -5) >= 0) // false，符号不同
console.log((-3 ^ -5) >= 0) // true，符号相同
console.log((3 ^ 5) >= 0) // true，符号相同
console.log((3 ^ -5) >= 0) // false，符号不同
```

## 快速判断是否是2的整数幂

```javascript
const isPowerOf2 = (n) => (n & (n - 1)) === 0;
console.log(isPowerOf2(4)) // true;
console.log(isPowerOf2(15)) // false;
console.log(isPowerOf2(16)) // true;
console.log(isPowerOf2(256)) // true;
console.log(isPowerOf2(250)) // false;
```

## 快速倒序遍历

```javascript
const arr = [];
// 倒序遍历
for (let i = arr.length - 1; i >= 0; i--) {}
```

## 快速评分组件

```javascript
const rate = (r) => '★★★★★☆☆☆☆☆'.slice(5 - r, 10 - r);

console.log(rate(0));
console.log(rate(1));
console.log(rate(2));
console.log(rate(3));
console.log(rate(4));
console.log(rate(5));
```

## 最佳异常处理

```javascript
try {
  // code
} catch (e) {
  location.href = `https://stackoverflow.com/search?q=js+${e.message}`
}
```