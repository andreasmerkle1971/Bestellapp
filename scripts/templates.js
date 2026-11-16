function setTemplateCategory(categoryId, iconPath, category, title) {
    return /*HTML*/ `
        <div id="${categoryId}-container">
            <div class="meal-category">
                <img src="${iconPath}" alt="foto ${category}">
                <h2>${title}</h2>
            </div>
        </div>`;
}

function setTemplateMeals(meal, category) {
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
                    <p class="price">${meal.priceText}</p>
                    <button id="meal-btn-${meal.id}" onclick="addToBasket('${category}', ${meal.id})">${meal.label}</button>
                </div>
            </div>
        </div>`;
}

function setTemplateBasketMeals(d) {
    // äußerer Rahmen des Baskets
    return /*html*/ `<div class="basket-meal-card" id="basket-meal-${d.id}">${setTemplateBasketMealInner(d)}</div>`;
}

function setTemplateTrashTop(id) {
    return /*HTML*/ `
        <button class="trash-top" onclick="removeFromBasket(${id})">
            <img src="./assets/icons/delete.svg" alt="Löschen">
        </button>`;
}

function setTemplateBasketMealInner(d) {
    // innerer Bereich, getrennt für gezielte Updates
    return /*HTML*/ `
        <div class="basket-meal-top">
            <span><span id="basket-title-amount-${d.id}">${d.amount}</span>x ${d.name}</span>
            ${d.trashTopHtml}
        </div>
        <div class="basket-meal-controls">
            <div class="basket-amount">
                <button class="icon-btn" onclick="${d.leftAction}(${d.id})">
                    <img src="./assets/icons/${d.leftIcon}" alt="${d.leftAlt}">
                </button>
                <span id="basket-amount-${d.id}">${d.amount}</span>
                <button class="icon-btn" onclick="increaseAmount(${d.id})">
                    <img src="./assets/icons/+.svg" alt="Mehr">
                </button>
            </div>
            <span id="basket-price-${d.id}">${d.priceText}</span>
        </div>`;
}

function setTemplateOrderTotal(t) {
    return /*HTML*/ `
    <div class="basket-footer">
        <div class="basket-total">
            <div class="total-order-section">
                <span>Subtotal:</span>
                <span id="basket-subtotal">${t.subtotalText}</span>
            </div>
            <div class="total-order-section">
                <span>Delivery fee:</span>
                <span>${t.deliveryText}</span>
            </div>
            <hr>
            <div class="total-order-section total-price">
                <strong>Total:</strong>
                <strong id="basket-total">${t.totalText}</strong>
            </div>
        </div>
        <div onclick="order()" class="order-button">
            <p id="basket-buy-text">Buy now (${t.totalText})</p>
        </div>
    </div>`;
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
    return /*HTML*/ `
    <div class="basket-empty"> 
        <h2>Your Basket</h2>
        <p>Nothing here yet. Go ahead and choose something delicious!</p>
        <img src="./assets/icons/shopping_cart.svg" alt="Leerer Warenkorb">
        </div>
        `;
}
