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

function renderResponsiveBasketButton() {
  let deliveryFee = twoDecimals(5.0);
  let subTotalPrice = calcTotalBasketPrice();
  let totalPrice = twoDecimals(+subTotalPrice + +deliveryFee);
  let totalPricenoDelivery = twoDecimals(+subTotalPrice);
  let responsiveBasketButton = document.getElementById("responsiveBasketButton");

  responsiveBasketButton.innerHTML = generateResponsiveBasketButton(subTotalPrice,totalPrice,totalPricenoDelivery);
}

function generateResponsiveBasketButton(subTotalPrice, totalPrice, totalPricenoDelivery) {
  if (subTotalPrice < 15) {
    return responsiveBasketButtonNoDeliveryHtml(totalPricenoDelivery);
  }
  if (pickUpButtonActive()) {
    return responsiveBasketButtonPickUpHtml(subTotalPrice);
  }
  return responsiveBasketButtonDeliveryHtml(totalPrice);
}

function pickUpButtonActive() {
  let pickUpButton = document.getElementById("pickUpButton");
  return pickUpButton.classList.contains("active-button");
}

function generatePickUpOrder() {
  let subTotalPrice = calcTotalBasketPrice();
  let totalPricenoDelivery = twoDecimals(+subTotalPrice);
  return generatePickUpOrderHtml(subTotalPrice, totalPricenoDelivery);
}

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

// basket array PART //

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

function addDishToBasket(dish) {
  basket[0].dishTitles.push(dish.name);
  basket[0].dishIngredients.push(dish.ingredients);
  basket[0].dishPrices.push(dish.price);
  basket[0].totalPrices.push(dish.price);
  basket[0].amounts.push(1);
}

function getBasketIndex(dishName) {
  let basketIndex = basket[0].dishTitles.indexOf(dishName);
  return basketIndex;
}

function increaseDishAmount(basketIndex) {
  basket[0].amounts[basketIndex]++;
  calcSingleDishTotalPrice(basketIndex);
  renderBasket();
  renderResponsiveBasketButton();
}

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

function deleteDishFromBasket(basketIndex) {
  basket[0].dishTitles.splice(basketIndex, 1);
  basket[0].dishIngredients.splice(basketIndex, 1);
  basket[0].dishPrices.splice(basketIndex, 1);
  basket[0].totalPrices.splice(basketIndex, 1);
  basket[0].amounts.splice(basketIndex, 1);
}

function calcSingleDishTotalPrice(basketIndex) {
  basket[0].totalPrices[basketIndex] = twoDecimals(
    basket[0].amounts[basketIndex] * basket[0].dishPrices[basketIndex]
  );
}

function calcTotalBasketPrice() {
  let totalBasketPrice = 0;
  let totalPrices = basket[0].totalPrices;

  for (let number = 0; number < totalPrices.length; number++) {
    totalBasketPrice += +totalPrices[number];
  }
  return twoDecimals(totalBasketPrice);
}

function calcMinimumValueOrder() {
  let subTotal = calcTotalBasketPrice();
  let minimumOrderValue = +15;
  let remainingSum = minimumOrderValue - subTotal;
  return twoDecimals(remainingSum);
}

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

function twoDecimals(number) {
  return number.toFixed(2);
}

//change style//

window.onscroll = function () {
  let navContainer = document.getElementById("navContainer");
  if (window.scrollY > 592) {
    navContainer.classList.add("sticky");
  } else {
    navContainer.classList.remove("sticky");
  }
};

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

function changestyleDeliveryPickup() {
  let location = document.getElementById("location");
  let minOrderDelivery = document.getElementById("minOrderDeliveryCost");

  minOrderDelivery.classList.toggle("d-none", pickUpButtonActive());
  location.classList.toggle("d-none", !pickUpButtonActive());
}

function toggleResponsiveBasket() {
  let responsiveBasket = document.getElementById("sideBasket");
  let body = document.body;

  responsiveBasket.classList.toggle("show-responsive-basket");
  body.classList.toggle("remove-scrollbar");
}

window.onresize = function () {
  let responsiveBasket = document.getElementById("sideBasket");
  let body = document.body;

  if (window.innerWidth > 1025) {
    responsiveBasket.classList.remove("show-responsive-basket");
    body.classList.remove("remove-scrollbar");
  }
};

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

function closePopup() {
  let orderPopup = document.getElementById("orderPopup");
  orderPopup.classList.toggle("display-none");
}

function doNotClose(event) {
  event.stopPropagation();
}
