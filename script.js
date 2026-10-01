function init() { // Bilder aus Array holen und im HTML aufbauen
    renderMeals();
}
function renderMeals() {
    console.log(meals);
    for (const category in meals) {
        document.getElementById('meals').innerHTML += /*html*/ `
        <div class="meal-category" id="${category}-container">
            <h2>${category}</h2>

        </div>`;

        for (const meals of meals[category]) {
            document.getElementById(category + '-container').innerHTML +=
                /*html*/ `
        <div class="dish" id="${meal}-container">
        span></span>
        </div>`;
        }
    }
}
