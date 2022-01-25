## Promise とは

### まずは「非同期処理」とは何かを知る

普通、プログラムはコードが書かれた順番に上から実行されます。前の行の処理が完了してはじめて次の行の処理が実行されるわけです。

このような、書かれた順番通りにプログラムが実行されていく仕組みを「同期処理」と言います。

JavaScript もこの仕組みで動いています。

非同期処理とは、あるタスクを実行をしている際に、他のタスクが別の処理を実行できる方式をいいます。
実際に同期処理と非同期処理の挙動の違いがわかるサンプルを用意しました。

ブラウザで`index.html`を開きましょう。このとき`command`+`option`+`i`キーを押して、検証ツールを開くのも忘れないでください。
同期処理、非同期処理が行われるとき、どうなるかを検証するために、`click me!`というボタンを用意しました。

これは単に`clickできたね!`と、console に出力するだけのボタンです。

試しにこのボタンを押してみましょう。

console に`clickできたね!`と出力されるのが確認できたかと思います。

`clickしたら画面が固まってしまいます。`ボタンを click してみましょう。
このとき`clickできたね!`ボタンを押してみてください。

押せますか??
画面が固まって押しても console には`clickできたね!`と出力されません。

一方で、`clickしても画面が固まりません。`を押してみてください。
その後に`clickできたね!`ボタンを押してみましょう。

押せますか??押せますね??

console に`clickできたね!`が出力されるのが確認できるかと思います。

`clickしたら画面が固まってしまいます。`ボタンを click したときに実行される関数は以下のようになっています。

click 時まずはじめに`同期処理開始`と console に出力します。

その後、`synchronousSleep`という関数を実行し、最後に`同期処理完了`と console に出力しています。

```js
document.querySelector(".js-sync-button").addEventListener("click", () => {
  console.log("同期処理開始");
  synchronousSleep(5000);
  console.log("同期処理完了");
});
```

この`synchronousSleep`という関数が実行されている間、画面が固まる（他にどんな処理も受け付けなくなる）わけです。
指定のミリ秒間`while`でループ処理を行うことで、UI スレッドを独占してしまう関数です。

```js
function synchronousSleep(ms) {
  const start = new Date();
  // 引数ミリ秒間ループ処理を行う
  while (new Date() - start < ms);
}
```

一方で、`clickしても画面が固まりません。`ボタンを押したときの処理の中身を見てみましょう。
`async / await`という何やら見慣れない単語が出てきましたね。これについては後ほど説明します。
`sleep`関数以外は先程とほぼ同じです。

```js
document
  .querySelector(".js-async-button")
  .addEventListener("click", async () => {
    console.log("非同期処理開始");
    await sleep(5000);
    console.log("非同期処理終了");
  });
```

```js
async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
```

### 非同期処理の記述の歴史

JavaScript では、コールバック関数を使うことで、関数の引数に関数を渡し、実行のタイミングをハンドリングすることができます。
例えば、夕食を食べた後に風呂に入る処理を考えてみましょう。

```js
function eatDinner(callback) {
  console.log("夕食を食べる");
  callback();
}

function takeABath() {
  console.log("風呂に入る");
}

eatDinner(takeABath);
```

これをブラウザの console に貼り付けると、

`夕食を食べる`
`風呂に入る`
の順で出力されることがわかると思います。
先程チラっとでた`Promise`がなかった頃、このコールバック関数を用いることで、非同期処理を実現しようとしていました。
こんな具合です。

```js
function wait(ms, callback) {
  setTimeout(() => {
    callback();
  }, ms);
}

console.log("start");
wait(1000, () => {
  console.log("1");
  wait(2000, () => {
    console.log("2");
    wait(3000, () => {
      console.log("3");
    });
  });
});
```
