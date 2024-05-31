# 拼音输入法导致的高频事件问题

```html
<input type="text">
```

```javascript
let input = document.querySelector('input');
let isComposite = false;

function search() {
  console.log('搜索:' + input.value);
}

input.addEventListener('input', function () {
  if (!isComposite) {
    search();
  }
});

input.addEventListener('compositionstart', function () {
  isComposite = true;
});

input.addEventListener('compositionend', function () {
  isComposite = false;
  search();
});
```