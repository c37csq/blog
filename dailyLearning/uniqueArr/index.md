# 对象数组去重

```javascript
const isObject = val => typeof val === 'object' && val !== null;

function uniqeArr(newArr) {
  for (let i = 0; i < newArr.length; i++) {
    // 去掉i+1开始后续的值
    for (let j = i + 1; j < newArr.length; j++) {
      if (equals(newArr[j], newArr[i])) {
        // 去掉该值
        newArr.splice(j, 1);
        j--;
      }
    }
  }
}

// 判断数组各项是否相等
function equals(val1, val2) {
  if (isObject(val1) && isObject(val2)) {
    const keys1 = Object.keys(val1),
      keys2 = Object.keys(val2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const k of keys1) {
      if (!keys2.includes(k)) {
        return false;
      }
      if (!equals(val1[k], val2[k])) {
        return false;
      }
    }
    return true;
  } else {
    return val1 === val2;
  }
}
```