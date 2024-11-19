let foodMenu = [
  {
    image: "./img/food/1.jpg",
    title: "Pizza",
    dishes: [
      {
        name: "Pizza El Chapo",
        ingredients: "mit Salami, Paprika, Mais, Zwiebel und Knoblauch",
        price: twoDecimals(7.4),
      },
      {
        name: "Pizza Tijuana",
        ingredients: "mit Chorizo, Oliven, Jalapeños und Koriander",
        price: twoDecimals(6.9),
      },
      {
        name: "Pizza Bandito",
        ingredients: "mit Hähnchen, Ananas, Paprika und Zwiebeln",
        price: twoDecimals(7.2),
      },
      {
        name: "Pizza Mexicana",
        ingredients: "mit Rindfleisch, Bohnen, Avocado und Salsa",
        price: twoDecimals(7.9),
      },
    ],
  },
  {
    image: "./img/food/16.jpg",
    title: "Pasta",
    dishes: [
      {
        name: "Penne alla Tequila",
        ingredients: "mit Tequila-Sahnesauce, Koriander und Paprika",
        price: twoDecimals(10.3),
      },
      {
        name: "Taco Pasta",
        ingredients: "mit Rindfleisch, Mais, Bohnen und Cheddar",
        price: twoDecimals(11.7),
      },
      {
        name: "Mafia Mole Macaroni",
        ingredients: "mit Mole-Sauce, Hähnchen, roten Zwiebeln und Sesam",
        price: twoDecimals(13.1),
      },
      {
        name: "El Gringo Fettuccine",
        ingredients: "mit scharfer Tomatensauce, Chorizo und Jalapeños",
        price: twoDecimals(12.5),
      },
    ],
  },
  {
    image: "./img/food/17.jpg",
    title: "Burger",
    dishes: [
      {
        name: "El Jefe Burger",
        ingredients: "mit Rindfleisch, Salat, Tomate, Zwiebel und Käse",
        price: twoDecimals(15.3),
      },
      {
        name: "Kingpin Burger",
        ingredients: "mit Guacamole, Jalapeños, Speck und Monterey Käse",
        price: twoDecimals(14.5),
      },
      {
        name: "The Boss Burger",
        ingredients: "mit Rindfleisch, Pilze, Käse und Trüffel-Mayonnaise",
        price: twoDecimals(16.9),
      },
      {
        name: "Escobar Burger",
        ingredients: "mit scharfer Chorizo, Avocado und Cheddar",
        price: twoDecimals(14.9),
      },
    ],
  },
];

let basket = [
  {
    dishTitles: [],
    dishIngredients: [],
    dishPrices: [],
    totalPrices: [],
    amounts: [],
  },
];


/**
 * Renders the food menu and associated dishes to the content element.
 * Clears the existing content and iterates through the foodMenu array,
 * rendering each food item and its dishes. Also renders the basket and
 * the responsive basket button.
 *
 * @function
 */
function render() {
  let content = document.getElementById("content");
  content.innerHTML = "";

  for (let i = 0; i < foodMenu.length; i++) {
    const food = foodMenu[i];
    content.innerHTML += renderImagesTitlesHtml(food, i);

    for (let j = 0; j < food.dishes.length; j++) {
      const dish = food.dishes[j];
      content.innerHTML += renderDishesHtml(dish, i, j);
    }
  }
  renderBasket();
  renderResponsiveBasketButton();
}


/**
 * Renders the basket contents on the webpage.
 * 
 * This function updates the inner HTML of the element with the ID "basket" based on the contents of the `basket` array.
 * If the basket is empty, it displays basket information. Otherwise, it displays the basket items and either the minimum order or checkout options, or the pick-up order option based on the state of the pick-up button.
 */
function renderBasket() {
  let itemBasket = document.getElementById("basket");

  itemBasket.innerHTML = "";

  if (basket[0].dishTitles.length < 1) {
    itemBasket.innerHTML += generateBasketInfoHtml();
  } else {
    itemBasket.innerHTML += generateBasketItems();
    if (!pickUpButtonActive()) {
      itemBasket.innerHTML += generateMinimumOrderOrCheckout();
    } else {
      itemBasket.innerHTML += generatePickUpOrder();
    }
  }
}


/**
 * Generates the HTML content for the items in the basket.
 *
 * Iterates through the items in the basket and generates the HTML for each item
 * using the `generateFilledBasketHtml` function.
 *
 * @returns {string} The HTML content for the basket items.
 */
