const steps = document.getElementById("steps");
const answer = document.getElementById("answer");
const btn = document.getElementById("btn");
// const dot = document.getElementById("dot");
// const zero = document.getElementById("zero");
let check = 0;

function printNum(target) {
  z;
  if (check === 1) {
    check = 0;
    answer.innerText = "0";
  }
  if (answer.innerText === "0") {
    answer.innerText = target;
  } else {
    answer.innerText = answer.innerText + target;
  }
}

function plusMinus() {
  if (answer.innerText[0] === "-") {
    answer.innerText = answer.innerText.slice(1);
  } else {
    answer.innerText = "-" + answer.innerText;
  }
}

function addDot() {
  if (answer.innerText.indexOf(".") === -1) {
    answer.innerText = answer.innerText + ".";
  }
}

function square() {
  answer.innerText = answer.innerText * answer.innerText;
}

function reset() {
  steps.innerText = "0";
  answer.innerText = "0";
}

function addOp(target) {
  if (check === 1) {
    if (steps.innerHTML === "0") {
      steps.innerText = answer.innerText + target;
    } else {
      steps.innerText = steps.innerText.slice(0, -1) + target;
    }
  } else if (steps.innerText === "0") {
    steps.innerText = answer.innerText + target;
  } else {
    steps.innerText = steps.innerText + answer.innerText + target;
  }
}

function getEx() {
  return steps.innerText + answer.innerText;
}

function calculate(ex) {
  let tmpNums = ex.split(/÷|×|－|＋/);
  let tmpResult = [];
  let count = 0;
  const lengthNums = tmpNums.length;
  const lengthOps = lengthNums - 1;
  let lengthTmp = ex.length;
  let countOp = 0;
  let tmp = 0;

  for (let i = 0; i < lengthNums; i++) {
    tmpResult[2 * i] = Number(tmpNums[i]);
  }
  for (let i = 0; i < lengthOps; i++) {
    for (let j = count; j < ex.length; j++) {
      if (ex[j] === "÷" || ex[j] === "×" || ex[j] === "-" || ex[j] === "+") {
        tmpResult[2 * i + 1] = ex[j];
        count = j + 1;
        break;
      }
    }
  }
  for (let i = 0; i < lengthOps; i++) {
    countOp = tmpResult.indexOf("÷");
    if (countOp !== -1) {
      tmp = tmpResult[countOp - 1] / tmpResult[countOp + 1];
      tmpResult[countOp - 1] = tmp;
      tmpResult.splice(countOp, 2);
    }
    countOp = tmpResult.indexOf("×");
    if (countOp !== -1) {
      tmp = tmpResult[countOp - 1] * tmpResult[countOp + 1];
      tmpResult[countOp - 1] = tmp;
      tmpResult.splice(countOp, 2);
    }
    countOp = tmpResult.indexOf("-");
    if (countOp !== -1) {
      tmp = tmpResult[countOp - 1] - tmpResult[countOp + 1];
      tmpResult[countOp - 1] = tmp;
      tmpResult.splice(countOp, 2);
    }
    countOp = tmpResult.indexOf("+");
    if (countOp !== -1) {
      tmp = tmpResult[countOp - 1] + tmpResult[countOp + 1];
      tmpResult[countOp - 1] = tmp;
      tmpResult.splice(countOp, 2);
    }
  }
  answer.innerText = tmpResult[0];
}

function runCal(target) {
  switch (target) {
    case "9":
    case "8":
    case "7":
    case "6":
    case "5":
    case "4":
    case "3":
    case "2":
    case "1":
    case "0":
      printNum(target);
      break;
    case "±":
      plusMinus();
      break;
    case ".":
      addDot;
      break;
    case "×<sup>2</sup>":
      square();
      break;
    case "C":
      reset;
      check = 0;
      break;
    case "÷":
    case "×":
    case "-":
    case "+":
      addOp(target);
      check = 1;
      break;
    case "=":
      let ex = getEx();
      calculate(ex);
      steps.innerText = "0";
      break;
  }
}

function getTarget(event) {
  let target = event.srcElement.innerText;
  runCal(target);
}

if (btn) {
  let = btn.addEventListener("click", getTarget);
}
