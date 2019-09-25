---
title: 쇠막대기
date: "2019-09-05T01:15:00.000Z"
description: 프로그래머스 코딩테스트 연습 > 스택/큐
category: algorithm/programmers
---

## 문제 설명

여러 개의 쇠막대기를 레이저로 절단하려고 합니다. 효율적인 작업을 위해서 쇠막대기를 아래에서 위로 겹쳐 놓고, 레이저를 위에서 수직으로 발사하여 쇠막대기들을 자릅니다. 쇠막대기와 레이저의 배치는 다음 조건을 만족합니다.

- 쇠막대기는 자신보다 긴 쇠막대기 위에만 놓일 수 있습니다.
- 쇠막대기를 다른 쇠막대기 위에 놓는 경우 완전히 포함되도록 놓되, 끝점은 겹치지 않도록 놓습니다.
- 각 쇠막대기를 자르는 레이저는 적어도 하나 존재합니다.
- 레이저는 어떤 쇠막대기의 양 끝점과도 겹치지 않습니다.
아래 그림은 위 조건을 만족하는 예를 보여줍니다. 수평으로 그려진 굵은 실선은 쇠막대기이고, 점은 레이저의 위치, 수직으로 그려진 점선 화살표는 레이저의 발사 방향입니다.

![satisfied cut example](./example.png)

이러한 레이저와 쇠막대기의 배치는 다음과 같이 괄호를 이용하여 왼쪽부터 순서대로 표현할 수 있습니다.

- (a) 레이저는 여는 괄호와 닫는 괄호의 인접한 쌍 '()'으로 표현합니다. 또한 모든 '()'는 반드시 레이저를 표현합니다.
- (b) 쇠막대기의 왼쪽 끝은 여는 괄호 '('로, 오른쪽 끝은 닫힌 괄호 ')'로 표현됩니다.

위 예의 괄호 표현은 그림 위에 주어져 있습니다.

쇠막대기는 레이저에 의해 몇 개의 조각으로 잘리는데, 위 예에서 가장 위에 있는 두 개의 쇠막대기는 각각 3개와 2개의 조각으로 잘리고, 이와 같은 방식으로 주어진 쇠막대기들은 총 17개의 조각으로 잘립니다.

쇠막대기와 레이저의 배치를 표현한 문자열 arrangement가 매개변수로 주어질 때, 잘린 쇠막대기 조각의 총 개수를 return 하도록 solution 함수를 작성해주세요.

제한사항
arrangement의 길이는 최대 100,000입니다.
arrangement의 여는 괄호와 닫는 괄호는 항상 쌍을 이룹니다.
입출력 예

|arrangement|return|
|-|-|
|()(((()())(())()))(())|17|

입출력 예 설명
문제에 나온 예와 같습니다.

[출처](https://www.digitalculture.or.kr/koi/selectOlymPiadDissentList.do)

## 풀이

arrangement를 첫 번째부터 마지막까지 순회하면서 레이저와 막대기를 구분한다.

가져야 할 변수는

- 현재 막대기 수
- 잘려나온 막대기 수

로직은

레이저가 나올 경우 현재 막대기 수만큼 잘려나온 막대기 수를 더한다.
그리고 막대기 수가 줄어들면 그 수만큼 잘려나온 막대기 수에 더한다.

```javascript
  function solution(arrangement) {
      let cutStick = 0,
        stick = 0,
        lastA,
        a;

      for (let i = 0; i < arrangement.length ; i++) {
          if (arrangement[i - 1]) {
              lastA = arrangement[i - 1];
              a = arrangement[i];

              if (lastA === '(' && a === '(') {
                  // 스틱 하나 추가
                  stick++;
              } else if (lastA === '(' && a === ')') {
                  // 레이저, 잘린 스틱 stick 만큼 추가
                  cutStick += stick;
              } else if (lastA === ')' && a === ')') {
                  // 잘린 스틱 하나 추가
                  stick--;
                  cutStick++;
              }
          }
      };
      
      return cutStick;
  }
```

if 문을 중첩하면 코드 수를 줄일 수 있지만, 가독성이 안 좋을 것 같다


## 다른 사람 풀이

```javascript
function solution(arrangement) {
    var answer = 0;
    var aTemp = arrangement.split("()").join("+");
    var nTemp = 0;
    for(var i = 0; i < aTemp.length; i++){

        switch(aTemp[i]){
            case '(' :
                nTemp++;
                answer++;
                break;
            case ')' :
                nTemp--;
                break;
            case '+' :
                answer += nTemp;
                break;
        }
    }
    return answer;
}
```

1. 레이저를 걸러내고
2. 남은 막대만 가지고 경우마다 계산한다.