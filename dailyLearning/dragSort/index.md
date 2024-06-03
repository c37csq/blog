# 拖拽排序

```html

<div class="list">
  <div draggable="true" class="list-item">1</div>
  <div draggable="true" class="list-item">2</div>
  <div draggable="true" class="list-item">3</div>
  <div draggable="true" class="list-item">4</div>
  <div draggable="true" class="list-item">5</div>
</div>
```

```javascript
const list = document.querySelector('.list');

let sourceNode; // 当前正在拖动的是哪个元素
list.ondragstart = e => {
  setTimeout(() => {
    e.target.classList.add('moving');
  }, 0);
  sourceNode = e.target;
  e.dataTransfer.effectAllowed = 'move';
}

list.ondragover = e => {
  e.preventDefault();
}

list.ondragenter = e => {
  e.preventDefault();
  if (e.target === list || e.target === sourceNode) {
    return;
  }
  const children = Array.from(list.children);
  const sourceIndex = children.indexOf(sourceNode);
  const targetIndex = children.indexOf(e.target);
  // 往下拖
  if (sourceIndex < targetIndex) {
    list.insertBefore(sourceNode, e.target.nextElementSibling);
  } else {
    // 向上拖
    list.insertBefore(sourceNode, e.target);
  }
}

list.ondragend = e => {
  e.target.classList.remove('moving');
}
```