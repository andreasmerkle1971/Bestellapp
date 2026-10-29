function formatPrice(price) {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
}

function setTemplateCategory(categoryId, iconPath, category) {
    const title = category.replace(
        /\(.*\)/,
        '<span class="category-size">$&</span>',
    ); // kann jetzt separat zuweisen
    return /*HTML*/ `
            <div  id="${categoryId}-container"> 
            <div class="meal-category">
            <img src="${iconPath}" alt="foto ${category}">
            <h2 >${title}</h2>
            </div>
        </div>`;
}

function setTemplateMeals(meal, category) {
    const amount = getBasketAmount(meal.id);
    const label = amount > 0 ? `Added ${amount}` : "Add to basket";
    return /*html*/ `
        <div class="dish">
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
                        <button onclick="addToBasket('${category}', ${meal.id})">${label}</button>
                    </div>
                </div>
        </div>`;
}

function setTemplateBasketMeals(dish) {
    const isOnlyOne = dish.amount === 1; // summe im warenkorb
    const trashTop = isOnlyOne
        ? ""
        : `<button class="trash-top" onclick="removeFromBasket(${dish.id})"><img src="./assets/icons/delete.svg" alt="Löschen"></button>`;
    //linker button unten links bei der Anzahl, sonst Minuszeichen
    const leftButton = isOnlyOne
        ? `<button class="icon-btn" onclick="removeFromBasket(${dish.id})"><img src="./assets/icons/delete.svg" alt="Löschen"></button>`
        : `<button class="icon-btn" onclick="decreaseAmount(${dish.id})"><img src="./assets/icons/-.svg" alt="Weniger"></button>`;
    return `
   
        <div class="basket-meal-card">
            <div class="basket-meal-top">
            <span>${dish.amount}x ${dish.name}</span>
            ${trashTop}
            </div>
        <div class="basket-meal-controls">
            <div class="basket-amount"> ${leftButton}
                <span>${dish.amount}</span>
                <button class="icon-btn" onclick="increaseAmount(${dish.id})"><img src="./assets/icons/+.svg" alt="Mehr"></button>
                </div>
                <span>${formatPrice(dish.price * dish.amount)}</span>
        </div>
        </div>
    

        `;
}

function setTemplateOrderTotal(totalPrice) {
    return `
    <div class="basket-footer">
        <div class="basket-total">
            <div class="total-order-section">
            <span>Subtotal:</span>
            <span>${formatPrice(totalPrice)}</span>
            </div>
            <div class="total-order-section">
            <span>Delivery fee:</span>
            <span>${formatPrice(DELIVERY_FEE)}</span>
            </div>
                    <hr> 
                        <div class="total-order-section total-price">
                            <strong>Total:</strong>
                            <strong>${formatPrice(totalPrice + DELIVERY_FEE)}</strong>
                        </div>
            </div>
            <div onclick="order()" class="order-button">
                <p>Buy now (${formatPrice(totalPrice + DELIVERY_FEE)})</p>
        </div>
    </div>
        `;
}

function setTemplateOrderConfirmed() {
    return /*HTML*/ `
    <div class="modal-overlay" onclick="closeDialog()"> 
    <div class="dialog" onclick="event.stopPropagation()">
        <button class="dialog-close" onclick="closeDialog()" aria-label="Schließen"><img src="./assets/icons/close.svg" alt=""></button>
    
    <img src="./assets/icons/ordered.svg" alt="bestellt">
    <h2>Order Confirmed!</h2>
    <h3>Your food is on the way!</h3>
    </div>    
    </div>    
    
    `;
}

function setTemplateEmptyBasket() {
    //so sieht der leere Warenkorb aus
    return `
    <div class="basket-empty"> 
        <h2>Your Basket</h2>
        <p>Nothing here yet. Go ahead and choose something delicious!</p>
        <img src="./assets/icons/shopping_cart.svg" alt="Leerer Warenkorb">
        </div>
        `;
}
