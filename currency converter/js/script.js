const dropList = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".fromSelect");
const toCurrency = document.querySelector(".toSelect");
const getButton = document.querySelector("form button");
const exchangeIcon = document.querySelector(".icon");

for (let i = 0; i < dropList.length; i++) {
  Object.entries(country_code).forEach(([currency_code]) => {
    let optionTag = `<option value="${currency_code}">${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  });
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

const loadFlag = (element) => {
  Object.entries(country_code).forEach(([code]) => {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://countryflagsapi.com/png/${country_code[code]}`;
    }
  });
};

const getExchangeRate = () => {
  const amount = document.querySelector("input");
  exchangeRateText = document.querySelector(".exchange-rate");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amount = 1;
  }
  exchangeRateText.innerText = `Getting exchange rate...`;
  let url = `https://v6.exchangerate-api.com/v6/4e397efda88e6a53c6df10d8/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeRateText.innerText = "Something went wrong";
    });
};

window.addEventListener("load", () => {
  getExchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});
