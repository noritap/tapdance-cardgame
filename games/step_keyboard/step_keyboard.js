document.addEventListener("DOMContentLoaded", () => {
  console.log("📢 ステップキーボードのデータを読み込み中...");

  fetch("../../data/tap_dance_card_data_updated.json")
      .then(response => response.json())
      .then(data => {
          window.cardData = data;
          createKeyboard(); // ✅ キーボードを作成
          mapCardsToButtons(data);
      })
      .catch(error => console.error("🚨 データの読み込みに失敗しました:", error));
});

// 🔹 ボタンマッピング（指定通りに配置）
const buttonMapping = {
  'A1': 3, 'A2': 4, 'A3': 5, 'A4': 6, 'A5': 7, 'A6': 8, 'A7': 9, 'A8': 16, 'A9': 15, 'A10': 14, 'A11': 13, 'A12': 12, 'A13': 11, 'A14': 10,
  'B1': 31, 'B2': 32, 'B3': 33, 'B4': 29, 'B5': 34, 'B6': 35, 'B7': 36, 'B8': 42, 'B9': 41, 'B10': 40, 'B11': 30, 'B12': 39, 'B13': 38, 'B14': 37,
  'C1': 17, 'C2': 18, 'C3': 19, 'C4': 1, 'C5': 20, 'C6': 21, 'C7': 22, 'C8': 28, 'C9': 27, 'C10': 26, 'C11': 1, 'C12': 25, 'C13': 24, 'C14': 23,
  'D1': 43, 'D2': 44, 'D3': 45, 'D4': 2, 'D5': 46, 'D6': 47, 'D7': 48, 'D8': 54, 'D9': 53, 'D10': 53, 'D11': 2, 'D12': 51, 'D13': 50, 'D14': 49
};

// 🔹 キーボードのボタンを作成する（1回だけ定義）
function createKeyboard() {
  console.log("🎹 キーボードを作成開始…");

  const rows = ['A', 'B', 'C', 'D'];
  const columns = Array.from({ length: 14 }, (_, i) => i + 1);
  const keyboardGrid = document.getElementById('keyboard-grid');

  if (!keyboardGrid) {
      console.error("🚨 エラー: キーボードのグリッドが見つかりません！");
      return;
  }

  keyboardGrid.innerHTML = ""; // 既存のデータをクリア

  rows.forEach(row => {
      columns.forEach(col => {
          const keyLabel = `${row}${col}`;
          const button = document.createElement('div');
          button.classList.add('keyboard-button');
          button.dataset.label = keyLabel;

          // 🔹 ID番号を取得し、JSONデータと関連付け
          const cardId = buttonMapping[keyLabel];
          button.dataset.cardId = cardId; // ✅ カードIDをボタンにセット

          keyboardGrid.appendChild(button);
      });
  });

  console.log("✅ キーボードが作成されました！");
}

// 🔹 キーボードボタンと JSON データをマッピングする
function mapCardsToButtons(cards) {
  document.querySelectorAll('.keyboard-button').forEach(button => {
      const cardId = button.dataset.cardId;
      const card = cards.find(c => c.カードID === parseInt(cardId));

      if (card) {
          const img = document.createElement('img');
          img.src = card.画像;
          img.alt = card.カード名;
          img.classList.add("keyboard-icon");
          button.appendChild(img);

          button.addEventListener('click', () => addCardToField(card));
      }
  });
}

// 🔹 フィールドのスロットにカードを配置する
function addCardToField(card) {
  const emptySlot = document.querySelector(".slot:not(.filled)"); // ✅ 空いているスロットを探す

  if (!emptySlot) {
      alert("⚠️ フィールドがいっぱいです！");
      return;
  }

  emptySlot.classList.add("filled"); // ✅ スロットを「埋まった」状態にする
  emptySlot.innerHTML = ""; // スロットの中身をクリア
  const img = document.createElement("img");
  img.src = card.画像;
  img.alt = card.カード名;
  emptySlot.appendChild(img);

  console.log(`🟡 フィールドのスロットに「${card.カード名}」を配置`);
}

// 🔹 メニューの開閉
function toggleMenu() {
  const menu = document.getElementById('menu-popup');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}
// 🔹 現在のフィールドスロット設定（デフォルト）
let currentSlotsX = 4;
let currentSlotsY = 1;

// 🔹 フィールドカードのデータを取得し、選択エリアに追加
function loadFieldCards() {
    fetch("../../data/tap_dance_card_data_updated.json") // ✅ JSONの正しいパスを指定
        .then(response => response.json())
        .then(data => {
            const fieldCards = data.filter(card => card.カードの種類 === "Field Card");
            const fieldCardContainer = document.querySelector(".field-card-container");

            fieldCards.forEach(card => {
                const cardElement = document.createElement("div");
                cardElement.classList.add("field-card");
                cardElement.dataset.fieldName = card.カード名; // ✅ カード名をデータ属性にセット
                cardElement.dataset.image = card.画像; // ✅ 画像データを取得

                const img = document.createElement("img");
                img.src = card.画像;
                img.alt = card.カード名;

                cardElement.appendChild(img);
                fieldCardContainer.appendChild(cardElement);

                // ✅ フィールドカードをクリックするとスロット数を変更
                cardElement.addEventListener("click", () => updateFieldSlots(card.カード名, cardElement));
            });
        });
}

// 🔹 フィールドのスロットを更新する（カードの比率を維持）
function updateFieldSlots(fieldName, selectedCard) {
  document.querySelectorAll(".field-card").forEach(card => card.classList.remove("selected"));
  selectedCard.classList.add("selected");

  const fieldContainer = document.getElementById("field-container");
  fieldContainer.innerHTML = ""; // スロットをクリア

  const match = fieldName.match(/Field_(\d+)X(\d+)/);
  if (match) {
      currentSlotsX = parseInt(match[1]); // `4` (横のスロット数)
      currentSlotsY = parseInt(match[2]); // `3` (縦のスロット数)
  } else {
      console.error("🚨 エラー: フィールドカードのフォーマットが不正です！");
      return;
  }

  // ✅ スマホ用にスロットサイズを動的に調整
  const isMobile = window.innerWidth <= 768;
  const slotSize = isMobile ? "50px" : "70px"; // ✅ スマホなら `50px`
  document.documentElement.style.setProperty("--slot-size", slotSize);

  for (let i = 0; i < currentSlotsY; i++) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("field-row");

      for (let j = 0; j < currentSlotsX; j++) {
          const slot = document.createElement("div");
          slot.classList.add("slot");
          rowDiv.appendChild(slot);
      }

      fieldContainer.appendChild(rowDiv);
  }

  console.log(`✅ フィールドスロットを ${currentSlotsX}×${currentSlotsY}（ビート数: ${currentSlotsX * currentSlotsY}）に更新しました！`);
}


// 🔹 ページ読み込み時にフィールドカードをロード
document.addEventListener("DOMContentLoaded", () => {
    console.log("📢 ステップキーボードのデータを読み込み中...");
    loadFieldCards();
});
