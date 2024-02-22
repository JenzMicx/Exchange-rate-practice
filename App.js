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
            const exchange_rate = data.rates[final] * inputs_amount;
            Display_Data.innerHTML = `${inputs_amount} ${init} = ${exchange_rate} ${final}`;
            //console.log(exchange_rate);
        })
}