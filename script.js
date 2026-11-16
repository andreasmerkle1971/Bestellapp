const DELIVERY_FEE = 4.99;

function formatPrice(price) {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
}

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
        document.getElementById("myDishes").innerHTML += setTemplateCategory(
            categoryId,
            iconPath,
            category,
            getCategoryTitle(category),
        );
        for (const meal of myDishes[category]) {
            document.getElementById(categoryId + "-container").innerHTML +=
                setTemplateMeals(getMealViewData(meal), category);
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
    for (const dish of basketDishes) {
        mealsHtml += setTemplateBasketMeals(getBasketMealViewData(dish));
    }
    basketContainer.innerHTML = `
    <h2>Your Basket</h2>
    <div class="basket-items">${mealsHtml}</div>
    ${setTemplateOrderTotal(getTotalsViewData())}`;
}

function calcPrice() {
    let total = 0;
    for (const dish of basketDishes) {
        total += dish.price * dish.amount;
    }
    return total;
}

function getTotalsViewData() {
    const subtotal = calcPrice();
    const total = subtotal + DELIVERY_FEE;
    return {
        subtotalText: formatPrice(subtotal),
        deliveryText: formatPrice(DELIVERY_FEE),
        totalText: formatPrice(total),
    };
}

function updateCounterBasketFooter() {
    let count = 0;
    for (const dish of basketDishes) {
        count += dish.amount;
    }
    const countBasketFooter = document.getElementById("count-basket-footer");
    countBasketFooter.textContent = count > 0 ? count : "";
}

function updateMealButton(id) {
    const btn = document.getElementById(`meal-btn-${id}`);
    if (!btn) return;
    btn.textContent = getMealLabel(id);
}

function updateTotals() {
    const t = getTotalsViewData();
    document.getElementById("basket-subtotal").textContent = t.subtotalText;
    document.getElementById("basket-total").textContent = t.totalText;
    document.getElementById("basket-buy-text").textContent =
        `Buy now (${t.totalText})`;
    updateCounterBasketFooter();
}

function updateBasketNumbers(id) {
    const dish = basketDishes.find((d) => d.id === id); //sucht Gericht
    if (!dish) return; // Abbruch, wenn keins existiert
    if (dish.amount <= 2) {
        // Position des Löschen buttons oben rechts geht in beide Richtungen
        document.getElementById(`basket-meal-${id}`).innerHTML =
            setTemplateBasketMealInner(getBasketMealViewData(dish));
    } else {
        document.getElementById(`basket-title-amount-${id}`).textContent =
            dish.amount;
        document.getElementById(`basket-amount-${id}`).textContent =
            dish.amount;
        document.getElementById(`basket-price-${id}`).textContent = formatPrice(
            dish.price * dish.amount,
        );
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
    updateBasketNumbers(id); // nur Zahlen
}

function getBasketAmount(id) {
    const dish = basketDishes.find((item) => item.id === id);
    return dish ? dish.amount : 0;
}

function getMealLabel(id) {
    const amount = getBasketAmount(id);
    return amount > 0 ? `Added ${amount}` : "Add to basket";
}

function getMealViewData(meal) {
    return {
        ...meal,
        priceText: formatPrice(meal.price),
        label: getMealLabel(meal.id),
    };
}

function getCategoryTitle(category) {
    return category.replace(/\(.*\)/, '<span class="category-size">$&</span>'); // 30cm Problem
}

function getBasketMealViewData(dish) {
    // prüfe die Summe
    const isOnlyOne = dish.amount === 1;
    return {
        id: dish.id,
        name: dish.name,
        amount: dish.amount,
        priceText: formatPrice(dish.price * dish.amount),
        trashTopHtml: isOnlyOne ? "" : setTemplateTrashTop(dish.id),
        leftAction: isOnlyOne ? "removeFromBasket" : "decreaseAmount",
        leftIcon: isOnlyOne ? "delete.svg" : "-.svg",
        leftAlt: isOnlyOne ? "Löschen" : "Weniger",
    };
}

function removeFromBasket(id) {
    basketDishes = basketDishes.filter((dish) => dish.id !== id);
    renderBasket();
    updateMealButton(id);
}

function toggleBasket(event) {
    // Basket kann ein und ausgeblendet werden
    event.preventDefault();
    document.querySelector(".content-basket").classList.toggle("open");
}

function updateView() {
    renderMeals();
    renderBasket();
}

function order() {
    basketDishes = []; // leert den Warenkorb nach dem Bestellen
    updateView();
    document.querySelector(".content-basket").classList.remove("open"); // läßt Warenkorb verschwinden
    document.getElementById("orderConfirmed").innerHTML =
        setTemplateOrderConfirmed();
}

function closeDialog() {
    document.getElementById("orderConfirmed").innerHTML = "";
}
