# Block Rotation 
블록의 회전은 각 도형에 따라 상대저 좌표값으 변경시킴으로써 작동합니다.<br>
아래의 레퍼런스 이미지에서 노랑색 블럭은 해당 도형의 중심을 나타냅니다.<br>
노랑색 중심 블럭을 기준으로 도형이 회전함에 따라 다른 블럭들의 상대 좌표값 차이를 정리한것입니다.<br>
소스코드에서는 아래와 같은 형식으로 각 도형별로 변경되어야하는 값들을 정의해두었습니다.<br>
```
const operands = {
        1:[ [ [2,2],[-2,2],[-2,-2],[+2,-2] ], [ [1,1],[-1,1],[-1,-1],[1,-1] ], [ [-1,1],[-1,-1],[1,-1],[1,1] ] ] , // L
        2:[ [ [2,0],[0,2],[-2,0],[0,-2] ], [ [1,1],[-1,1],[-1,-1],[1,-1] ] , [ [-1,1],[-1,-1],[1,-1],[1,1] ]  ] , // Z
        3:[[-1,-1],[-2,-2],[-3,-3]] , // ㅣ
        4:[[1,-1],[1,1],[-1,1],[-1,-1]], // ㅗ
        5:[ [ [2,0],[0,2],[-2,0],[0,-2] ], [ [1,1],[-1,1],[-1,-1],[1,-1] ] , [ [-1,1],[-1,-1],[1,-1],[1,1] ]  ]  // S
}
```
단, 여기서 case0의 'ㅁ'도형으 경우엔 회전함에 아무런 변화가 없음으로 제외합니다.<br>



## Reference
![case0](https://github.com/93jpark/vanilla_tetris/blob/master/src/readme/cae0.png)

![case1](https://github.com/93jpark/vanilla_tetris/blob/master/src/readme/case1.png)

![case2](https://github.com/93jpark/vanilla_tetris/blob/master/src/readme/case2.png)

![case3](https://github.com/93jpark/vanilla_tetris/blob/master/src/readme/case3.png)

![case4](https://github.com/93jpark/vanilla_tetris/blob/master/src/readme/case4.png)



