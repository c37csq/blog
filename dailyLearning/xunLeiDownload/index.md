# 触发迅雷下载

```html
<a href="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png">下载</a>
<a data-thunder href="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png">下载</a>
```

```javascript
const links = document.querySelectorAll('a[data-thunder]');
for (const link of links) {
  const newHref = btoa(`AA${link.href}ZZ`);
  link.href = `thunder://${newHref}`;
}
```