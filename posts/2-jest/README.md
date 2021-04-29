# 2. 혼자서 Typescript로 HTTP API 만들기 - jest

jest, jest에서 typescript를 실행하기 위한 ts-jest와 jest의 type 모듈을 설치한다.

```bash
npm install --save-dev jest ts-jest @types/jest
```

설정
테스트할 파일이름을 {파일이름}.test.js 로 짓는다.

package.json 에서 실행할 script에 jest로 실행하도록 한다.

```js
{
    ...
    "scripts": {
        "test": "jest"
    },
}
```

테스트 환경을 잘 지원하는 [testcontainers-node](https://github.com/testcontainers/testcontainers-node)를 사용하겠습니다. 

https://github.com/Yengas/nodejs-postgresql-testcontainers

https://medium.com/trendyol-tech/how-to-test-database-queries-and-more-with-node-js-2f02b08707a7