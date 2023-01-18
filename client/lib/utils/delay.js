import { getNode } from "../dom/getNode.js";
import { isNumber, isObject } from "./typeOf.js";

const first = getNode(".first");

const defaultOptions = {
  shouldReject: false,
  timeout: 1000,
  data: "성공",
  errorMessage: "알 수 없는 오류가 발생했습니다",
};

// 콜백의 가독성을 위해서 프라미스 사용
export const delayP = (options = {}) => {
  let config = { ...defaultOptions };

  if (isNumber(options)) {
    config.timeout = options;
  }

  // 객체 합성 mixin
  if (isObject(options)) {
    config = { ...config, ...options };
  }

  const { shouldReject, data, errorMessage, timeout } = config;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      !shouldReject ? resolve(data) : reject(errorMessage);
    }, timeout);
  });
};

// 콜백지옥을 프라미스로
// delayP()
//   .then(() => {
//     first.style.top = "-100px";
//     return delayP();
//   })
//   .then(() => {
//     first.style.transform = "rotate(360deg)";
//     return delayP();
//   })
//   .then(() => {
//     first.style.top = "0px";
//     return delayP();
//   });

// delayP({ data: "안녕" }).then((res) => {
//   console.log(res);
// });

// xhrPromise
//   .get("www.naver.com")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async await
// async : 일반 함수를 promise로 반환하는 함수로 만든다
// await : 1.promise가 반환하는 result를 가져오기
//         2. 코드 실행 흐름 제어

const delayA = async () => {
  return "완료";
};

let result = await delayA();

console.log(result);

//

const 라면끓이기 = async () => {
  try {
    await delayP(1500);
    first.style.top = "-100px";
    await delayP(1500);
    first.style.transform = "rotate(360deg)";
    await delayP(1500);
    first.style.top = "0px";

    await delayA();
    // throw new Error("계란껍질 어쩌고");
  } catch (err) {
    console.log(err);
  }
};

라면끓이기();
