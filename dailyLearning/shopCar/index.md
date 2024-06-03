# 购物车效果

```html
<div class="car">购物车</div>
<button class="btn">Click Me!</button>
```

```css
.plus {
    position: absolute;
    top: var(--top);
    left: var(--left);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
}

.plus span {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    background-color: #000;
}

.btn {
    position: absolute;
    top: 150px;
    right: 20px;
}

.car {
    position: absolute;
    bottom: 50px;
    left: 40px;
    width: 50px;
    height: 50px;
    background-color: #000;
    color: #fff;
    line-height: 50px;
    padding: 8px;
}

@keyframes moveY {
    to {
        transform: translateY(var(--y));
    }
}

@keyframes moveX {
    to {
        transform: translateX(var(--x));
    }
}

.plus {
    animation: moveY .8s cubic-bezier(0.5, -0.36, 0.81, 0.39);
}

.plus span {
    animation: moveX .8s linear;
}
```

```javascript
const car = document.querySelector('.car');
const btn = document.querySelector('.btn');
const PLUS_SIZE = 30;
btn.onclick = function () {
  const div = document.createElement('div');
  div.className = 'plus';
  div.innerHTML = `<span>+</span>`;

  const btnRect = btn.getBoundingClientRect();
  const carRect = car.getBoundingClientRect();
  const left = btnRect.left + btnRect.width / 2 - PLUS_SIZE / 2;
  const top = btnRect.top - PLUS_SIZE;
  const x = carRect.left + carRect.width / 2 - PLUS_SIZE / 2 - left;
  const y = carRect.top - PLUS_SIZE - top;

  div.style.setProperty('--left', left + 'px');
  div.style.setProperty('--top', top + 'px');
  div.style.setProperty('--x', x + 'px');
  div.style.setProperty('--y', y + 'px');

  div.addEventListener('animationend', () => {
    div.remove();
  });

  document.body.appendChild(div);
}
```