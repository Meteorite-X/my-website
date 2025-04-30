let country_list = {
    USD: "US",
    EUR: "EU",
    GBP: "GB",
    KRW: "KR",
    JPY: "JP",
    CNY: "CN",
    MNT: "MN",
};

// api key from exhange rate api
let apiKey = "1586062cadc2e0342a36625e";

const dropList = document.querySelectorAll("form select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const amount = document.querySelector("form input");
const exchangeRateText = document.querySelector("form .exchange-rate");
const exhangeIcon = document.querySelector("form .icon");

for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_list) {
        let selected =
            i == 0
                ? currency_code == "USD"
                    ? "selected"
                    : ""
                : currency_code == "EUR"
                ? "selected"
                : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", (e) => {
        loadFlag(e.target);
    });
}

// Load the selected flag
const loadFlag = (element) => {
    for (let code in country_list) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[
                code
            ].toLowerCase()}.png`;
        }
    }
};

// Get the exchange rate
const getExchangeRate = () => {
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }

    exchangeRateText.innerText = "Getting exchange rate...";

    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let totalExRate = (amountVal * exchangeRate).toFixed(2);
            exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
        })
        .catch(() => {
            exchangeRateText.innerText = `Something went wrong`;
        });
};

// Event Listeners
window.addEventListener("load", () => {
    getExchangeRate();
});

getBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

exhangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;

    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

const buttons = document.querySelectorAll(".buttons button");
const amountInput = document.querySelector(".amount input");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const value = button.getAttribute("data-value");

        if (value === "AC") {
            amountInput.value = "";
        } else if (value === ".") {
            // Only add dot if it doesn't already exist
            if (!amountInput.value.includes(".")) {
                amountInput.value += value;
            }
        } else {
            amountInput.value += value;
        }
    });
});


amountInput.addEventListener("input", () => {
    // Allow only digits and one dot
    let value = amountInput.value;

    // Remove all characters except digits and dot
    value = value.replace(/[^0-9.]/g, '');

    // Allow only one dot
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts[1];
    }

    amountInput.value = value;
});
