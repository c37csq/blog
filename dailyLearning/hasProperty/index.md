# 判断对象中是否存在某个属性

## 错误写法一

```javascript
function hasProperty(obj, key) {
  return obj[key] !== undefined;
}

var obj = { a: undefined };
console.log(hasProperty(obj)); // false
```

## 错误写法二

```javascript
function hasProperty(obj, key) {
  return Object.keys(obj).includes(key);
}

var obj = { a: undefined, b: 1 };
Object.defineProperty(obj, 'c', {
  enumerable: false,
  value: 1
});
console.log(hasProperty(obj, 'c')); // false
```

## 错误写法三

```javascript
function hasProperty(obj, key) {
  return obj.hasOwnProperty(key);
}

var obj = { a: undefined, b: 1 };
Object.defineProperty(obj, 'c', {
  enumerable: false,
  value: 1
});

// 原型上的属性判断不出来
console.log(hasProperty(obj, 'toString')); // false
```

## 正确写法 

```javascript
function hasProperty(obj, key) {
  return key in obj;
}
```
