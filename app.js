const rate = document.getElementById("rate");
const amount = document.getElementById("amount");
const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");
const totalAmount = document.getElementById("totalAmount");
const base1 = document.getElementById("base1");
const base2 = document.getElementById("base2");
const end1 = document.getElementById("end1");
const end2 = document.getElementById("end2");

amount.addEventListener("input", handleChange);
select1.addEventListener("change", handleSelect.bind(this, "base"));
select2.addEventListener("change", handleSelect.bind(this, "end"));

let select1Value;
let select2Value;

//Handle Select Inputs And Set the Rate Value
function handleSelect(parameter, e) {
  if (parameter === "base") {
    select1Value = e.target.value;
    select2Value = select2.value;
  } else if (parameter === "end") {
    select1Value = select1.value;
    select2Value = e.target.value;
  }
  let base = select1Value;
  base1.innerText = base;
  base2.innerText = base;
  end1.innerText = select2Value;
  end2.innerText = select2Value;
  totalAmount.innerText = "0";
  amount.value = "";
  if (select1Value === "EUR" && select2Value === "EUR") {
    rate.innerHTML = "1";
  } else {
    getData(base).then(
      (r) => (rate.innerHTML = r.rates[select2Value].toFixed(2))
    );
  }
}

//Handle the Total Amount Input And Calculate the Total Exchange Amount
function handleChange(e) {
  const amount = +e.target.value;
  let totalAmountValue = amount * +rate.innerText;
  totalAmount.innerText = totalAmountValue.toFixed(2);
}

//Fetch Data From exchangeratesapi
async function getData(base = "USD") {
  const response = await fetch(
    `https://api.exchangeratesapi.io/latest?base=${base}`
  );
  const data = await response.json();
  return data;
}

// When Page First open setting default parameters
function init() {
  getData().then((r) => (rate.innerHTML = r.rates.TRY.toFixed(2)));
  base1.innerText = "USD";
  base2.innerText = "USD";
  end1.innerText = "TRY";
  end2.innerText = "TRY";
}

init();
