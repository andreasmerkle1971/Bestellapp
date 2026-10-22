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
    const leftButton =isOnlyOne
        ?`<button class="icon-btn" onclick="removeFromBasket(${dish.id})"><img src="./assets/icons/delete.svg" alt="Löschen"></button>`
        : `<button class="icon-btn" onclick="decreaseAmount(${dish.id})"><img src="./assets/icons/-.svg" alt="Weniger"></button>`;
        return `
    <div class="basket-meal-card">
    <div class="basket-meal-top">
    <div>
        <span>${dish.amount}x </span>
        <span>${dish.name}</span>
        </div>
              ${trashTop}
        </div>
        <div class="basket-meal-controls">${leftButton}
            <span>${dish.amount}</span>
            <button class="icon-btn" onclick="increaseAmount(${dish.id})"><img src="./assets/icons/+.svg" alt="Mehr"></button>
            <span>${formatPrice(dish.price*dish.amount)}</span>
            </div>
        </div>
        `;
}

function setTemplateOrderTotal(totalPrice) {
    return `
        <div class="basket-total">
        <div>Subtotal: ${formatPrice(totalPrice)}</div>
        <div>Delivery fee: ${formatPrice(DELIVERY_FEE)}</div>
        <hr> 
        <div class="total-price">
        <strong>Total:</strong>
        <strong>${formatPrice(totalPrice + DELIVERY_FEE)}</strong>
        </div>
        <button onclick="order()">buy now (${formatPrice(totalPrice + DELIVERY_FEE)})</button>
        </div>`;
}

function setTemplateOrderConfirmed() {
    return /*HTML*/ `
    <div class="modal-overlay" onclick="closeDialog()"> 
    <div class="dialog" onclick="event.stopPropagation()">
    <h2>Order Confirmed!</h2>
    <h3>Your food is on the way!</h3>
    <button onclick="closeDialog()">Close</button>
    </div>    
    </div>    
    
    `;
}

function setTemplateEmptyBasket(){ //so sieht der leere Warenkorb aus
    return `
        <h2>Your Basket</h2>
        <p>Nothing here yet. Go ahead and choose something delicious!</p>
        <img src="./assets/icons/shopping_cart.svg" alt="Leerer Warenkorb">`;

}