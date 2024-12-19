const btn = document.querySelector(".addBtn");
const averageAmount = document.querySelector(".averageAmount");
const totalBoughtAmount = document.querySelector(".totalBoughtAmount");
const totalSpentAmount = document.querySelector(".totalSpentAmount");
const del = document.querySelector(".fa-x");
const moon = document.querySelector(".fa-moon");
const sun = document.querySelector(".fa-sun");
const darkClass = document.querySelector("body");

// Butona basıldığında yeni price ve number inputları eklenir.
btn.addEventListener("click", () => {
  let element = `
      <div class="addData">
          <input class="inputData" type="number" placeholder="Number" min="0" step="0.1" />
          <input class="inputPrice" type="number" placeholder="Price" min="0" step="0.1"/>
          <div class="del" onclick="delBox(this)"><i class="fa-solid fa-x"></i></div>
        </div>
`;
  btn.insertAdjacentHTML("beforebegin", element);
  attachInputEventListeners();
  calculate();
});
// X tuşuna basıldığında eklenen inputlar silinir
const delBox = (e) => {
  e.parentNode.remove();
  attachInputEventListeners();
  calculate();
};
//Koyu mod için gerekli komutlar
moon.addEventListener("click", function () {
  darkClass.classList.add("darkclass");
  moon.classList.add("hidden");
  sun.classList.remove("hidden");
});
//Açık mod için gerekli komutlar
sun.addEventListener("click", function () {
  darkClass.classList.remove("darkclass");
  sun.classList.add("hidden");
  moon.classList.remove("hidden");
});
const formatNumber = (num) => {
  return num % 1 !== 0 ? num.toFixed(5) : num.toFixed(2);
};
// Girilen değerleri hesaplayan fonksiyon
const calculate = () => {
  let totalBought = 0;
  let totalSpent = 0;
  const numberInputs = document.querySelectorAll(".inputData");
  const priceInputs = document.querySelectorAll(".inputPrice");
  for (let i = 0; i < priceInputs.length; i++) {
    if (numberInputs[i] !== "" && priceInputs[i] !== "") {
      totalBought += parseFloat(numberInputs[i].value);
      totalSpent +=
        parseFloat(numberInputs[i].value) * parseFloat(priceInputs[i].value);
    }
  }

  let averagePrice = totalBought ? totalSpent / totalBought : 0;

  let formattedAveragePrice = formatNumber(averagePrice);
  let formattedTotalBought = formatNumber(totalBought);
  let formattedTotalSpent = formatNumber(totalSpent);
  averageAmount.innerHTML = !isNaN(formattedAveragePrice)
    ? `$${formattedAveragePrice}`
    : `0`;
  totalBoughtAmount.innerHTML = !isNaN(formattedTotalBought)
    ? `${formattedTotalBought}`
    : `0`;
  totalSpentAmount.innerHTML = !isNaN(formattedTotalSpent)
    ? `$${formattedTotalSpent}`
    : `$${0}`;
  attachInputEventListeners();
};

const attachInputEventListeners = () => {
  const allInputs = document.querySelectorAll("input");
  allInputs.forEach((inp) => {
    inp.removeEventListener("input", calculate);
    inp.addEventListener("input", calculate);
  });
};
attachInputEventListeners();
