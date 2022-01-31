function synchronousSleep(ms) {
  const start = new Date();
  // 引数ミリ秒間ループ処理を行う
  while (new Date() - start < ms);
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

document.querySelector(".js-sync-button").addEventListener("click", () => {
  console.log("同期処理開始");
  synchronousSleep(10000);
  console.log("同期処理完了");
});

document
  .querySelector(".js-async-button")
  .addEventListener("click", async () => {
    console.log("非同期処理開始");
    await sleep(5000);
    console.log("非同期処理終了");
  });

const API_URL = "https://jsonplaceholder.typicode.com/users";
const button = document.querySelector(".js-fetch-button");
button.addEventListener("click", async () => {
  const res = await fetch(API_URL);
  const users = await res.json();

  users.forEach((user) => {
    const userListElm = document.querySelector(".js-list");
    const listElm = document.createElement("li");
    listElm.innerText = user.name;
    userListElm.appendChild(listElm);
  });
});

// Promise
const promise = new Promise((resolve) => {
  resolve();
}).then(() => {
  console.log("resolve done!");
});

console.log(promise);
