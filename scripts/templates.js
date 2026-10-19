function formatPrice(price) {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
}

function setTemplateCategory(categoryId, iconPath, category) {
    const title = category.replace(/\(.*\)/, '<span class="category-size">$&</span>');  // kann jetzt separat zuweisen
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
    <div class="meal-section">
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
        </div>
    </div>`;
}

function setTemplateBasketMeals(dish){
    return `
        <div>
        <span>${dish.name}</span>
        <br>
        <button onclick="decreaseAmount(${dish.id})">-</button>
        <span>${dish.amount} x</span>
        <button onclick="increaseAmount(${dish.id})">+</button>
        <span>${formatPrice(dish.price)}</span>
        <button onclick="removeFromBasket(${dish.id})">del</button>
        </div>
        `;
}

function setTemplateOrderTotal(totalPrice){
return  `
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

function setTemplateOrderConfirmed(){
    return /*HTML*/ `
    <div class="modal-overlay" onclick="closeDialog()"> 
    <div class="dialog" onclick="event.stopPropagation()">
    <h2>Order Confirmed!</h2>
    <h3>Your food is on the way!</h3>
    <button onclick="closeDialog()">Close</button>
    </div>    
    </div>    
    
    `
}
