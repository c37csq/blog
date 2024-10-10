# 项目规范

## HTML 规范

### 注释规范

#### 遵循标准

HTML 注释规范写法应该遵循以下标准：

- 必须以 4 个有序字符开始：编码为 U+003C LESS-THAN SIGN 的小于号, 编码为 U+0021 EXCLAMATION MARK 的感叹号, 编码为 U+002D HYPHEN-MINUS 横线, 编码为 U+002D HYPHEN-MINUS 横线 ，即 “<!–”
- 在此之后是注释内容，注释的内容有以下限制：
  - 不能以单个 “>” (U+003E) 字符开始
  - 不能以由 “-“（U+002D HYPHEN-MINUS）和 ”>” (U+003E) 组合的字符开始，即 “->”
  - 不能包含两个连续的 U+002D HYPHEN-MINUS 字符，即 “–”
  - 不能以一个 U+002D HYPHEN-MINUS 字符结束，即 “-”
- 必须以 3 个有序字符结束：U+002D HYPHEN-MINUS, U+002D HYPHEN-MINUS, U+003E GREATER-THAN SIGN，即 “–>”

标准写法：

```html
<!--Comment Text-->
```

错误的写法：

```html
<!-->The Wrong Comment Text-->

<!--->The Wrong Comment Text-->

<!--The--Wrong--Comment Text-->

<!--The Wrong Comment Text--->
```

参考 [www.w3.org](https://www.w3.org/) [#Comments](https://www.w3.org/TR/2014/REC-html5-20141028/syntax.html#comments)

#### 团队约定

单行注释

> 一般用于简单的描述，如某些状态描述、属性描述等。
> 注释内容前后各一个空格字符，注释位于要注释代码的上面，单独占一行。

推荐：

```html
<!-- Comment Text -->
<div>...</div>
```

不推荐：

```xml
<div>...</div><!-- Comment Text -->

<div><!-- Comment Text -->
  ...
</div>
```

模块注释

> 一般用于描述模块的名称以及模块开始与结束的位置。
> 注释内容前后各一个空格字符，\<!-- S Comment Text --> 表示模块开始，\<!-- E Comment Text --> 表示模块结束，模块与模块之间相隔一行。

推荐：

```html
<!-- S Comment Text A -->
<div class="mod_a">...</div>
<!-- E Comment Text A -->

<!-- S Comment Text B -->
<div class="mod_b">...</div>
<!-- E Comment Text B -->
```

不推荐：

```html
<!-- S Comment Text A -->
<div class="mod_a">...</div>
<!-- E Comment Text A -->
<!-- S Comment Text B -->
<div class="mod_b">...</div>
<!-- E Comment Text B -->
```

### 文件模版

#### 标准模版

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>HTML5标准模版</title>
  </head>
  <body></body>
</html>
```

#### 约定模版

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <!-- S 元数据信息 -->
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- E 元数据信息 -->

    <title></title>

    <!-- S favicon 显示于书签栏、收藏夹和移动设备主屏幕等位置的小图标 -->
    <link rel="icon" type="image/svg+xml" href="/icon.ico" />
    <!-- S favicon -->

    <!-- S DNS预解析 -->
    <link rel="dns-prefetch" href="" />
    <!-- E DNS预解析 -->
  </head>
  <body>
    <!-- S 应用程序根节点 -->
    <div id="root"></div>
    <!-- S 应用程序根节点 -->

    <!-- S 应用程序入口文件 -->
    <script type="module" src="/src/main.tsx"></script>
    <!-- S 应用程序入口文件 -->
  </body>
</html>
```

### 语义化标签

HTML5 中新增很多语义化标签，所以优先使用语义化标签，避免一个页面都是 div 或者 span 标 签。

推荐：

```html
<section>
  <header></header>
  <main></main>
  <footer></footer>
</section>
```

不推荐

```html
<div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

## css/less 规范

### VSCode 扩展工具

下载官方扩展程序 `Stylelint` 以实时对样式文件进行校验。

为了防止 VSCode 的内置 linter 和 styelint 报告相同的错误，您可以在用户设置或工作空间设置中禁用您在项目中使用的语言的内置 linter。

```json
"css.validate": false,
"less.validate": false,
"scss.validate": false
```

**注：** 不要因为无法解决 stylelint 报错而关闭 `Stylelint` 插件或随意修改 `.stylelintrc.yaml` 配置文件

### css modules

为避免样式冲突导致页面样式表失效，推荐页面和非公共组件使用 css modules。文件命名规则为：`{filename}.module.(less|css)`，构建工具会根据样式文件的命名规则来判断是否将其指定为 css modules 而采用不同的编译方式。

由于 CSS 模块化的命名约束过于严格，导致生成的 CSS 类名可能会较为难懂，不易于阅读和理解；此时想在外部通过类名或 id 修改其原本样式变得异常困难；所以推荐为公共组件添加样式时使用全局样式。同样，为避免样式冲突，也需要对组件的类名进行约束：

1. 添加基础前缀：为了避免和 antd 的样式冲突，不要使用和 antd 相同的基础前缀
2. 添加组件前缀：以避免公共组件间或是与其他全局样式的命名冲突：`easy-btn`
3. 添加大小前缀：若组件存在几种默认尺寸，则可为组件添加大小前缀：`easy-btn-lg`
4. 添加主题前缀：若组件存在几种默认主题样式，则可为组件添加主题前缀：`easy-btn-text, easy-btn-primary`

### 选择器

- 选择器避免使用标签名

  从结构、表现、行为分离的原则来看，应该尽量避免 css 中出现 HTML 标签，并且在 css 选择器中出现标签名会存在潜在的问题。

- 合理使用直接子选择器

  直接子选择器可以提高 CSS 选择器的性能，但是有可能会使代码更加脆弱和难以维护。因此，当你的 css 代码并不具有通用性时推荐采用直接子选择器。

推荐：

```less
.header > .title {
  font-size: 2rem;
}
```

不推荐：

```less
.header .title {
  font-size: 2rem;
}
```

### 尽量使用缩写属性

推荐：

```less
.form-item {
  border-top: 0;
  font: 100%/1.6 palatino, georgia, serif;
  padding: 0 1em 2em;
}
```

不推荐：

```less
.form-item {
  border-top-style: none;
  font-family: palatino, georgia, serif;
  font-size: 100%;
  line-height: 1.6;
  padding-bottom: 2em;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0;
}
```

### 省略 0 后面的单位

推荐：

```less
.form-item {
  padding-bottom: 0;
  margin: 0;
}
```

不推荐：

```less
.form-item {
  padding-bottom: 0px;
  margin: 0em;
}
```

### 避免使用 ID 选择器及全局标签选择器防止污染全局样式

推荐：

```less
.header {
  padding-bottom: 0px;
  margin: 0em;
}
```

不推荐：

```less
#header {
  padding-bottom: 0px;
  margin: 0em;
}
```

### less 代码阻止顺序

1. @import;
2. 变量声明;
3. 样式声明;

```less
@import "mixins/size.less";

