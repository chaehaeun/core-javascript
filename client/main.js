import { xhrData, insertLast, xhrPromise, haeun } from "./lib/index.js";

// xhrPromise
//   .get("https://jsonplaceholder.typicode.com/users/1")
//   .then((res) => {
//     insertLast(document.body, JSON.stringify(res));
//   })
//   .catch((err) => console.log(err));

// xhrData.get(
//   "https://jsonplaceholder.typicode.com/users/1",
//   (res) => {
//     console.log(res);
//     insertLast("body", JSON.stringify(res));
//   },
//   (err) => {
//     insertLast("body", err);
//   }
// );

// haeun.get("https://jsonplaceholder.typicode.com/users/1");
