// ====== 🎵 BGMの再生・停止機能 ======
document.querySelector(".music-btn").addEventListener("click", function() {
    let bgm = document.getElementById("bgm");
    if (bgm.paused) {
        bgm.play();
        this.textContent = "音楽停止";
    } else {
        bgm.pause();
        this.textContent = "音楽再生";
    }
});

// ====== 🏠 ゲーム選択画面の表示 ======
function showGameOptions() {
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("gameOptions").style.display = "flex";
}

// ====== 🔙 タイトル画面に戻る ======
function goBackToHome() {
    document.getElementById("gameOptions").style.display = "none";
    document.getElementById("homeScreen").style.display = "flex";
}

// ====== 🔍 ポップアップを表示する ======
function showPopup(title, description, gameLink) {
    document.getElementById("popupTitle").textContent = title;
    document.getElementById("popupDescription").textContent = description;
    document.getElementById("popup").dataset.link = gameLink;
    document.getElementById("popup").style.display = "block";
}

// ====== ❌ ポップアップを閉じる ======
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// ====== 🎮 選んだゲームへ遷移 ======
function startGame() {
    let gameLink = document.getElementById("popup").dataset.link;
    window.location.href = gameLink;
}
