# CSS scroll snap处理滚动区块

```html

<div class="container">
  <div class="item" style="background-color: green">1</div>
  <div class="item" style="background-color: orange">2</div>
  <div class="item" style="background-color: yellow">3</div>
</div>
```

```css
* {
    padding: 0;
    margin: 0;
}

.container {
    width: 100%;
    height: 300px;
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
}

.container::-webkit-scrollbar {
    width: 0;
}

.item {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    scroll-snap-align: start;
    scroll-snap-stop: always;
}
```