# 为什么不让使用undefined？

## undefined是window的一个属性。

```javascript
console.log(window.undefined); // undefined
```

**但是给window.undefined赋值无效。**

```javascript
window.undefined = 1;
console.log(window.undefined); // undefined
```

## undefined不是关键字，在函数中使用时会出问题。

```javascript
function m() {
  var undefined = 1;
  var a = undefined;
  console.log(a);
}
m(); // 1
```