function generateBasketItems() {
  let itemsContent = '';
  for (let i = 0; i < basket[0].dishTitles.length; i++) {
    let dishTitle = basket[0].dishTitles[i];
    let dishIngredient = basket[0].dishIngredients[i];
    let dishPrice = basket[0].totalPrices[i];
    let dishAmount = basket[0].amounts[i];

    itemsContent += generateFilledBasketHtml(dishTitle, dishIngredient, dishPrice, dishAmount, i);
  }
  return itemsContent;
}


/**
 * Renders the responsive basket button with updated prices.
 * 
 * This function calculates the delivery fee, subtotal price, and total price
 * (with and without delivery fee) for the basket. It then updates the inner HTML
 * of the responsive basket button element with the generated button content.
 * 
 * @function
 */
function renderResponsiveBasketButton() {
  let deliveryFee = twoDecimals(5.0);
  let subTotalPrice = calcTotalBasketPrice();
  let totalPrice = twoDecimals(+subTotalPrice + +deliveryFee);
  let totalPricenoDelivery = twoDecimals(+subTotalPrice);
  let responsiveBasketButton = document.getElementById("responsiveBasketButton");

  responsiveBasketButton.innerHTML = generateResponsiveBasketButton(subTotalPrice,totalPrice,totalPricenoDelivery);
}


/**
 * Generates the HTML for the responsive basket button based on the given prices and conditions.
 *
 * @param {number} subTotalPrice - The subtotal price of the items in the basket.
 * @param {number} totalPrice - The total price including delivery.
 * @param {number} totalPricenoDelivery - The total price excluding delivery.
 * @returns {string} The HTML string for the responsive basket button.
 */
function generateResponsiveBasketButton(subTotalPrice, totalPrice, totalPricenoDelivery) {
  if (subTotalPrice < 15) {
    return responsiveBasketButtonNoDeliveryHtml(totalPricenoDelivery);
  }
  if (pickUpButtonActive()) {
    return responsiveBasketButtonPickUpHtml(subTotalPrice);
  }
  return responsiveBasketButtonDeliveryHtml(totalPrice);
}


/**
 * Checks if the pick-up button has the "active-button" class.
 *
 * @returns {boolean} True if the pick-up button has the "active-button" class, otherwise false.
 */
function pickUpButtonActive() {
  let pickUpButton = document.getElementById("pickUpButton");
  return pickUpButton.classList.contains("active-button");
}


/**
 * Generates the HTML for a pick-up order.
 *
 * This function calculates the total basket price, formats it to two decimal places,
 * and then generates the HTML for the pick-up order using the calculated prices.
 *
 * @returns {string} The HTML string for the pick-up order.
 */
function generatePickUpOrder() {
  let subTotalPrice = calcTotalBasketPrice();
  let totalPricenoDelivery = twoDecimals(+subTotalPrice);
  return generatePickUpOrderHtml(subTotalPrice, totalPricenoDelivery);
}


/**
 * Generates the HTML for either the minimum order value message or the checkout section
 * based on the subtotal price of the basket.
 *
 * @returns {string} The HTML string for the minimum order value message or the checkout section.
 */
function generateMinimumOrderOrCheckout() {
  let deliveryFee = twoDecimals(5.0);
  let subTotalPrice = calcTotalBasketPrice();
  let minimumOrderValue = calcMinimumValueOrder();
  let totalPrice = twoDecimals(+subTotalPrice + +deliveryFee);

  if (subTotalPrice < 15) {
    return generateMinimumOrderValueHtml(minimumOrderValue, subTotalPrice);
  } else {
    return generateCheckoutHtml(deliveryFee, subTotalPrice, totalPrice);
  }
}


/**
 * Adds a dish to the basket or increases its amount if already present.
 *
 * @param {number} i - The index of the food category in the food menu.
 * @param {number} j - The index of the dish within the selected food category.
 */
function addToBasket(i, j) {
  let dish = foodMenu[i].dishes[j];
  let basketIndex = getBasketIndex(dish.name);

  if (basketIndex === -1) {
    addDishToBasket(dish);
  } else {
    increaseDishAmount(basketIndex);
  }
  renderBasket();
  renderResponsiveBasketButton();
}


/**
 * Adds a dish to the basket.
 *
 * @param {Object} dish - The dish object to be added to the basket.
 * @param {string} dish.name - The name of the dish.
 * @param {string[]} dish.ingredients - The ingredients of the dish.
 * @param {number} dish.price - The price of the dish.
 */
