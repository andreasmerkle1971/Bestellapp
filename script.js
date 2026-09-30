function init() {
    renderMeals();
}
function renderMeals() {
    console.log(myDishes);
    for (const category in myDishes) {
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
