// JSONデータを取得して表示
fetch('../../data/tap_dance_card_data_updated.json')
    .then(response => response.json())
    .then(data => displayCards(data))
    .catch(error => console.error('データの読み込みに失敗しました:', error));

function displayCards(cards) {
    const container = document.getElementById('card-container');
    container.innerHTML = '';

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        // 画像要素
        const img = document.createElement('img');
        const imgPath = `../../images/${card.画像.replace(/ /g, "_").replace(/×/g, "x")}`;
        img.src = imgPath;
        img.alt = card.カード名;
        img.onerror = function () {
            img.src = '../../images/default.png'; // ✅ 画像がない場合デフォルト
        };

        // カード情報
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const id = document.createElement('p');
        id.textContent = `ID: ${card.カードID}`;

        const title = document.createElement('h3');
        title.textContent = card.カード名;

        const details = document.createElement('p');
        details.textContent = `ビート数: ${card.ビート数 || 'N/A'} | レベル: ${card.ステップレベル || 'N/A'}`;

        const description = document.createElement('p');
        description.textContent = card.説明 || '説明がありません';

        // 要素を結合
        cardContent.appendChild(id);
        cardContent.appendChild(title);
        cardContent.appendChild(details);
        cardContent.appendChild(description);
        cardElement.appendChild(img);
        cardElement.appendChild(cardContent);
        container.appendChild(cardElement);
    });
}