@default-text-color: #333;

.page {
  width: 960px;
  margin: 0 auto;
}
```

### less 避免嵌套层级过多

将嵌套深度限制在 3 级。对于超过 4 级的嵌套，给予重新评估。这可以避免出现过于详实的 CSS 选择器。避免大量的嵌套规则。当可读性受到影响时，将之打断。推荐避免出现多于 20 行的嵌套规则出现。

推荐：

```less
.section {
  .header {
    .title > .name {
      color: #fff;
    }
  }

  .main {
    /*  */
  }
}
```

不推荐：

```less
.section {
  .header {
    .title {
      .name {
        color: #fff;
      }
    }
  }

  .main {
    /*  */
  }
}
```

## JS/TS 规范

### 语言规范

- 模块化

  - ECMAScript：由 ECMA 国际组织发布的 JavaScript 标准规范。

  - CommonJS：服务器端模块化规范，用于 Node.js 等环境。

  - AMD：浏览器端模块化规范，所有模块都异步加载

    统一采用由 ECMA 国际组织发布的 JavaScript 标准规范中的模块化定义。若要使用异步导入，我们可以通过关键字 import() 来返回一个 Promise 对象，该对象在模块加载完毕后会被 resolve。例如：

    ```js
    // 异步导入 module 模块
    import("./module").then((module) => {
      console.log(module.sum(1, 2)); // 输出: 3
    });
    ```

  - 项目中的模块采用文件夹的组织方式，所有需要暴露的接口都放在 index 文件中，其他文件为私有文件。这意味着，我们在引用该模块时，不允许直接访问私有文件中的接口。

    ```js
    // 推荐
    import { api } from "module";

    // 不推荐
    import api from "module/api";
    ```

- 使用 `let | const` 代替 `var`

  let 和 const 是 ES6 新增的声明变量的关键字，相比于 var，它们具有更好的语义化和作用域控制。

  let 声明的变量具有块级作用域。这样可以避免变量污染全局作用域，让代码更加安全可靠。

  const 声明的变量是常量且同样具有块级作用域，不能被重新赋值，保证了数据的稳定性和不可变性。

- 字面量

  在 javascript 中推荐使用字面量创建对象

  推荐：

  ```js
  let name = "Genie";

  const obj = {};

  const print = () => {};
  ```

  不推荐：

  ```js
  let name = new String("Genie");

  const obj = new Object();

  const print = new Function();
  ```

- `null` 和 `undefined` 的判断

  推荐：

  ```js
  if (obj == null) {
  }
  ```

  不推荐：

  ```js
  if (obj === void 0 || obj === null) {
  }
  ```

  如果只是单纯的判断是否为 `undefined`:

  ```js
  if (obj === void 0) {
  }

  // 在现代浏览器中，检查一个变量是否为 undefined 通常不会产生安全隐患。这是因为现代浏览器已经标准化了 JavaScript 的行为，并确保了对关键字 undefined 的正确处理
  if (obj === undefined) {
  }

  // 非现代浏览器中
  if (typeof obj === "undefined") {
  }
  ```

- 使用 ES6+

  - 箭头函数（Arrow Functions）：以更简洁的语法定义函数。
  - 可选链操作符（Optional Chaining）：使用 `?.` 来判断对象是否存在，从而避免出现 Cannot read property 'xxx' of undefined 或 Cannot read property 'xxx' of null 的错误。
  - Nullish Coalescing（空值合并运算符）：使用 `??` 判断某个变量是否为 `null` 或 `undefined` 并设置默认值。
  - 解构赋值（Destructuring）：在一个表达式中同时解析数组或对象中的多个属性并赋值给变量。
  - 展开运算符（Spread Operator）：展开数组或对象，可以将它们合并为一个新的数组或对象。
  - 模版字符串（Template Literals）：使用反引号 \` 来创建支持换行和插值表达式的字符串。
  - Async/Await 操作符：可以让异步代码看起来像同步代码，以更清晰和直观的方式编写异步代码。
  - 对象的新功能：比如简写属性、计算属性名称等

- 函数式编程

  > 函数式编程（Functional Programming）是一种编程范式，其核心思想是将计算机程序看作是数学函数的组合，避免使用状态和可变数据，并尽可能地使用纯函数来实现。

  - 不可变性

  ```js
  const arr1 = [1, 2, 3];
  const arr2 = arr1.concat(4).map((x) => x * 2);
  console.log(arr1); // [1, 2, 3]
  console.log(arr2); // [2, 4, 6, 8]
  ```

  - 函数组合

    ```js
    function add(num1, num2) {
      return num1 + num2;
    }

    function subtract(num1, num2) {
      return num1 - num2;
    }

    function multiply(num1, num2) {
      return num1 * num2;
    }

    const result = multiply(3, subtract(8, add(1, 1)));
    console.log(result); // 12
    ```

  - 柯里化

    ```js
    const multiply = (x) => (y) => x * y;

    const double = multiply(2);
    const triple = multiply(3);

    console.log(double(5)); // 10
    console.log(triple(5)); // 15
    ```

- 避免使用 `any`

  避免在项目中直接使用 `any`, 使用 `any` 意味着自动放弃对类型的检验。在类型未确定的情况下使用 `unknown`, 或使用`泛型`对类型进行约束。

  推荐：

  ```ts
  function compute(param1: number, param2: number) {
    return param1 * param2;
  }

  interface Lengthwise {
    length: number;
  }

  function logger<T extends Lengthwise>(arg: T) {
    console.log(`Length of argument: ${arg.length}`);
  }

  logger("hello"); // 输出 "Length of argument: 5"
  logger([1, 2, 3]); // 输出 "Length of argument: 3"
  ```

  不推荐：

  ```ts
  function compute(param1: any, param2: any) {
    return param1 * param2;
  }

  function logger(arg: any) {
    console.log(`Length of argument: ${arg.length}`);
  }
  ```

### React&TSX 规范

- 使用大驼峰命名法（PascalCase）来定义组件名

  ```tsx
  const MyComponent = () => {
    // ...
  };
  ```

- 使用大括号 `{}` 来插入 JavaScript 表达式

  ```tsx
  render() {
    const name = 'Genie';
    return <div>Hello, {name}!</div>;
  }
  ```

- 将多行 TSX 代码用圆括号 `()` 包裹起来

  ```tsx
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p>This is a paragraph.</p>
      </div>
    );
  }
  ```

- 自关闭没有子元素的标签

  ```tsx
  render() {
    return (
      <div>
        <img src="logo.png" alt="Logo"/>
        <br />
        <input type="text" placeholder="Enter your name" />
      </div>
    );
  }
  ```

- 始终加上起始标签和结束标签

- 为列表项指定 key 属性

  ```tsx
  render() {
    const names = ['Alice', 'Bob', 'Charlie'];
    return (
      <ul>
        {names.map((name, index) =>
          <li key={index}>{name}</li>
        )}
      </ul>
    );
  }
  ```

- jsx/tsx 自定义组件或宿主组件上字符串属性的值使用双引号表示

### React&Immutable

> React 中的不可变性是指在 React 应用中，我们应该尽可能避免对组件的状态（state）和属性（props）进行直接修改或突变。相反，我们应该使用一些技巧来保持数据的不可变性，从而提高代码的可读性、可维护性和可预测性。

#### 为什么要使用 React 不可变性呢？

首先，React 的 Virtual DOM 机制是基于比较前后两个状态树的差异来更新 UI 的。如果我们直接修改了原始的状态对象，那么 React 就无法判断哪些地方发生了变化，也就无法正确、高效地进行页面更新。

其次，React 不可变性可以帮助我们更好地理解和调试代码。通过保持数据的不变性，我们可以避免因为意外的副作用导致的错误，并且能够清晰地描述数据的流动过程。

#### 在 React 保证数据不可变性的技巧

- 使用 Object.assign 或者扩展运算符（spread operator）创建新的对象。

  ```js
  // 错误示例：直接修改对象属性
  this.state.user.name = "Alice";

  // 正确示例：创建新的对象并赋值给State
  this.setState({
    user: {
      ...this.state.user,
      name: "Alice",
    },
  });
  ```

- 使用 slice(), concat()等方法复制数组

  ```js
  // 错误示例：直接修改原数组
  this.state.items.push("item-4");

  // 正确示例：复制原数组并添加元素
  this.setState({
    items: this.state.items.concat("item-4"),
  });
  ```

- 使用 map(), filter()等方法创建新的数组对象

  ```js
  // 错误示例：直接修改原数组
  this.state.items[index] = newItem;

  // 正确示例：通过map()创建新的数组对象
  this.setState({
    items: this.state.items.map((item, i) => {
      if (i !== index) return item;
      return newItem;
    }),
  });
  ```

- 使用第三方库 immer 来处理复杂的数据结构

  ```js
  import { useState } from "react";
  import { produce } from "immer";

  const [todo, setTodo] = useState([
    {
      title: "Learn TypeScript",
      done: true,
    },
    {
      title: "Try Immer",
      done: false,
    },
  ]);

  // 错误示例
  setTodo((todo) => {
    todo[1].done = true;
    todo.push({ title: "Tweet about it" });
    return todo;
  });

  // 正确示例
  setTodo((todo) =>
    produce(todo, (draft) => {
      draft[1].done = true;
      draft.push({ title: "Tweet about it" });
    })
  );
  ```

#### Function Component

统一使用函数式组件 + hooks 代替 ClassComponent

推荐：

```jsx
const Home = () => {
  const user = useState();
  return <div>{user?.name}</div>;
};
```

不推荐：

```jsx
class Home extends Component () => {
  const user = useState()
  return <div>{user?.name}</div>
}
```

### 注释规范

#### 遵循标准

- 优先使用 JSDoc 语法进行注释。JSDoc 的注释能够提供更详细的信息，例如参数、返回值、异常等情况。同时这种注释也是文档生成工具的基础。

- 在注释前面添加特定的标记，如 TODO、FIXME 或 BUG，以便于开发者查找和跟踪问题。

- 在注释中使用正确的标点符号和语法。注释同样需要有良好的可读性和易懂性。

- 不要过度注释，避免出现重复、冗余或不必要的注释。注释应该起到辅助理解的作用，而不是分散注意力和增加阅读负担。

- 定期检查注释，并删除无用或错误的注释。不正确的注释同样会对团队造成困扰，甚至引导错误的实现。

- 遵循项目中已有的注释规范和风格，保持一致性和可维护性。

### 单行注释

在代码中，使用双斜杠 `//` 进行单行注释，用于解释代码中某个行或某一片段的作用。单行注释应在要注释的代码行上方写入以一道空格隔开，不要写在代码行末尾。

