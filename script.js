function init() {
    // Bilder aus Array holen und im HTML aufbauen
    renderMeals();
}
function renderMeals() {
    // Declarierung der Funktion render Meals
    console.log(myDishes); // Prüfung der funktion, ob die Daten überhaupt da sind
    for (const category in myDishes) {
        // Die Schleife geht durch alle Kathegorien in einem Objekt, in jedem Durchgang erhält category den Namen der Kategorie.
        document.getElementById("myDishes").innerHTML +=
            // sucht myDishes nimmt HTML Element und fügt was neues hinzu
            `
            <div  id="${category}-container"> 
            <div class="meal-category">
            <img src="./assets/icons/Burger.png" alt="foto burger">
            <h2 >${category}</h2>
            
            </div>
        </div>`;

        for (const meal of myDishes[category]) {
            document.getElementById(category + "-container").innerHTML +=
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
                        <button onclick="order-button">Add to basket</button>
                        </div>
                        </div>
        </div>
    </div>`;
        }
    }
}
