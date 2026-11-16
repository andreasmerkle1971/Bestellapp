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
        updateBasketNumbers(id); // nur die Zahlen werden aktualisiert
    } else {
        basketDishes.push({ ...meal, amount: 1 }); 
        renderBasket(); // rendern einer neuen Karte
        updateMealButton(id);
    }
}


//==================================  Warenkorb  ===============================================================================


function renderBasket() {
    updateCounterBasketFooter();
    const basketContainer = document.getElementById("basket");
    if (basketDishes.length === 0) {
        basketContainer.innerHTML = setTemplateEmptyBasket();
        return;
    }
    let mealsHtml = "";
    for (const dish of basketDishes){
        mealsHtml += setTemplateBasketMeals(dish);
    }


basketContainer.innerHTML = `
<h2>Your Basket</h2>
<div class="basket-items">${mealsHtml}</div>
${setTemplateOrderTotal(calcPrice())}`
    }

    
function calcPrice() {
        let total = 0;
        for (const dish of basketDishes) {
            total += dish.price * dish.amount;
        }
        return total;
    }

function updateMealButton(id) {
    const btn = document.getElementById(`meal-btn-${id}`);
    if(!btn) return; // Absicherung, falls Button nocht existiert, passiert nichts, keinen Fehler
    const amount = getBasketAmount(id);
    btn.textContent = amount > 0 ? `Added ${amount}` : "Add to basket";

}
    
function updateTotals(){ // alle Beträge im Footer mit ID's aktualisieren
    const subtotal = calcPrice();
    const total = subtotal + DELIVERY_FEE;
    document.getElementById("basket-subtotal").textContent = formatPrice(subtotal);
    document.getElementById("basket-total").textContent = formatPrice(total);
    document.getElementById("basket-buy-text").textContent = `Buy now (${formatPrice(total)})`;
    updateCounterBasketFooter();
}

function updateBasketNumbers(id) {
    const dish = basketDishes.find((d) => d.id === id); //sucht Gericht
    if (!dish) return; // Abbruch, wenn keins existiert
    if (dish.amount <= 2) { // Position des Löschen buttons oben rechts geht in beide Richtungen
        document.getElementById(`basket-meal-${id}`).innerHTML = setTemplateBasketMealInner(dish);
        } else {
            document.getElementById(`basket-title-amount-${id}`).textContent = dish.amount;
            document.getElementById(`basket-amount-${id}`).textContent = dish.amount;
            document.getElementById(`basket-price-${id}`).textContent = formatPrice(dish.price * dish.amount);
        }
        updateTotals();
        updateMealButton(id);

}

function increaseAmount(id) {
    const dish = basketDishes.find((dish) => dish.id === id);
if (!dish) return; // keine Fehler, wenn kein Gericht
    dish.amount++;
    updateBasketNumbers(id);
}


function decreaseAmount(id) {
    const dish = basketDishes.find((dish) => dish.id === id);
 if (!dish) return;
    dish.amount--;
    if (dish.amount === 0) {
        basketDishes = basketDishes.filter((d) => d.id !== id);
        renderBasket();         
        updateMealButton(id);
        return;
    }
    updateBasketNumbers(id);   // nur Zahlen
}


function getBasketAmount(id){
    const dish = basketDishes.find((item) => item.id === id);
    return dish ? dish.amount : 0;
}


function removeFromBasket(id){
    basketDishes = basketDishes.filter((dish) => dish.id !==id);
    renderBasket();
    updateMealButton(id);
    }


function toggleBasket(event){ // Basket kann ein und ausgeblendet werden
    event.preventDefault();
    document.querySelector(".content-basket").classList.toggle("open");
}


function updateView(){
    renderMeals();
    renderBasket();
    
}


function order() {
    basketDishes = []; // leert den Warenkorb nach dem Bestellen
    updateView();
    document.querySelector(".content-basket").classList.remove("open"); // läßt Warenkorb verschwinden
    document.getElementById("orderConfirmed").innerHTML = setTemplateOrderConfirmed();
}


function closeDialog(){
    document.getElementById("orderConfirmed").innerHTML = "";
}