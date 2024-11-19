/**
 * Generates HTML for rendering food images and titles.
 *
 * @param {Object} food - The food object containing image and title.
 * @param {string} food.image - The URL of the food image.
 * @param {string} food.title - The title of the food.
 * @param {number} i - The index of the food item.
 * @returns {string} The HTML string for the food image and title.
 */
function renderImagesTitlesHtml(food, i) {
  return /*html*/ `
      <div id="navLink${i}" class="food-img">
      <img src="${food.image}" alt="">
      </div>
      <h2 class="food-title">${food.title}</h2>
      `;
}

/**
 * Generates the HTML string for a dish card.
 *
 * @param {Object} dish - The dish object containing details about the dish.
 * @param {string} dish.name - The name of the dish.
 * @param {string} dish.ingredients - The ingredients of the dish.
 * @param {number} dish.price - The price of the dish.
 * @param {number} i - The index of the dish in the main array.
 * @param {number} j - The index of the dish in the sub-array.
 * @returns {string} The HTML string representing the dish card.
 */
function renderDishesHtml(dish, i, j) {
  return /*html*/ `
  <div class="food-card d-flex">
      <div class="dish-title d-flex">
          <h3>${dish.name}</h3>
          <div class="i-icon">
              <img src="./img/icons/die-info.png" alt="">
          </div>
      </div>
      <h4>${dish.ingredients}</h4>
      <h3>${dish.price} €</h3>
      <button onclick="addToBasket(${i}, ${j})" class="add-basket-button">
          <img src="./img/icons/plus-solid (1).svg" alt="">
      </button>
  </div>
      `;
}

/**
 * Generates the HTML for a responsive basket button without delivery.
 *
 * @param {number} totalPricenoDelivery - The total price without delivery.
 * @returns {string} The HTML string for the responsive basket button.
 */
function responsiveBasketButtonNoDeliveryHtml(totalPricenoDelivery) {
  return /*html*/ `
    <button onclick="toggleResponsiveBasket()" class="d-flex">
      <img src="./img/icons/einkaufstasche_white.png" alt="">
      Warenkorb (${totalPricenoDelivery} €)
    </button>
    `;
}

/**
 * Generates HTML for a responsive basket button with the given subtotal price.
 *
 * @param {number} subTotalPrice - The subtotal price to be displayed in the basket button.
 * @returns {string} The HTML string for the responsive basket button.
 */
function responsiveBasketButtonPickUpHtml(subTotalPrice) {
  return /*html*/ `
    <button onclick="toggleResponsiveBasket()" class="d-flex">
      <img src="./img/icons/einkaufstasche_white.png" alt="">
      Warenkorb (${subTotalPrice} €)
    </button>
    `;
}

/**
 * Generates the HTML for a responsive basket button with the total price displayed.
 *
 * @param {number} totalPrice - The total price to be displayed in the basket button.
 * @returns {string} The HTML string for the responsive basket button.
 */
function responsiveBasketButtonDeliveryHtml(totalPrice) {
  return /*html*/ `
    <button onclick="toggleResponsiveBasket()" class="d-flex">
      <img src="./img/icons/einkaufstasche_white.png" alt="">
      Warenkorb (${totalPrice} €)
    </button>
    `;
}

/**
 * Generates HTML for a pick-up order summary.
 *
 * @param {number} subTotalPrice - The subtotal price of the order.
 * @param {number} totalPricenoDelivery - The total price of the order without delivery charges.
 * @returns {string} The HTML string for the pick-up order summary.
 */
function generatePickUpOrderHtml(subTotalPrice, totalPricenoDelivery) {
  return /*html*/ `
   <div class="pay-card d-flex">
      <div class="subtotal d-flex">
          <h4>Zwischensumme</h4>
          <h4>${subTotalPrice} €</h4>
      </div>
      <div class="total d-flex">
          <h4>Gesamt</h4>
          <h4>${totalPricenoDelivery} €</h4>
      </div>
      <button onclick="sendOrder()" class="pay-button">
          Bezahlen (${totalPricenoDelivery} €)
      </button>
  
    </div>
   `;
}

/**
 * Generates the HTML for the checkout section.
 *
 * @param {number} deliveryFee - The delivery fee amount.
 * @param {number} subTotalPrice - The subtotal price of the order.
 * @param {number} totalPrice - The total price of the order.
 * @returns {string} The HTML string for the checkout section.
 */
