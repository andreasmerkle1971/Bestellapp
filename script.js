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
        "Salad": "./assets/icons/Salad.svg"
    }
    for (const category in myDishes) {
        // Die Schleife geht durch alle Kathegorien in einem Objekt, in jedem Durchgang erhält category den Namen der Kategorie.
        
        const iconPath = categoryIcons[category];
        const categoryId = category.replace(/[^a-zA-Z0-9]/g, '-'); // damit das Objekt korrekt angezeigt wird mit Sonderzeichen
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

    if (existingMeal){
        existingMeal.amount++; // Anzahl im Warenkorb wird erhöht
    }else {
        basketDishes.push({ ...meal, amount: 1 }); // Meal wird neu hinzugefügt
   }

    renderBasket();
}


function renderBasket() {

    const basketContainer = document.getElementById('basket')
    document.getElementById('basket').innerHTML = '';
    basketContainer.innerHTML = ''; // Container leeren

        for (const dish of basketDishes) {
        basketContainer.innerHTML += `
        <div>
        <span>${dish.name}</span>
        <span>${dish.Price}</span>
        <span>${dish.amount}</span>
        </div>
        `;
    }
}
//     // Declarierung der Funktion render Basket
//     for (const category in myDishes) {
//         // Die Schleife geht durch alle Kathegorien in einem Objekt, in jedem Durchgang erhält category den Namen der Kategorie.
        
//         const iconPath = categoryIcons[category];
//         const categoryId = category.replace(/[^a-zA-Z0-9]/g, '-');
//         document.getElementById("myDishes").innerHTML +=
//             // sucht myDishes nimmt HTML Element und fügt was neues hinzu
//             `
//             <div  id="${categoryId}-container"> 
//             <div class="meal-category">
//             <img src="${iconPath}" alt="foto ${category}">
//             <h2 >${category}</h2>
            
//             </div>
//         </div>`;

//         for (const meal of myDishes[category]) {
//             document.getElementById(categoryId + "-container").innerHTML +=
//                 /*html*/ `
//     <div class="meal-section">
//         <div class="dish" id="${meal.name}-container">
//                 <div>
//                     <img src="${meal.image}" alt="${meal.name}">
//                 </div>
//                 <div class="meal-text">
//                 <div>
                    
//                         <h3>${meal.name}</h3>
//                         <p>${meal.description}</p>
                    
//                         </div>
//                         <div class="order">
//                         <p class="price">${formatPrice(meal.price)}</p>
//                         <button onclick="order-button">Add to basket</button>
//                         </div>
//                         </div>
//         </div>
//     </div>`;
//         }
//     }
// }
