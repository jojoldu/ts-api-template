# API Controller

 
1. tsoa - https://github.com/lukeautry/tsoa

2. Trafficlight - https://github.com/swimlane/trafficlight

3. routing-controllers - https://github.com/typestack/routing-controllers

> next.js는 제외

하지만 난 typeorm과 type-graphql를 쓰고 있어서 세가지 라이브러리들이 공통적으로 지원하는 typedi를 사용하려면 routing-controllers밖에 없었다 

## 설치

```bash
npm install routing-controllers express body-parser multer
```

```bash
npm install -D @types/express @types/body-parser @types/multer
```


### 패키지 오류시


```bash
Cannot find module 'class-validator' from 'node_modules/routing-controllers/cjs/~~
```

```bash
npm i class-transformer@0.3.1 class-validator@0.12.2  --save
```


## supertest

서버를 실행하는 파일(app.js)에서 createServer() 메소드로 서버를 만들고 메소드 체이닝을 통해 listen() 메소드로 바로 서버를 실행하도록 코딩하는 것이 일반적입니다. 하지만 테스트를 위해서 서버를 만드는 부분과 실행하는 부분을 두 파일로 나눠 작성합니다.



```bash
npm i -D supertest
```