function generateCheckoutHtml(deliveryFee, subTotalPrice, totalPrice) {
  return /*html*/ `
    <div class="pay-card d-flex">
      <div class="subtotal d-flex">
          <h4>Zwischensumme</h4>
          <h4>${subTotalPrice} €</h4>
      </div>
      <div class="delivery-fee d-flex">
          <h4>Lieferkosten</h4>
          <h4>${deliveryFee} €</h4>
      </div>
      <div class="total d-flex">
          <h4>Gesamt</h4>
          <h4>${totalPrice} €</h4>
      </div>
      <button onclick="sendOrder()" class="pay-button">
          Bezahlen (${totalPrice} €)
      </button>
    </div>
    `;
}

/**
 * Generates HTML for displaying the minimum order value and subtotal price.
 *
 * @param {number} minimumOrderValue - The minimum order value required to place an order.
 * @param {number} subTotalPrice - The current subtotal price of the order.
 * @returns {string} The generated HTML string.
 */
function generateMinimumOrderValueHtml(minimumOrderValue, subTotalPrice) {
  return /*html*/ `
      <div class="minimum-order-card d-flex">
      <div class="minimum-order d-flex">
          <div>
              <h6>Benötigter Betrag, um den <br> Mindestbestellwert zu erreichen</h6>
          </div>
          <div class="margin-left-auto">
              <h6>${minimumOrderValue} €</h6>
          </div>
      </div>
  
      <div class="cannot-order-text">
          <h6>
              Leider kannst du noch nicht bestellen. Pizza Cartel liefert erst ab einem
              Mindestbestellwert von 15.00 € (exkl. Lieferkosten).
          </h6>
      </div>
  
      </div>
      <div class="pay-card d-flex">
        <div class="subtotal d-flex">
            <h4>Zwischensumme</h4>
            <h4>${subTotalPrice} €</h4>
        </div>
      
        <div class="total d-flex">
            <h4>Gesamt</h4>
            <h4>${subTotalPrice} €</h4>
        </div>
          <button class="pay-button-disabled">
              Bezahlen (${subTotalPrice} €)
          </button>
      </div>
      `;
}

/**
 * Generates the HTML for a filled basket item.
 *
 * @param {string} dishTitle - The title of the dish.
 * @param {string} dishIngredient - The ingredients of the dish.
 * @param {number} dishPrice - The price of the dish.
 * @param {number} dishAmount - The amount of the dish.
 * @param {number} i - The index of the dish in the basket.
 * @returns {string} The HTML string for the filled basket item.
 */
function generateFilledBasketHtml(dishTitle,dishIngredient,dishPrice,dishAmount,i) {
  return /*html*/ `
    <div id="basketCard${i}" class="basket-card d-flex">
      <div class="basket-amount">
          <h4>${dishAmount}</h4>
      </div>
      <div class="basket-dish-text d-flex">
          <div class="basket-dish d-flex">
              <h4>${dishTitle}</h4>
              <h4>${dishPrice}</h4>
          </div>
  
          <div class="basket-description">
              <h4>${dishIngredient}</h4>
          </div>
  
          <div class="basket-minus-plus d-flex">
              <button onclick="decreaseDishAmount(${i})" class="basket-minus-button">
                  <img src="./img/icons/minus-solid.svg" alt="">
              </button>
              <div class="basket-incdec-amount">
                  <h4>${dishAmount}</h4>
              </div>
              <button onclick="increaseDishAmount(${i})" class="basket-plus-button">
                  <img src="./img/icons/plus-solid.svg" alt="">
              </button>
          </div>
  
      </div>
  
    </div>
    `;
}

/**
 * Generates the HTML string for displaying an empty basket message.
 *
 * @returns {string} The HTML string for the empty basket message.
 */
function generateBasketInfoHtml() {
  return /*html*/ `
  <div class="empty-basket d-flex">
      <img class="basket-icon" src="./img/icons/cart-shopping-solid.svg" alt="">
      <h2 class="margin-bottom-12px">Fülle deinen Warenkorb</h2>
      <h4 class="basket-text">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein
          Essen.
      </h4>
  </div>
      `;
}
