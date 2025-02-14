  function toggleMenu() {
      const menu = document.getElementById('menu-popup');
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }

    fetch('../../data/tap_dance_card_data_updated.json')
      .then(response => response.json())
      .then(data => {
        window.cardData = data;
        createKeyboard();
        mapCardsToButtons(data);
        updateFieldPattern();
      })
      .catch(error => console.error('データの読み込みに失敗しました:', error));

    const fieldBox = document.getElementById('field-box');
    let currentColumns = 8;
    const actionHistory = [];


  function createKeyboard() {
    console.log("キーボードを作成開始…");

    const rows = ['A', 'B', 'C', 'D'];
    const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const keyboardContainer = document.getElementById('keyboard-container');

    if (!keyboardContainer) {
        console.error("エラー: キーボードのコンテナが見つかりません！");
        return;
    }

    rows.forEach(row => {
        columns.forEach(col => {
            const button = document.createElement('div');
            button.classList.add('keyboard-button');
            button.dataset.label = `${row}${col}`;
            button.textContent = `${row}${col}`;  // ✅ デバッグ用にラベル表示
            keyboardContainer.appendChild(button);
        });
    });

    console.log("キーボードが作成されました！");
}


    const buttonMapping = {
      'A1': 3, 'A2': 4, 'A3': 5, 'A4': 6, 'A5': 7, 'A6': 8, 'A7': 9, 'A8': 16, 'A9': 15, 'A10': 14, 'A11': 13, 'A12': 12, 'A13': 11, 'A14': 10,
      'B1': 31, 'B2': 32, 'B3': 33, 'B4': 29, 'B5': 34, 'B6': 35, 'B7': 36, 'B8': 42, 'B9': 41, 'B10': 40, 'B11': 30, 'B12': 39, 'B13': 38, 'B14': 37,
      'C1': 17, 'C2': 18, 'C3': 19, 'C4': 1, 'C5': 20, 'C6': 21, 'C7': 22, 'C8': 28, 'C9': 27, 'C10': 26, 'C11': 1, 'C12': 25, 'C13': 24, 'C14': 23,
      'D1': 43, 'D2': 44, 'D3': 45, 'D4': 2, 'D5': 46, 'D6': 47, 'D7': 48, 'D8': 54, 'D9': 53, 'D10': 53, 'D11': 2, 'D12': 51, 'D13': 50, 'D14': 49
    };

    function mapCardsToButtons(cards) {
      document.querySelectorAll('.keyboard-button').forEach(button => {
        const cardId = buttonMapping[button.dataset.label];
        const card = cards.find(c => c.カードID === cardId);

        if (card) {
          const img = document.createElement('img');
          img.src = card.画像;
          img.alt = card.カード名;
          button.appendChild(img);

          button.addEventListener('click', () => addCardToField(card));
        }
      });
    }

    function addCardToField(card) {
      const rows = fieldBox.querySelectorAll('.field-row');
      for (let row of rows) {
        const slots = row.querySelectorAll('.field-slot');
        for (let slot of slots) {
          if (!slot.hasChildNodes()) {
            const cardElement = document.createElement('div');
            cardElement.classList.add('field-card');

            const img = document.createElement('img');
            img.src = card.画像;
            img.alt = card.カード名;

            cardElement.appendChild(img);
            cardElement.addEventListener('click', () => removeCardFromField(cardElement, slot));

            slot.replaceWith(cardElement);
            actionHistory.push({ action: 'add', element: cardElement, slot: slot });
            return;
          }
        }
      }
    }

    function removeCardFromField(cardElement, slot) {
      const emptySlot = document.createElement('div');
      emptySlot.classList.add('field-slot');
      cardElement.replaceWith(emptySlot);
      actionHistory.push({ action: 'remove', element: emptySlot, slot: cardElement });
    }

    function undoLastAction() {
      const lastAction = actionHistory.pop();
      if (lastAction) {
        if (lastAction.action === 'add') {
          lastAction.element.replaceWith(lastAction.slot);
        } else if (lastAction.action === 'remove') {
          lastAction.slot.replaceWith(lastAction.element);
        }
      }
    }

    function resetField() {
      const rows = fieldBox.querySelectorAll('.field-row');
      rows.forEach(row => {
        row.innerHTML = '';
        for (let i = 0; i < currentColumns; i++) {
          const slot = document.createElement('div');
          slot.classList.add('field-slot');
          row.appendChild(slot);
        }
      });
      actionHistory.length = 0;
    }

    function updateFieldPattern() {
      const pattern = document.getElementById('pattern').value;
      const customInput = document.getElementById('custom-columns');

      if (pattern === 'custom') {
        customInput.style.display = 'inline';
        currentColumns = parseInt(customInput.value);
      } else {
        customInput.style.display = 'none';
        currentColumns = parseInt(pattern);
      }

      const rows = fieldBox.querySelectorAll('.field-row');
      rows.forEach(row => {
        row.innerHTML = '';
        row.style.gridTemplateColumns = `repeat(${currentColumns}, 1fr)`;
        for (let i = 0; i < currentColumns; i++) {
          const slot = document.createElement('div');
          slot.classList.add('field-slot');
          row.appendChild(slot);
        }
      });
    }

    function saveCombination() {
      const cards = Array.from(document.querySelectorAll('.field-card img')).map(img => img.src);
      localStorage.setItem('savedCombination', JSON.stringify(cards));
      alert('カードの並びを保存しました！');
    }