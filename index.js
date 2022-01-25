document.addEventListener("DOMContentLoaded", () => {
  function synchronousSleep(ms) {
    const start = new Date();
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
    synchronousSleep(5000);
    console.log("同期処理完了");
  });

  document
    .querySelector(".js-async-button")
    .addEventListener("click", async () => {
      console.log("非同期処理開始");
      await sleep(5000);
      console.log("非同期処理終了");
    });

  document
    .querySelector(".js-clickable-button")
    .addEventListener("click", () => {
      console.log("clickできたね!");
    });
});
