/* readyState
import { xhrData } from './xhr';
  0 : uninitalized // 초기화
  1 : loading // 로딩
  2 : loaded // 로딩완료
  3 : interactive // 작동 중인 단계
  4 : complete // 완료된 단계
*/

import { typeError } from "../error/typeError.js";

// 객체 구조 분해 할당
export const xhrData = ({
  url = "",
  method = "GET",
  body = null,
  onSuccess = null,
  onFail = null,
  headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
} = {}) => {
  const xhr = new XMLHttpRequest();

  // 비동기 통신 오픈
  xhr.open(method, url);

  // Object.entries(headers).forEach(([key, value]) => {
  //   xhr.setRequestHeader(key, value);
  // });

  xhr.addEventListener("readystatechange", () => {
    const { status, readyState, response } = xhr;

    if (status >= 200 && status < 400) {
      if (readyState === 4) {
        console.log("통신 성공!");
        onSuccess(JSON.parse(response));
      }
    } else {
      onFail("통신 실패ㅠㅠ");
    }
  });

  // 서버에 요청을 보내는 것
  xhr.send(JSON.stringify(body));
};

// xhrData({
//   url: "https://jsonplaceholder.typicode.com/users",
//   onSuccess: (response) => {
//     console.log(response);
//   },
//   onFail: (err) => {
//     console.log(err);
//   },
// });

//

// xhrData 라는 객체에 get이라는 함수를 저장하고
// 그 함수는 이제 xhrData라는 함수를 실행 시킨 것
xhrData.get = (url, onSuccess, onFail) => {
  xhrData({
    url,
    onSuccess,
    onFail,
  });
};

xhrData.post = (url, body, onSuccess, onFail) => {
  xhrData({
    method: "POST",
    body,
    onSuccess,
    onFail,
  });
};

xhrData.delete = (url, onSuccess, onFail) => {
  xhrData({
    method: "DELETE",
    url,
    onSuccess,
    onFail,
  });
};

xhrData.put = (url, onSuccess, onFail) => {
  xhrData({
    method: "PUT",
    url,
    onSuccess,
    onFail,
  });
};

// xhrData.get(
//   // 진짜 어질어질하다
//   "https://jsonplaceholder.typicode.com/users",
//   (response) => {
//     console.log(response);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

// xhrData.delete(
//   "https://jsonplaceholder.typicode.com/users/1",
//   (response) => {
//     console.log(response);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

// promise API
const defaultOptions = {
  url: "",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: null,
};

export const xhrPromise = (options = {}) => {
  const xhr = new XMLHttpRequest();

  const { method, url, body, headers } = Object.assign(
    {},
    defaultOptions,
    options
  );

  if (!url) typeError("서버와 통신할 url 인자는 반드시 필요합니다.");

  xhr.open(method, url);

  xhr.send(body ? JSON.stringify(body) : null);

  return new Promise((resolve, reject) => {
    xhr.addEventListener("readystatechange", () => {
      const { status, readyState, response } = xhr;

      if (status >= 200 && status < 400) {
        if (readyState === 4) {
          resolve(JSON.parse(response));
        }
      } else {
        reject("에러입니다");
      }
    });
  });
};

// xhrPromise({ url: "https://jsonplaceholder.typicode.com/users" })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

xhrPromise.get = (url) => {
  return xhrPromise({
    url,
  });
}; // promise 객체를 반환해야 되기 때문에 내부에 다시 xhrPromise 호출

xhrPromise.post = (url, body) => {
  return xhrPromise({
    url,
    body,
    method: "POST",
  });
};