推荐

```ts
// This is a single-line comment
let name: string = "John";
```

不推荐

```ts
let name: string = "John"; // This is a single-line comment

//This is a single-line comment
let age: number = 10;
```

### 多行注释

多行注释使用 `/* ... */` 符号，用于注释一段代码或多行代码。每行注释都应该以一个星号 `*` 开头，并且与前面的内容保持一个空格的缩进。

推荐

```ts
/*
 * This function accepts a number and returns its square
 */
function square(n: number): number {
  return n * n;
}
```

不推荐

```ts
/*
 This function accepts a number and returns its square
 */
function square(n: number): number {
  return n * n;
}
```

#### [JSDoc 注释](https://www.jsdoc.com.cn/)

JSDoc 是用于 TypeScript 的文档生成工具。这种注释方式使用 `/** ... */` 符号。JSDoc 注释对函数、接口、类和命名空间进行说明，提供关于方法、参数、返回值类型和类成员等方面的详细信息。JSDoc 注释应该放在要注释的代码上方，并与代码对齐。

在 JSDoc 中，我们可以使用以下标记来描述参数、返回值、异常、类、函数等。

- @param：描述函数或方法的参数
- @returns：描述函数或方法返回值
- @throws / @exception：描述可能引发的异常情况
- @class：描述类
- @constructor：描述类的构造函数
- @property：描述类的属性
- @method：描述类的方法
- @description：描述信息
- @author: 描述作者
- @since: 表示开始生效的版本号
- @deprecated: 指明一个标识在代码中已经被弃用
- @example: 提供如何使用文档化项的示例
- @see: 表示可以参考另一个标识符的说明文档，或者一个外部资源

