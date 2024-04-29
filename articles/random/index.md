# 随机颜色函数的实现

**方案一**

```javascript
function randomColor() {
  var r = Math.floor(Math.random() * 256),
  g = Math.floor(Math.random() * 256),
  b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
```

**方案二**

```javascript
function randomColor() {
  return '#' + Math.random().toString(16).substring(2, 8);
}
```