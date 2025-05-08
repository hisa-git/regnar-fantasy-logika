let itemsAmount = 0;
let itemsPrice = 0;
window.onscroll = function () {
  let button = document.getElementById("scrollToTopBtn");
  button.style.display = document.documentElement.scrollTop > 100 ? "block" : "none";
};
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
window.addEventListener("DOMContentLoaded", function () {
  const knownPotions = {
    "10000": "Заспокійливий настій",
    "01000": "Зілля сили дракона",
    "00100": "Еліксир легкості",
    "00010": "Пробудження кореня",
    "00001": "Зір тритона",
    "01100": "Вогненна іскра",
    "00011": "Темна пара",
    "00110": "Феєричний захист",
    "11111": "Абсолютне зілля",
    "10011": "Зілля нічного зору",
    "01001": "Яростне зілля",
    "01010": "Зілля бадьорості",
    "10100": "Освіжаючий туман",
    "11000": "Драконів спокій",
    "11100": "Тепло з небес",
    "10101": "Осяяння нічі",
    "00111": "Ілюзія води",
    "01110": "Буревій ефіру",
    "11010": "Дике полум’я",
    "01111": "Фантомний слід",
    "11110": "Прокляття стихій",
    "11011": "Безодня волі",
    "10110": "Сяйво лісу",
    "10001": "Тіньовий спокій"
  };
  const resultTitle = document.getElementById("potion-title");
  const resultDiv = document.getElementById("potion-info");
  function getCurrentSelection() {
    const checkboxes = document.querySelectorAll('input[name="ingredient"]');
    const selected = [];
    const ingredients = [];
    let totalPrice = 0;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selected.push(1);
        ingredients.push(checkbox.value);
        totalPrice += parseInt(checkbox.dataset.price);
      } else {
        selected.push(0);
      }
    });
    const binaryKey = selected.join("");
    const potionName = knownPotions[binaryKey] || "";
    return { potionName, ingredients, totalPrice, binaryKey };
  }
  function updatePotionPreview() {
    const { potionName, ingredients, totalPrice } = getCurrentSelection();
    if (ingredients.length === 0) {
      resultTitle.innerText = "";
      resultDiv.innerText = "Виберіть інгредієнти для зілля";
      return;
    }
    resultTitle.innerText = potionName || "Невідоме зілля";
    resultDiv.innerText = `Склад: ${ingredients.join(", ")}\nЦіна: ${totalPrice} ₭`;
  }
  window.orderPotion = function () {
    const { potionName, ingredients, totalPrice, binaryKey } = getCurrentSelection();
    if (knownPotions[binaryKey]) {
      itemsAmount++;
      itemsPrice += totalPrice;
      alert(`Додано: ${potionName}\nСклад: ${ingredients.join(", ")}\nЦіна: ${totalPrice} ₭`);
      updateCartDisplay();
    } else {
      alert("Таке зілля не існує! Оберіть інші інгредієнти.");
    }
  };
  function updateCartDisplay() {
    document.getElementById("itemCount").textContent = itemsAmount;
    document.getElementById("totalPrice").textContent = itemsPrice;
  }
  function placeOrder() {
    if (itemsAmount === 0) {
      alert("Кошик порожній.");
    } else {
      alert(`Ви замовили ${itemsAmount} товар(ів) на суму ${itemsPrice} ₭. Дякуємо за покупку!`);
      itemsAmount = 0;
      itemsPrice = 0;
      updateCartDisplay();
    }
  }
  document.querySelectorAll('input[name="ingredient"]').forEach(cb => {
    cb.addEventListener("change", updatePotionPreview);
  });

  document.querySelectorAll('.buying-button').forEach(button => {
    button.addEventListener('click', function () {
      const itemName = this.dataset.name;
      const itemPrice = parseInt(this.dataset.price);
      if (!itemName || isNaN(itemPrice)) {
        alert("Помилка: немає назви або ціни предмету.");
        return;
      }
      itemsAmount++;
      itemsPrice += itemPrice;
      updateCartDisplay();
      alert(`Додано до кошика: ${itemName}\nЦіна: ${itemPrice} ₭`);
    });
  });

  document.getElementById("shopContainer").addEventListener("click", placeOrder);
  updatePotionPreview();
  updateCartDisplay();
});