**注：查看全部 tag 请查看此链接 [@use JSDoc](https://www.jsdoc.com.cn/)**

```ts
/**
 * This function adds two numbers and returns the result
 *
 * @param x The first number to add
 * @param y The second number to add
 * @returns The sum of x and y
 * @throws An error if the arguments are not numbers
 */
function add(x: number, y: number): number {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new Error("Both arguments must be numbers");
  }

  return x + y;
}
```

#### 其他注释

在 js/ts 中还有一些特殊的注释标记（如 TODO:, FIXME: 等）。这些注释标记用于在代码中标记有待完成的任务，需要修复的 bug 等。

- TODO: 标记需要完成但尚未完成的任务
- FIXME: 标记需要修复或更正的代码
- HACK: 标记临时解决方案或者不够优雅的代码
- OPTIMIZE: 提示代码的性能可以进一步优化
- REASON: 解释接下来的方案为何不能被使用
- INFO: 解释这段代码的用途或功能

这些特殊注释应该放在要注释的代码上面，并在前面加上特定的注释标记（如 TODO:, FIXME:） 等。

```ts
// TODO: add error handling
function processUser(user: User): void {
  // ...
}

// FIXME: use a typed array instead of any[]
let numbers: any[] = [1, 2, 3];
```

## VSCode 插件

以下 VSCode 插件要求在项目开发中必须安装，以保证代码的合规：

1. Stylelint: Official Stylelint extension for Visual Studio Code.
2. ESlint: Integrates ESLint JavaScript into VS Code.
3. Prettier - Code formatter: Code formatter using prettier.

<!-- ## 兼容测试 -->
