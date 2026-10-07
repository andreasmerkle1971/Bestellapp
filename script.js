function init() {
    // Bilder aus Array holen und im HTML aufbauen
    renderMeals();
}
function renderMeals() {
    // Declarierung der Funktion render Meals
    console.log(myDishes); // Prüfung der funktion, ob die Daten überhaupt da sind
    for (const name in myDishes) {
        // Die Schleife geht durch alle Kathegorien in einem Objekt, in jedem Durchgang erhält category den Namen der Kategorie.
        document.getElementById('myDishes').innerHTML +=
            // sucht myDishes nimmt HTML Element und fügt was neues hinzu
            `<div class="meal-category" id="${name}-container"> 
            <h2>${name}</h2>
        </div>`;

        for (const meal of myDishes[name]) {
            document.getElementById(name + "-container").innerHTML += /*html*/ `
        <div class="dish" id="${meal.name}-container">
        <span>${meal.name}</span>
        <br>
        <span>${meal.price}</span>
        </div>`;
        }
    }
}
