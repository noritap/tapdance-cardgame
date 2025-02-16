document.addEventListener("DOMContentLoaded", () => {
    console.log("📢 カードライブラリーのデータを読み込み中...");

    fetch("../../data/tap_dance_card_data_updated.json")
        .then(response => {
            if (!response.ok) throw new Error("🚨 JSONの取得に失敗しました！");
            return response.json();
        })
        .then(cards => {
            console.log("✅ JSONデータを取得:", cards);

            cards.forEach((card, index) => {
                if (!card.画像) {
                    console.warn(`⚠️ カード ${index + 1} に画像が設定されていません！`);
                    return;
                }

                const categorySection = document.getElementById(card.カードの種類);
                if (!categorySection) {
                    console.warn(`⚠️ カテゴリー「${card.カードの種類}」のセクションが見つかりません！`);
                    return;
                }

                const cardContainer = categorySection.querySelector(".card-container");
                const cardElement = document.createElement("div");
                cardElement.classList.add("card");

                const img = document.createElement("img");
                img.src = card.画像;
                img.alt = card.カード名;
                img.loading = "lazy";

                img.onerror = () => console.error(`🚨 画像が見つかりません: ${img.src}`);

                cardElement.addEventListener("click", () => showPopup(card));

                cardElement.appendChild(img);
                cardContainer.appendChild(cardElement);
            });

            console.log("✅ カードデータの読み込み完了！");
        })
        .catch(error => console.error("🚨 JSONデータの取得に失敗しました:", error));
});

// 🔹 指定したカテゴリーのセクションにスクロール
function scrollToCategory(categoryName) {
    const section = document.querySelector(`[id='${categoryName}']`);
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        console.error(`🚨 セクション ${categoryName} が見つかりません！`);
    }
}

// 🔹 ポップアップを表示する関数
function showPopup(card) {
    document.getElementById("popupTitle").textContent = card.カード名;
    document.getElementById("popupImage").src = card.画像;
    document.getElementById("popupType").textContent = card.カードの種類;
    document.getElementById("popupGenre").textContent = card.ダンスジャンル;
    document.getElementById("popupFoot").textContent = card.左右 || "なし";
    document.getElementById("popupPart").textContent = card.部位 || "なし";
    document.getElementById("popupAction").textContent = card.動作 || "なし";
    document.getElementById("popupBeat").textContent = card.ビート数 || "なし";
    document.getElementById("popupLevel").textContent = card.ステップレベル || "なし";
    document.getElementById("cardPopup").style.display = "flex";
}

// 🔹 ポップアップを閉じる
function closePopup() {
    document.getElementById("cardPopup").style.display = "none";
}
