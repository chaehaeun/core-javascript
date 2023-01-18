const defaultOptions = {
  method: "GET",
  mode: "cors",
  body: null,
  cache: "no-cache",
  credential: "same-origin",
  redirect: "follow",
  referrerPolicy: "no-referrer",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

export const haeun = async (options = {}) => {
  const { url, ...restOptions } = {
    ...defaultOptions,
    ...options,
    headers: { ...(defaultOptions.headers ?? {}), ...(options.headers ?? {}) }, // 깊은 복사
  };

  let response = await fetch(url, restOptions);

  if (response.ok) {
    response.data = await response.json();
  }

  return response;
};

haeun.get = (url, options) => {
  haeun({
    url,
    ...options,
  });
};

haeun.put = (url, body, options) => {
  haeun({
    method: "PUT",
    url,
    body: JSON.stringify(body),
    ...options,
  });
};

haeun.delete = (url, options) => {
  haeun({
    method: "DELETE",
    url,
    ...options,
  });
};

haeun.post = (url, body, options) => {
  haeun({
    method: "POST",
    url,
    body: JSON.stringify(body),
    ...options,
  });
};

haeun.post(
  "https://jsonplaceholder.typicode.com/users/1",
  { name: "tiger" },
  { mode: "cors", headers: {} }
);
