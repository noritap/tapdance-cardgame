const bgm = document.getElementById('bgm');
    bgm.volume = 0.2;
    let isPlaying = false;

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

    function showGameOptions() {
        document.getElementById('homeScreen').style.display = 'none';
        document.getElementById('gameOptions').style.display = 'flex';
    }

    function goBackToHome() {
        document.getElementById('gameOptions').style.display = 'none';
        document.getElementById('homeScreen').style.display = 'flex';
    }

    let gameLink = '';

    function showPopup(title, description, link) {
        document.getElementById('popupTitle').textContent = title;
        document.getElementById('popupDescription').textContent = description;
        document.getElementById('popup').style.display = 'block';
        gameLink = link;
    }

    function closePopup() {
        document.getElementById('popup').style.display = 'none';
    }

    function startGame() {
        window.open(gameLink, '_blank');
        closePopup();
    }