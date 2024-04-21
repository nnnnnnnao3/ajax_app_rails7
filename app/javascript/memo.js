const buildHTML = (XHR) => {

const item = XHR.response.post; //レスポンスの中から投稿されたメモの情報(post)を抽出し、変数itemに格納
const html = `
  <div class="post">
    <div class="post-date">
      投稿日時：${item.created_at}
    </div>
    <div class="post-content">
      ${item.content}
    </div>
  </div>`;
  return html;
};


function post (){  //ページが読み込まれたときイベント発火
  const form = document.getElementById("form"); //id:formのHTML要素を変数formに格納
  form.addEventListener("submit", (e) => {
    e.preventDefault();//「投稿ボタンをクリックした」という動作を無効化
    const formData = new FormData(form); //FormDataオブジェクトを使って取得したフォームの値を変数formDataに格納
    const XHR = new XMLHttpRequest(); //新しくオブジェクトを生成
    XHR.open("POST", "/posts", true); //リクエストの内容を指定
    XHR.responseType = "json"; //データフォーマットを指定し"JSON"に設定
    XHR.send(formData); //フォームに入力された内容をサーバー側に送信
    XHR.onload = () => {//リクエストの送信が成功したら呼び出す
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");//id:listのHTML要素を取得
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));  //htmlに格納したHTML要素をlistのHTML要素の直後に入れる
         formText.value = ""; //フォームの中身をリセット
      };
  });
};

window.addEventListener('turbo:load', post);
