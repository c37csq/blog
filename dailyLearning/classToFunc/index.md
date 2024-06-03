# 类转函数

```javascript
// 将下面代码转化为普通构造函数的写法
class Example {
  constructor(name) {
    this.name = name;
  }
  func() {
    console.log(this.name);
  }
}

let e = new Example('c37');
new e.func('c37')
```

```javascript
"use strict";

function Example(name) {
  // 验证this指向
  if (!this instanceof Example) {
    throw new TypeError(
      "Class constructor Example cannot be invoked without new"
    );
  }
  this.name = name;
}

// 原型上不可枚举
Object.defineProperty(Example.prototype, "func", {
  value: function () {
    // 不可通过new调用
    // 验证this指向
    if (!this instanceof Example) {
      throw new TypeError(
        "func is not a constructor"
      );
    }
    console.log(this.name);
  },
  enumerable: false,
});

Example("c37");
```