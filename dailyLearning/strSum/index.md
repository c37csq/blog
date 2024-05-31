# 统计字符串出现的个数

```javascript
let str = 'fgasdfadfdasd';

let result = str.split('').reduce((a, b) => (a[b]++ || (a[b] = 1), a), {});

console.log(result); // { f: 3, g: 1, a: 3, s: 2, d: 4 }
```