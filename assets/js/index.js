// error section

const error = document.getElementById("error");
error.style.display = "none";

// loading spinner

const loadingSpinner = (show) => {
  if (show) {
    document.getElementById("spinner").style.display = "block";
  } else {
    document.getElementById("spinner").style.display = "none";
  }
};

// search drinks

document
  .getElementById("drinks__search__button")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const input = document.getElementById("drinks__search__input");
    const inputValue = input.value;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
    try {
      error.style.display = "none";
      const res = await fetch(url);
      const data = await res.json();
      displayDrinks(data.drinks);
    } catch {
      error.innerText = "Please Search a valid Drinks";
      error.style.color = "red";
      error.style.textAlign = "center";
      error.style.fontSize = "30px";
      error.style.fontWeight = 800;
      error.style.display = "block";
    }
    input.value = "";
  });

// fetch non alcoholic data

const fetchData = async () => {
  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
  loadingSpinner(true);
  const res = await fetch(url);
  const data = await res.json();
  displayDrinks(data.drinks);
};

// call function

fetchData();

// display non alcoholic drinks

const displayDrinks = (drinks) => {
  const drinksContainer = document.getElementById("drinks__container");
  drinksContainer.textContent = "";
  drinks.forEach((drink) => {
    const { strDrink, strDrinkThumb, idDrink } = drink;
    const drinksCard = document.createElement("div");
    drinksCard.setAttribute("class", "card");
    drinksCard.innerHTML = `
        <img src="${strDrinkThumb}" alt="${strDrink}" />
        <h3>${strDrink}</h3>
    `;
    drinksContainer.appendChild(drinksCard);
    loadingSpinner(false);
    drinksCard.addEventListener("click", async () => {
      loadingSpinner(true);
      const detailsUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
      const res = await fetch(detailsUrl);
      const data = await res.json();
      displayDetails(data.drinks[0]);
    });
  });
};

// display details function

const displayDetails = (drink) => {
  console.log(drink);
  const {
    strInstructions,
    strGlass,
    dateModified,
    strDrinkThumb,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strDrink,
  } = drink;
  const modalContainer = document.getElementById("drinks__detail");
  modalContainer.style.display = "block";
  const modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  modal.innerHTML = `
        <div class="modal__image">
          <button id="cross__icon">&times;</button>
          <img src="${strDrinkThumb}" alt="" />
        </div>
        <div class="modal__content">
          <h4>${strDrink}</h4>     
          <h4>Modified: ${dateModified} </h4>
          <p>${strInstructions}</p>    
          <h4>Glass: ${strGlass}</h4>
          <h4>Ingredients:</h4>
          <ul>
            <li>${strMeasure1 ? strMeasure1 : ""} ${strIngredient1 ? strIngredient1 : ""}</li>
            <li>${strMeasure2 ? strMeasure2 : ""} ${strIngredient2 ? strIngredient2 : ""}</li>
            <li>${strMeasure3 ? strMeasure3 : ""} ${strIngredient3 ? strIngredient3 : ""}</li>
            <li>${strMeasure4 ? strMeasure4 : ""} ${strIngredient4 ? strIngredient4 : ""}</li>
            <li>${strMeasure5 ? strMeasure5 : ""} ${strIngredient5 ? strIngredient5 : ""}</li>
            <li>${strMeasure6 ? strMeasure6 : ""} ${strIngredient6 ? strIngredient6 : ""}</li>
            <li>${strMeasure7 ? strMeasure7 : ""} ${strIngredient7 ? strIngredient7 : ""}</li>
            <li>${strMeasure8 ? strMeasure8 : ""} ${strIngredient8 ? strIngredient8 : ""}</li>
            <li>${strMeasure9 ? strMeasure9 : ""} ${strIngredient9 ? strIngredient9 : ""}</li>
            <li>${strMeasure10 ? strMeasure10 : ""} ${strIngredient10 ? strIngredient10 : ""}</li>
          </ul> 

          <p class="copyright">&copy; Copyright All Right Reserved By
            <a href="https://github.com/farhan-nahid/" target="_blank">Farhan</a>
          </p>
        </div>
  `;

  modalContainer.appendChild(modal);
  loadingSpinner(false);

  // hide modal
  document.getElementById("cross__icon").addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalContainer.textContent = "";
  });

  const lis = document.getElementsByTagName("li");
  for (const li of lis) {
    if (li.innerText === "") {
      li.style.display = "none";
    }
  }
};
/* 
<ul>
<li>${strMeasure1 ? strMeasure1 : ""} ${strIngredient1 ? strIngredient1 : ""}</li>
<li>${strMeasure2 ? strMeasure2 : ""} ${strIngredient2 ? strIngredient2 : ""}</li>
<li>${strMeasure3 ? strMeasure3 : ""} ${strIngredient3 ? strIngredient3 : ""}</li>
<li>${strMeasure4 ? strMeasure4 : ""} ${strIngredient4 ? strIngredient4 : ""}</li>
<li>${strMeasure5 ? strMeasure5 : ""} ${strIngredient5 ? strIngredient5 : ""}</li>
<li>${strMeasure6 ? strMeasure6 : ""} ${strIngredient6 ? strIngredient6 : ""}</li>
<li>${strMeasure7 ? strMeasure7 : ""} ${strIngredient7 ? strIngredient7 : ""}</li>
<li>${strMeasure8 ? strMeasure8 : ""} ${strIngredient8 ? strIngredient8 : ""}</li>
<li>${strMeasure9 ? strMeasure9 : ""} ${strIngredient9 ? strIngredient9 : ""}</li>
<li>${strMeasure10 ? strMeasure10 : ""} ${strIngredient10 ? strIngredient10 : ""}</li>
</ul> */
