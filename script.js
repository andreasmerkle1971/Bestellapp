const DELIVERY_FEE = 4.99;

function init() {
    // Bilder aus Array holen und im HTML aufbauen
    renderMeals();
}
function renderMeals() {
    // Declarierung der Funktion render Meals
    console.log(myDishes); // Prüfung der funktion, ob die Daten überhaupt da sind
    const categoryIcons = {
        "Burger & Sandwiches": "./assets/icons/Burger.svg",
        "Pizza (30cm)": "./assets/icons/Pizza.svg", //span entfernen, wenn keine Lösung
        Salad: "./assets/icons/Salad.svg",
    };
    for (const category in myDishes) {
        // Die Schleife geht durch alle Kathegorien in einem Objekt, in jedem Durchgang erhält category den Namen der Kategorie.
        const iconPath = categoryIcons[category];
        const categoryId = category.replace(/[^a-zA-Z0-9]/g, "-"); // damit das Objekt korrekt angezeigt wird mit Sonderzeichen
        document.getElementById("myDishes").innerHTML +=
            // sucht myDishes nimmt HTML Element und fügt was neues hinzu
            `
            <div  id="${categoryId}-container"> 
            <div class="meal-category">
            <img src="${iconPath}" alt="foto ${category}">
            <h2 >${category}</h2>
            
            </div>
        </div>`;
        for (const meal of myDishes[category]) {
            document.getElementById(categoryId + "-container").innerHTML +=
                /*html*/ `
    <div class="meal-section">
        <div class="dish" id="${meal.name}-container">
                <div>
                    <img src="${meal.image}" alt="${meal.name}">
                </div>
                <div class="meal-text">
                <div>
                    <h3>${meal.name}</h3>
                    <p>${meal.description}</p>
                </div>
                    <div class="order">
                        <p class="price">${formatPrice(meal.price)}</p>
                        <button onclick="addToBasket('${category}', '${meal.name}')">Add to basket</button>
                    </div>
                </div>
        </div>
    </div>`;
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
    document.getElementById("basket").innerHTML = ""; // Container leeren
    // basketContainer.innerHTML = ""; // ebenfalls Container leeren
    if (basketDishes.length === 0) {
        // leerer Warenkorb
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
