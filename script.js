const DELIVERY_FEE = 4.99;

const CATEGORY_ICONS = {
    "Burger & Sandwiches": "./assets/icons/Burger.svg",
    "Pizza (30cm)": "./assets/icons/Pizza.svg",
    Salad: "./assets/icons/Salad.svg",
};
function init() {
    renderMeals();
    renderBasket();
}

//==================================  Speisekarte  ===============================================================================

function renderMeals() {
    document.getElementById("myDishes").innerHTML = ""; // geleert werden muss vor der Schleife
    for (const category in myDishes) {
        const iconPath = CATEGORY_ICONS[category];
        const categoryId = category.replace(/[^a-zA-Z0-9]/g, "-"); // damit die ID korrekt ist, werden die Sonderzeichen ersetzt
        document.getElementById("myDishes").innerHTML += setTemplateCategory(categoryId, iconPath, category);
        for (const meal of myDishes[category]) {
            document.getElementById(categoryId + "-container").innerHTML += setTemplateMeals(meal, category);
        }
    }
}

function addToBasket(category, id) {
    const meal = myDishes[category].find((dish) => dish.id === id); // sucht aus dem Json
    const existingMeal = basketDishes.find((dish) => dish.id === id); //prüft, ob schon vorhanden
    if (existingMeal) {
        existingMeal.amount++; // Anzahl im Warenkorb wird erhöht
    } else {
        basketDishes.push({ ...meal, amount: 1 }); // Meal wird neu hinzugefügt
    }
    updateView();
}

//==================================  Warenkorb  ===============================================================================

function renderBasket() {
    const basketContainer = document.getElementById("basket");
    if (basketDishes.length === 0) {
        basketContainer.innerHTML = setTemplateEmptyBasket();
        return;
    }
    basketContainer.innerHTML = "<h2>Your Basket</h2>"; // Überschrift der Bestellung
    for (const dish of basketDishes) {
        basketContainer.innerHTML += setTemplateBasketMeals(dish);
    }
    const totalPrice = calcPrice();
    basketContainer.innerHTML += setTemplateOrderTotal(totalPrice);
}

function calcPrice() {
    let total = 0;
    for (const dish of basketDishes) {
        total += dish.price * dish.amount;
    }
    return total;
}

function increaseAmount(id) {
    const dish = basketDishes.find((dish) => dish.id === id);
    if (dish) {
        dish.amount++;
    }
    updateView();
}

function decreaseAmount(id) {
    const dish = basketDishes.find((dish) => dish.id === id);
    if (dish) {
        dish.amount--;
        if (dish.amount === 0) {
            basketDishes = basketDishes.filter((d) => d.id !== id);
        }
    }
    updateView();
}

function getBasketAmount(id){
    const dish = basketDishes.find((item) => item.id === id);
    return dish ? dish.amount : 0;
}
function removeFromBasket(id){
    basketDishes = basketDishes.filter((dish) => dish.id !==id);
    updateView();
    }


function updateView(){
    renderMeals();
    renderBasket();
}
function order() {
    basketDishes = []; // leert den Warenkorb nach dem Bestellen
    updateView();
    document.getElementById("orderConfirmed").innerHTML = setTemplateOrderConfirmed();
}
function closeDialog(){
    document.getElementById("orderConfirmed").innerHTML = "";
}