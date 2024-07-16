let main_url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
  
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let last = document.querySelector(".final");

for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerHTML = currcode;
    newoption.value = currcode;
    select.append(newoption);
    if (select.name === "from" && currcode === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newoption.selected = "selected";
    }
  }
  select.addEventListener("change", (e) => {
    updateflag(e.target);
  });
}

const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newlink = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let imag = element.parentElement.querySelector("img");
  imag.src = newlink;
};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updatepage();
});

const updatepage = async () => {
  let amount = document.querySelector(".amount input");
  let amtvalue = amount.value;
  if (amtvalue == "" || amtvalue < 1) {
    amtvalue = 1;
    amount.value = "1";
  }
  const url = `${main_url}/${fromcurr.value.toLowerCase()}.json`;
  let result = await fetch(url);
  let data = await result.json();
  let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
  let finalamt = amtvalue * rate;
  last.innerHTML = `${amtvalue}${fromcurr.value}=${finalamt}${tocurr.value}`;
};

window.addEventListener("load", () => {
  updatepage();
});
