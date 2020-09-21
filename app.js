const rate = document.getElementById("rate");
const number = document.getElementById("number");
const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");
const result = document.getElementById("result");
const base1 = document.getElementById("base1");
const base2 = document.getElementById("base2");
const end1 = document.getElementById("end1");
const end2 = document.getElementById("end2");

let select1Value;
let select2Value;

number.addEventListener("input", handleChange);
select1.addEventListener("change", handleSelect1);
select2.addEventListener("change", handleSelect2);

function handleSelect2(e) {
  select1Value = select1.value;
  select2Value = e.target.value;
  let base = select1Value;
  base1.innerText = base;
  base2.innerText = base;
  end1.innerText = select2Value;
  end2.innerText = select2Value;
  result.innerText = "0";
  number.value = "";
  if (select2Value === "EUR" && select2Value === "EUR") {
    rate.innerHTML = "1";
  } else {
    getData(base).then(
      (r) => (rate.innerHTML = r.rates[select2Value].toFixed(2))
    );
  }
}

function handleSelect1(e) {
  select1Value = e.target.value;
  select2Value = select2.value;
  console.log(select1Value, select2Value);
  let base = e.target.value;
  console.log(base);
  base1.innerText = base;
  base2.innerText = base;
  end1.innerText = select2Value;
  end2.innerText = select2Value;
  result.innerText = "0";
  number.value = "";
  if (base === "EUR" && select2Value === "EUR") {
    rate.innerHTML = "1";
  } else {
    getData(base).then(
      (r) => (rate.innerHTML = r.rates[select2Value].toFixed(2))
    );
  }
}

function handleChange(e) {
  let resultVal;
  const val = +e.target.value;
  resultVal = val * +rate.innerText;
  result.innerText = resultVal.toFixed(2);
}

async function getData(base) {
  const response = await fetch(
    `https://api.exchangeratesapi.io/latest?base=${base}`
  );
  const data = await response.json();
  return data;
}

function init() {
  getData("USD").then((r) => (rate.innerHTML = r.rates.TRY.toFixed(2)));
  base1.innerText = "USD";
  base2.innerText = "USD";
  end1.innerText = "TRY";
  end2.innerText = "TRY";
}

init();
