const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ""){
        alert("You must write something");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        }
        inputBox.value = "";
        saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);


function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
 


const dropList = document.querySelectorAll('.jn select');
fromCurrency = document.querySelector(".lj select"),
toCurrency = document.querySelector(".jl select"),
getButton = document.querySelector("form button");


for(let i = 0; i < dropList.length; i++){
    for (currency_code in countryCode) {
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        }else if(i == 1){
            selected = currency_code == "NGN" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}">${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
        
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}
function loadFlag(element){
    for(code in countryCode){
        if (code == element.value) {
              let imgTag = element.parentElement.querySelector("img");
              imgTag.src = `https://flagsapi.com/${countryCode[code]}/shiny/64.png`
        }
    }
}

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
} );

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1
    }

    let  url = `https://v6.exchangerate-api.com/v6/495f39c0541b7202d5eb213a/latest/${fromCurrency.value}`;
    fetch(url).then(response => (response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        const exchangeRateTxt = document.querySelector(".exchange-rate");
        exchangeRateTxt.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }));
}