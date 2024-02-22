const droplist = document.querySelectorAll(".drop-list select");

window.addEventListener("load", () => {
    CalcurateMoney();
    loadFlag(init_rate)
    loadFlag(final_rate)
})

for (let i = 0; i < droplist.length; i++) {
    for (let Country in country_list) {
        let select;
        if (i == 0) {
            select = Country == "USD" ? "selected" : "";
        } else if (i == 1) {
            select = Country == "THB" ? "selected" : "";
        }
        let TagOption = `<option value="${Country}" ${select}>${Country}</option>`
        //console.log(droplist[1]);
        droplist[i].insertAdjacentHTML("beforeend", TagOption)
        droplist[i].addEventListener("change", events => {
            loadFlag(events.target); // call loadFlag with passing target element as an argument
        });
    }

}

function loadFlag(element) {
    for (let Flags in country_list) {
        if (Flags == element.value) {
            let imgTag = element.parentElement.querySelector("img")
            imgTag.src = `https://flagsapi.com/${country_list[Flags]}/shiny/64.png`
        }
    }
}

const init_rate = document.querySelector("#init-money");
const final_rate = document.querySelector("#final-money");
const input_amount = document.querySelector("#currency")
const Display_Data = document.querySelector(".getting-rate")

init_rate.addEventListener("change", CalcurateMoney)
final_rate.addEventListener("change", CalcurateMoney)
input_amount.addEventListener("input", CalcurateMoney)

function CalcurateMoney() {
    //field
    const init = init_rate.value;
    const final = final_rate.value;
    const inputs_amount = input_amount.value;

    //Call API 
    const url = `https://open.er-api.com/v6/latest/${init}`;
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            const exchange_rate = (data.rates[final] * inputs_amount).toFixed(2);
            Display_Data.innerHTML = `${inputs_amount} ${init} = ${exchange_rate} ${final}`;
            //console.log(exchange_rate);
            //return exchange_rate;
        })
}

//Swap 
const exchange_Icon = document.querySelector(".drop-list .icon")
exchange_Icon.addEventListener("click", () => {
    const TempCode = init_rate.value; //Collect Temp Country
    init_rate.value = final_rate.value;
    final_rate.value = TempCode;
    loadFlag(init_rate)
    loadFlag(final_rate)
    CalcurateMoney();

})