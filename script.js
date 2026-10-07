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
            `<div class="meal-category" id="${category}-container"> 
            <h2>${category}</h2>
        </div>`;

        for (const meal of myDishes[category]) {
            document.getElementById(category + "-container").innerHTML +=
                /*html*/ `
        <div class="dish" id="${meal.name}-container">
        <img src="${meal.image}" alt="${meal.name}">
        <div>
        <p>${meal.name}</p>
        <p>${meal.description}</p>
        <p>${meal.price}</p>
        <div>
        </div>`;
        }
    }
}
