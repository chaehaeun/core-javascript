const xhrData = ({
  url = "",
  method = "GET",
  body = null,
  onSuccess = null,
  headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
}) => {
  const xhr = new XMLHttpRequest();

  // 비동기 통신 오픈
  xhr.open(method, url);

  // headers의 key와 value를 배열로 반환해서 헤더요청함
  // Object.entries(headers).forEach(([key, value]) => {
  //   xhr.setRequestHeader(key, value);
  // });
  // readyState의 값이 바뀔때마다 일어나는 이벤트
  xhr.addEventListener("readystatechange", () => {
    const { status, readyState, response } = xhr;
    if (status >= 200 && status < 400) {
      if (readyState === 4) {
        console.log("통신 성공");
        onSuccess(JSON.parse(response));
        console.log();
      }
    } else {
      if (readyState === 4) {
        console.log("통신 실패");
      }
    }
  });

  // 서버에 요청 보내기
  xhr.send(JSON.stringify(body));
};

xhrData({
  url: "https://jsonplaceholder.typicode.com/users",
  onSuccess: (result) => {
    console.log(result);
  },
});
