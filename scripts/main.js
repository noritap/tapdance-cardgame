// BGMの制御
const bgm = document.getElementById('bgm');
bgm.volume = 0.2;
let isPlaying = true;

function toggleMusic() {
    if (isPlaying) {
        bgm.pause();
        document.querySelector('.music-btn').textContent = '音楽再生';
    } else {
        bgm.play();
        document.querySelector('.music-btn').textContent = '音楽停止';
    }
    isPlaying = !isPlaying;
}

// ゲーム選択画面の表示
function showGameOptions() {
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('gameOptions').style.display = 'flex';
}

// タイトル画面に戻る
function goBackToHome() {
    document.getElementById('gameOptions').style.display = 'none';
    document.getElementById('homeScreen').style.display = 'flex';
}

// ポップアップの制御
let gameLink = '';

function showPopup(title, description, link) {
    document.getElementById('popupTitle').textContent = title;
    document.getElementById('popupDescription').textContent = description;
    document.getElementById('popup').style.display = 'block';

    gameLink = link; // ✅ URLを保存
    console.log("ゲームリンク:", gameLink); // ✅ デバッグ用
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// ゲームを開始する
function startGame() {
    console.log("開くゲームリンク:", gameLink); // ✅ デバッグ用
    if (gameLink) {
        window.open(gameLink, '_blank'); // ✅ 新しいタブで開く
        closePopup();
    } else {
        alert('エラー: ゲームのURLが見つかりません'); // ✅ デバッグ用
    }
}
