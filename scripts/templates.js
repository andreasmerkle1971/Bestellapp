function formatPrice(price) {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
}

function setTemplateCategory(categoryId, iconPath, category) {
    return /*HTML*/ `
            <div  id="${categoryId}-container"> 
            <div class="meal-category">
            <img src="${iconPath}" alt="foto ${category}">
            <h2 >${category}</h2>
            </div>
        </div>`;
}

function setTemplateMeals(meal, category) {
    return /*html*/ `
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

function setTemplateBasket(){





    
}