function addDishToBasket(dish) {
  basket[0].dishTitles.push(dish.name);
  basket[0].dishIngredients.push(dish.ingredients);
  basket[0].dishPrices.push(dish.price);
  basket[0].totalPrices.push(dish.price);
  basket[0].amounts.push(1);
}


/**
 * Retrieves the index of a dish in the basket based on the dish name.
 *
 * @param {string} dishName - The name of the dish to find in the basket.
 * @returns {number} The index of the dish in the basket, or -1 if the dish is not found.
 */
function getBasketIndex(dishName) {
  let basketIndex = basket[0].dishTitles.indexOf(dishName);
  return basketIndex;
}


/**
 * Increases the amount of a specific dish in the basket by one.
 * 
 * @param {number} basketIndex - The index of the dish in the basket.
 */
function increaseDishAmount(basketIndex) {
  basket[0].amounts[basketIndex]++;
  calcSingleDishTotalPrice(basketIndex);
  renderBasket();
  renderResponsiveBasketButton();
}


/**
 * Decreases the amount of a dish in the basket at the specified index.
 * If the amount is greater than 1, it decrements the amount and recalculates the total price for that dish.
 * If the amount is 1, it removes the dish from the basket.
 * Finally, it re-renders the basket and the responsive basket button.
 *
 * @param {number} basketIndex - The index of the dish in the basket to decrease the amount of.
 */
function decreaseDishAmount(basketIndex) {
  if (basket[0].amounts[basketIndex] > 1) {
    basket[0].amounts[basketIndex]--;
    calcSingleDishTotalPrice(basketIndex);
  } else {
    deleteDishFromBasket(basketIndex);
  }
  renderBasket();
  renderResponsiveBasketButton();
}


/**
 * Deletes a dish from the basket at the specified index.
 *
 * @param {number} basketIndex - The index of the dish to be removed from the basket.
 */
function deleteDishFromBasket(basketIndex) {
  basket[0].dishTitles.splice(basketIndex, 1);
  basket[0].dishIngredients.splice(basketIndex, 1);
  basket[0].dishPrices.splice(basketIndex, 1);
  basket[0].totalPrices.splice(basketIndex, 1);
  basket[0].amounts.splice(basketIndex, 1);
}


/**
 * Calculates the total price for a single dish in the basket and updates the totalPrices array.
 *
 * @param {number} basketIndex - The index of the dish in the basket arrays.
 */
function calcSingleDishTotalPrice(basketIndex) {
  basket[0].totalPrices[basketIndex] = twoDecimals(
    basket[0].amounts[basketIndex] * basket[0].dishPrices[basketIndex]
  );
}


/**
 * Calculates the total price of all items in the basket.
 *
 * This function iterates through the `totalPrices` array of the first item in the `basket` array,
 * sums up all the prices, and returns the total price rounded to two decimal places.
 *
 * @returns {number} The total price of all items in the basket, rounded to two decimal places.
 */
function calcTotalBasketPrice() {
  let totalBasketPrice = 0;
  let totalPrices = basket[0].totalPrices;

  for (let number = 0; number < totalPrices.length; number++) {
    totalBasketPrice += +totalPrices[number];
  }
  return twoDecimals(totalBasketPrice);
}


/**
 * Calculates the remaining amount needed to reach the minimum order value.
 *
 * This function calculates the difference between the minimum order value
 * and the current subtotal of the basket. It returns the remaining amount
 * formatted to two decimal places.
 *
 * @returns {number} The remaining amount needed to reach the minimum order value.
 */
function calcMinimumValueOrder() {
  let subTotal = calcTotalBasketPrice();
  let minimumOrderValue = +15;
  let remainingSum = minimumOrderValue - subTotal;
  return twoDecimals(remainingSum);
}


/**
 * Sends the order by clearing the basket and updating the UI.
 * 
 * This function resets the basket by clearing all dish titles, ingredients, prices, total prices, and amounts.
 * It then opens a popup, renders the updated basket, and updates the responsive basket button.
 */
function sendOrder() {
  basket[0].dishTitles = [];
  basket[0].dishIngredients = [];
  basket[0].dishPrices = [];
  basket[0].totalPrices = [];
  basket[0].amounts = [];

  openPopup();
  renderBasket();
  renderResponsiveBasketButton();
}


/**
 * Formats a number to two decimal places.
 *
 * @param {number} number - The number to be formatted.
 * @returns {string} The formatted number as a string with two decimal places.
 */
function twoDecimals(number) {
  return number.toFixed(2);
}


