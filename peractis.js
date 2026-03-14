const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equals = document.getElementById("equals");
const remove = document.getElementById("remove");
const reset = document.getElementById("reset");
const res = document.getElementById("resault");
const decimal = document.getElementById("decimal");
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (res.innerText === "0") {
      res.innerText = number.innerText;
    } else {
      res.innerText += number.innerText;
    }
  });
});

operations.forEach((op) => {
  op.addEventListener("click", () => {
    if (res.innerText === "0") {
      res.innerText = "0";
    } else if (res.innerText[res.innerText.length - 1] === op.innerText) {
      res.innerText = res.innerText;
    } else {
      res.innerText += op.innerText;
    }
  });
});

decimal.addEventListener("click", () => {
  if (res.innerText.includes(".")) {
    return;
  } else {
    res.innerText += decimal.innerText;
  }
});
remove.addEventListener("click", () => {
  if (res.innerText.length == 0) {
    res.innerText = "0";
  } else {
    res.innerText = res.innerText.slice(0, -1);
  }
});

reset.addEventListener("click", () => {
  if (res.innerText !== "0") {
    res.innerText = "0";
  }
});
equals.addEventListener("click", () => {
  let arry = res.innerText.split(/([+\-*\/])/);
  for (let i = 0; i < arry.length; i++) {
    if (arry[i] == "*") {
      arry.splice(i - 1, 3, Number(arry[i - 1]) * Number(arry[i + 1]));
      i--;
    } else if (arry[i] == "/") {
      arry.splice(i - 1, 3, Number(arry[i - 1]) / Number(arry[i + 1]));
      i--;
    }
  }
  for (let j = 0; j < arry.length; j++) {
    if (arry[j] == "+") {
      arry.splice(j - 1, 3, Number(arry[j - 1]) + Number(arry[j + 1]));
      j--;
    } else if (arry[j] == "-") {
      arry.splice(j - 1, 3, Number(arry[j - 1]) - Number(arry[j + 1]));
      j--;
    }
  }
  return (res.innerText = arry[0]);
});
