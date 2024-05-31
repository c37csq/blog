# 弹性盒分布布局

```html

<div class="container">
  <div class="part" style="background: red;">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio consequatur omnis labore vero at esse eveniet natus
    est. Odit corrupti cum libero reprehenderit quo quidem placeat autem repudiandae, magnam quia.
  </div>
  <div class="part" style="background: #f3be50;"></div>
  <div class="part" style="background: #61c354;"></div>
</div>
```

```css
.container {
    width: 100%;
    height: 100vh;
    display: flex;
}

.part {
    /* 表示在当前内容的宽度下吃掉剩余空间 */
    /* flex-grow: 1; */
    /*  默认值auto */
    /* flex-basis: 0; */
    flex: 1 0 0;
}
```