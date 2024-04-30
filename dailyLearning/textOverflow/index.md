# 文本溢出问题

## 单行文本溢出

```css
div {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

## 多行文本溢出（不考虑兼容性）

```css
div {
    width: 200px;
    height: 150px;
    line-height: 30px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
}
```

## 多行文本溢出（考虑兼容性）

**通过浮动元素会被元素环绕这一特性巧妙的实现**

```css
* {
    margin: 0;
    padding: 0;
}

.container {
    margin: 200px auto;
    width: 300px;
    height: 100px;
    line-height: 20px;
}

.text-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.text-container::before {
    content: "";
    height: 80px;
    display: block;
}

.content {
    word-break: break-all;
    margin-top: -80px;
}

.operate {
    float: right;
}
```

```html

<div class="container">
  <div class="text-container">
    <div class="operate">...</div>
    <div class="content">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, nam
      recusandae. Obcaecati quo dolor eos cumque molestiae, iure qui,
      sapiente sunt incidunt veniam voluptatum rerum inventore eligendi
      aperiam numquam voluptate!
    </div>
  </div>
</div>
```