/**
 * Handles the scroll event to toggle the "sticky" class on the navigation container.
 * 
 * This function is triggered whenever the user scrolls. It checks the scroll position
 * of the window (`window.scrollY`) and adds or removes the "sticky" class to/from the
 * navigation container element with the ID "navContainer".
 * 
 * @function
 */
window.onscroll = function () {
  let navContainer = document.getElementById("navContainer");
  if (window.scrollY > 592) {
    navContainer.classList.add("sticky");
  } else {
    navContainer.classList.remove("sticky");
  }
};


/**
 * Toggles the active state of delivery and pickup buttons.
 * 
 * This function adds the "active-button" class to the clicked button and removes it from all other buttons.
 * It also triggers the rendering of the basket, the responsive basket button, and changes the style of delivery and pickup options.
 * 
 * @param {HTMLElement} clickedButton - The button element that was clicked.
 */
function toggleButton(clickedButton) {
  let buttons = document.querySelectorAll(".delivery-pickup button");
  buttons.forEach((button) => {
    if (button === clickedButton) {
      button.classList.add("active-button");
    } else {
      button.classList.remove("active-button");
    }
  });
  renderBasket();
  renderResponsiveBasketButton();
  changestyleDeliveryPickup();
}


/**
 * Toggles the visibility of the delivery and pickup elements based on the state of the pickup button.
 * 
 * This function retrieves the elements with IDs "location" and "minOrderDeliveryCost" and toggles
 * the "d-none" class on them. The "d-none" class is added or removed based on the return value of
 * the `pickUpButtonActive` function.
 */
function changestyleDeliveryPickup() {
  let location = document.getElementById("location");
  let minOrderDelivery = document.getElementById("minOrderDeliveryCost");

  minOrderDelivery.classList.toggle("d-none", pickUpButtonActive());
  location.classList.toggle("d-none", !pickUpButtonActive());
}


/**
 * Toggles the visibility of the responsive basket and the scrollbar on the body.
 * 
 * This function adds or removes the "show-responsive-basket" class on the element
 * with the ID "sideBasket" to show or hide the responsive basket. It also toggles
 * the "remove-scrollbar" class on the body element to enable or disable the scrollbar.
 */
function toggleResponsiveBasket() {
  let responsiveBasket = document.getElementById("sideBasket");
  let body = document.body;

  responsiveBasket.classList.toggle("show-responsive-basket");
  body.classList.toggle("remove-scrollbar");
}

/**
 * Handles the resize event to adjust the visibility of the side basket
 * and toggle the scrollbar based on the window width.
 * 
 * This function is triggered whenever the browser window is resized. If the
 * window width exceeds 1025 pixels, it removes the "show-responsive-basket" 
 * class from the element with the ID "sideBasket" and the "remove-scrollbar"
 * class from the `<body>` element.
 * 
 * @function
 */
window.onresize = function () {
  let responsiveBasket = document.getElementById("sideBasket");
  let body = document.body;

  if (window.innerWidth > 1025) {
    responsiveBasket.classList.remove("show-responsive-basket");
    body.classList.remove("remove-scrollbar");
  }
};


/**
 * Toggles the visibility of the order popup and handles the responsive basket display.
 * 
 * This function performs the following actions:
 * 1. Retrieves the order popup element by its ID "orderPopup".
 * 2. Retrieves the responsive basket element by its ID "sideBasket".
 * 3. Retrieves the body element.
 * 4. If the responsive basket is currently shown (has the class "show-responsive-basket"),
 *    it removes this class and also removes the "remove-scrollbar" class from the body.
 * 5. Toggles the "display-none" class on the order popup element to show or hide it.
 */
function openPopup() {
  let orderPopup = document.getElementById("orderPopup");
  let responsiveBasket = document.getElementById("sideBasket");
  let body = document.body;

  if (responsiveBasket.classList.contains("show-responsive-basket")) {
    responsiveBasket.classList.remove("show-responsive-basket");
    body.classList.remove("remove-scrollbar");
  }
  orderPopup.classList.toggle("display-none");
}


/**
 * Toggles the visibility of the order popup by adding or removing the "display-none" class.
 */
function closePopup() {
  let orderPopup = document.getElementById("orderPopup");
  orderPopup.classList.toggle("display-none");
}


/**
 * Prevents the event from propagating (bubbling up) the DOM tree.
 *
 * @param {Event} event - The event object that triggered the function.
 */
function doNotClose(event) {
  event.stopPropagation();
}
