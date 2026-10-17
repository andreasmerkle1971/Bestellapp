const DELIVERY_FEE = 4.99;

const CATEGORY_ICONS = {
    "Burger & Sandwiches": "./assets/icons/Burger.svg",
    "Pizza (30cm)": "./assets/icons/Pizza.svg",
    Salad: "./assets/icons/Salad.svg",
};
function init() {
    renderMeals();
}

//==================================  Speisekarte  ===============================================================================

function renderMeals() {
    for (const category in myDishes) {
        const iconPath = CATEGORY_ICONS[category];
        const categoryId = category.replace(/[^a-zA-Z0-9]/g, "-"); // damit die ID korrekt ist, werden die Sonderzeichen ersetzt
        document.getElementById("myDishes").innerHTML += setTemplateCategory(categoryId, iconPath, category);
        for (const meal of myDishes[category]) {
            document.getElementById(categoryId + "-container").innerHTML += setTemplateMeals(meal, category);
        }
    }
}

function addToBasket(category, name) {
    const meal = myDishes[category].find((dish) => dish.name === name); // sucht aus dem Json
    const existingMeal = basketDishes.find((dish) => dish.name === name); //prüft, ob schon vorhanden
    if (existingMeal) {
        existingMeal.amount++; // Anzahl im Warenkorb wird erhöht
    } else {
        basketDishes.push({ ...meal, amount: 1 }); // Meal wird neu hinzugefügt
    }
    renderBasket();
}

function renderBasket() {
    const basketContainer = document.getElementById("basket");
    document.getElementById("basket").innerHTML = "";
    if (basketDishes.length === 0) {
        basketContainer.innerHTML = "<div>Your basket is empty</div>";
        return;
    }
    basketContainer.innerHTML = "<h2>Your Basket</h2>"; // Überschrift der Bestellung
    for (const dish of basketDishes) {
        basketContainer.innerHTML += `
        <div>
        <span>${dish.name}</span>
        <br>
        <button onclick="decreaseAmount('${dish.name}')">-</button>
        <span>${dish.amount} x</span>
        <button onclick="increaseAmount('${dish.name}')">+</button>
        <span>${formatPrice(dish.price)}</span>
        </div>
        `;
    }
    const totalPrice = calcPrice();
    basketContainer.innerHTML += `
        <div class="basket-total">
        <div>Subtotal: ${formatPrice(totalPrice)}</div>
        <div>Delivery fee: ${formatPrice(DELIVERY_FEE)}</div>
        <br>
        <hr>  <!-- Trennlinie -->
        <br>
        <div class="total-price">
        <strong>Total:</strong>
        <strong>${formatPrice(totalPrice + DELIVERY_FEE)}</strong>
        </div>
        <button onclick="order()">order</button>
        </div>`;
}

function calcPrice() {
    let total = 0;
    for (const dish of basketDishes) {
        total += dish.price * dish.amount;
    }
    return total;
}

function increaseAmount(name) {
    // erhöhen der Anzahl
    const dish = basketDishes.find((dish) => dish.name === name);
    if (dish) {
        dish.amount++;
    }
    renderBasket();
}

function decreaseAmount(name) {
    // verringern der Anzahl
    const dish = basketDishes.find((dish) => dish.name === name);
    if (dish) {
        dish.amount--;
        if (dish.amount === 0) {
            basketDishes = basketDishes.filter((d) => d.name !== name);
        }
    }
    renderBasket();
}

function order() {
    basketDishes = [];
    const basketContainer = document.getElementById("basket");
    basketContainer.innerHTML = "<div>Thanks for order</div>";
}
