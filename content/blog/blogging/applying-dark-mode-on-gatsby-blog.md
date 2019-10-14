---
title: Gatsby 블로그에 Dark mode 넣기
date: 2019-10-14T11:40:40.367Z
description: css class를 switch로 활용하여 css variable에 따라 값을 바꿔주는 방법으로 dark mode 구현하기
category: blogging
---

## Dark mode

최근 윈도우나 맥OS, 심지어 내가 사용하는 아이폰의 IOS까지 Dark mode이 도입됐다. Dark mode는 말 그대로 전반적인 인터페이스의 색상이 어둡다. 그래서 어두운 환경에서 눈의 피로를 감소시켜준다.

## dark mode in CSS

CSS에도 dark mode에 대응하기 위한 기능이 추가되었는데, `prefers-color-scheme`이라는 media query이다.

```css
@media (prefers-color-scheme: dark) {

}
```

이 쿼리를 사용하면 dark 모드가 설정된 os와 아닌 os에서의 css 결과가 달라질 것이다.

아래와 같은 경우 dark모드인 경우 배경과 글의 색이 역전된다.

```css
body {
  background: white;
  color: black;
}

@media (prefers-color-scheme: dark) {
  body {
    background: black;
    color: white;
  }
}
```

여기에 javascript를 사용해서 query를 실시간으로 확인하여 특정 동작을 할 수도 있다.

```javascript
var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkQuery.addListener(function(e) {
  alert(e.matches ? 'dark mode' : 'light mode');
});
```

그러나 이 방법으로만 구현하게 되면 light 모드를 사용하는 사용자는 dark mode를 사용할 수 없다. 그러므로 switch를 두고 toggle을 하여 mode를 바꾸는 방법을 사용하였다.

## CSS Variables

CSS 변수는 다음과 같이 사용할 수 있다.

```css
// 변수의 선언
element {
  --main-bg-color: brown;
}

// 변수의 사용
element {
  background-color: var(--main-bg-color);
}
```

그리고 switch는 css class의 변경을 활용하여 다음과 같이 적용할 수 있다.

```css
body.light {
  --main-bg-color: white;
}

body.dark {
  --main-bg-color: black;
}

body {
  background: var(--main-bg-color);
}
```

이런 접근법으로 switch를 만들고 body의 class를 변경해주면 색상이 변경된다.

## 추가적인 고려 사항

단순히 색상만 바꾸는 것으로는 다크 모드를 이쁘게 구현했다고 볼 수 없다.

[Andy Clarke의 글](https://stuffandnonsense.co.uk/blog/redesigning-your-product-and-website-for-dark-mode)을 참고하면, 색상을 선택하는 것부터, 타이포그래피, 이미지에 필터를 적용하는 것 등 다양한 것들을 고려하여 구현할 수 있음을 알 수 있다.

## 참고

- [Create A Dark/Light Mode Switch with CSS Variables, Ananya Neogi, 2019.4.10](https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8)

- [Dark Mode in CSS](https://css-tricks.com/dark-modes-with-css/)

- [Redesigning your product and website for dark mode](https://stuffandnonsense.co.uk/blog/redesigning-your-product-and-website-for-dark-mode)