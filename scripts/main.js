// 🎵 BGMの再生・停止機能（デバッグ追加）
function toggleMusic() {
    let bgm = document.getElementById("bgm");
    let musicBtn = document.querySelector(".music-btn");

    if (!bgm) {
        console.error("🎵 エラー: BGMのaudioタグが見つかりません！");
        return;
    }

    console.log("🎵 音楽ファイルのパス:", bgm.src); // デバッグログ

    if (bgm.paused) {
        bgm.play().then(() => {
            console.log("🎵 音楽再生成功！");
            musicBtn.textContent = "音楽停止";
        }).catch(error => {
            console.error("🎵 音楽を再生できませんでした:", error);
        });
    } else {
        bgm.pause();
        console.log("🎵 音楽を一時停止しました");
        musicBtn.textContent = "音楽再生";
    }
}

// 🏠 ゲーム選択画面の表示
function showGameOptions() {
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("gameOptions").style.display = "flex";
}

// 🔙 タイトル画面に戻る
function goBackToHome() {
    document.getElementById("gameOptions").style.display = "none";
    document.getElementById("homeScreen").style.display = "flex";
}

// 🔍 ポップアップを表示する
function showPopup(title, description, gameLink) {
    document.getElementById("popupTitle").textContent = title;
    document.getElementById("popupDescription").textContent = description;
    document.getElementById("popup").dataset.link = gameLink;
    document.getElementById("popup").style.display = "block";
}

// ❌ ポップアップを閉じる
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// 🎮 選んだゲームへ遷移
function startGame() {
    let gameLink = document.getElementById("popup").dataset.link;
    window.location.href = gameLink;
}

// 🔄 ページ読み込み時にボタンを正しく設定
document.addEventListener("DOMContentLoaded", function () {
    let bgm = document.getElementById("bgm");
    let musicBtn = document.querySelector(".music-btn");

    // ページロード時にBGMが再生されているかをチェック
    if (!bgm.paused) {
        musicBtn.textContent = "音楽停止";
    } else {
        musicBtn.textContent = "音楽再生";
    }
});
