// This is where your JS goes!

// You can fetch data from https://cs571api.cs.wisc.edu/rest/f24/ice/chili
// When you are complete, you should also be able to fetch data from...
//  https://cs571api.cs.wisc.edu/rest/f24/ice/pasta
//  https://cs571api.cs.wisc.edu/rest/f24/ice/pizza

// let reviewNum = 0;

// const BASE_AMNS = [1, 15, 14.5, 2, 1, 1, 1];
// const REVIEWS = [
//   "A burst of warmth and flavor in every spoonful; simple yet irresistible!",
//   "The perfect blend of spice and comfort, an easy go-to chili recipe.",
//   "Loved the hearty texture and rich taste - a new family favorite!",
//   "Quick, flavorful, and satisfying - this chili hits all the right notes!",
// ];

// // TODO Implement the update yield!
// function updateYield() {
//   // alert("I should update the yield!");
//   const numServings = parseInt(
//     document.getElementById("serving-selector").value
//   );
//   //console.log(typeof numServings);
//   const rows = document
//     .getElementById("ingredients-body")
//     .getElementsByTagName("tr");
//   //console.log(rows);
//   for (i = 0; i < rows.length; i++) {
//     const ingrAmountHTML = rows[i].getElementsByTagName("td")[0];
//     //console.log(ingrAmountHTML);
//     ingrAmountHTML.innerText = numServings * BASE_AMNS[i];
//   }
// }

// // TODO Fix the reviews!
// function displayReview() {
//   alert(REVIEWS[reviewNum]);
//   reviewNum = (reviewNum + 1) % REVIEWS.length;
// }

let baseAmounts = [];
let reviewNum = 0;
let recipe;

function updateRecipe() {
  const selectedRecipe = document.getElementById("recipe-selector").value;
  // console.log(selectedRecipe);

  fetch("https://cs571.org/rest/f24/ice/" + selectedRecipe, {
    method: "GET",
    headers: {
      "X-CS571-ID": CS571.getBadgerId(),
    },
  })
    .then((res) => {
      // console.log(res.status);
      return res.json();
    })
    .then((data) => {
      recipe = JSON.parse(JSON.stringify(data)); //make a copy of the recipe available everywhere

      console.log(data);

      //Set the name and author
      const nameHTML = document.getElementById("recipe-name");
      nameHTML.innerText = data.name;

      const authorHTML = document.getElementById("recipe-author");
      authorHTML.innerText = "by" + data.author;

      //Set the image
      const imageHTML = document.getElementById("recipe-img");
      imageHTML.src = data.img.location;
      imageHTML.alt = data.img.description;

      //Set the instructions
      const instructionsHTML = document.getElementById("instructions");
      instructionsHTML.innerHTML = ""; //clear out any existing instructions
      for (let step of data.recipe) {
        const node = document.createElement("li");
        node.innerText = step;
        instructionsHTML.appendChild(node);
      }

      //Set the ingredients
      const ingredientsHTML = document.getElementById("ingredients-body");
      ingredientsHTML.innerHTML = ""; //clear out any existing ingredients

      baseAmounts = []; //as well as any existing base amounts
      const ingredientsNames = Object.keys(data.ingredients);
      // console.log(ingredientsNames);

      for (let ingrName of ingredientsNames) {
        let ingredient = data.ingredients[ingrName];
        //console.log(ingredient);

        const ingredientRowHTML = document.createElement("tr");
        const ingredientAmountHTML = document.createElement("td");
        const ingredientUnitHTML = document.createElement("td");
        const ingredientNameHTML = document.createElement("td");

        baseAmounts.push(ingredient.amount);

        ingredientAmountHTML.innerText = ingredient.amount;
        if (ingredient.unit) {
          ingredientUnitHTML.innerText = ingredient.unit;
        }
        if (ingredient.misc) {
          ingredientNameHTML.innerText = ingrName + "(" + ingredient.misc + ")";
        } else {
          ingredientNameHTML.innerText = ingrName;
        }

        ingredientRowHTML.appendChild(ingredientAmountHTML);
        ingredientRowHTML.appendChild(ingredientUnitHTML);
        ingredientRowHTML.appendChild(ingredientNameHTML);
        ingredientsHTML.appendChild(ingredientRowHTML);
      }
    });
}

function updateYield() {
  if (!recipe) {
    alert("I'm still loading the recipe!");
  } else {
    const numServings = parseInt(
      document.getElementById("serving-selector").value
    );
    const rows = document
      .getElementById("ingredients-body")
      .getElementsByTagName("tr");
    for (let index = 0; index < rows.length; index++) {
      const ingreAmountHTML = rows[index].getElementsByTagName("td")[0];
      ingreAmountHTML.innerText = baseAmounts[index] * numServings;
    }
  }
}

function displayReview() {
  if (!recipe) {
    alert("I'm still loading the recipe!");
  } else {
    let reviews = recipe.reviews;
    alert(reviews[reviewNum].txt);
    reviewNum = (reviewNum + 1) % reviews.length;
  }
}

//run updateRecipe on script load
updateRecipe();
