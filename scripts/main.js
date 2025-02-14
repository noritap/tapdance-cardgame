// 🎵 BGMの再生・停止機能
function toggleMusic() {
    let bgm = document.getElementById("bgm");
    let musicBtn = document.querySelector(".music-btn");

    if (bgm.paused) {
        bgm.play();
        musicBtn.textContent = "音楽停止";
    } else {
        bgm.pause();
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
