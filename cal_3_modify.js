const btn = document.getElementById("btn");
const steps = document.getElementById("steps");
const answer = document.getElementById("answer");
let checkOp = 0;

function printNum(key) {
  if (checkOp === 1) {
    checkOp = 0;
    answer.innerText = "0";
  }
  if (answer.innerText === "0") {
    answer.innerText = key;
  } else {
    answer.innerText = answer.innerText + key;
  }
  const answerArr = answer.innerText.split("");
  if (answerArr[0] === "-" && answerArr[1] === "0") {
    answer.innerText = answer.innerText * 1;
  }
}

function changeSign() {
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
function clear() {
  answer.innerText = "0";
  steps.innerText = "0";
}
function addOp(key) {
  if (checkOp === 1) {
    if (steps.innerText === "0") {
      steps.innerText = answer.innerText + key;
    } else {
      steps.innerText = steps.innerText.slice(0, -1) + key;
    }
  } else if (steps.innerText === "0") {
    steps.innerText = answer.innerText + key;
  } else {
    steps.innerText = steps.innerText + answer.innerText + key;
  }
}
function getExpression() {
  return steps.innerText + answer.innerText;
}

function calculate(ex) {
  let tmpNums = ex.split(/÷|×|－|＋/);
  let tmpResult = [];
  let count = 0;
  const lengthNums = tmpNums.length;
  const lengthOps = lengthNums - 1;

  for (i = 0; i < lengthNums; i++) {
    tmpResult[2 * i] = Number(tmpNums[i]);
  }
  for (i = 0; i < lengthOps; i++) {
    for (j = count; j < ex.length; j++) {
      if (ex[j] === "÷" || ex[j] === "×" || ex[j] === "－" || ex[j] === "＋") {
        tmpResult[2 * i + 1] = ex[j];
        count = j + 1;
        break;
      }
    }
  }
  for (let i = 0; i < lengthOps; i++) {
    const divdeOp = tmpResult.indexOf("÷");
    if (divdeOp !== -1) {
      let tmpDivide = 0;
      tmpDivide = tmpResult[divdeOp - 1] / tmpResult[divdeOp + 1];
      tmpResult[divdeOp - 1] = tmpDivide;
      tmpResult.splice(divdeOp, 2);
    }
    const multiOp = tmpResult.indexOf("×");
    if (multiOp !== -1) {
      let tmpMulti = 0;
      tmpMulti = tmpResult[multiOp - 1] * tmpResult[multiOp + 1];
      tmpResult[multiOp - 1] = tmpMulti;
      tmpResult.splice(multiOp, 2);
    }
    const minusOp = tmpResult.indexOf("－");
    if (minusOp !== -1) {
      let tmpMinus = 0;
      tmpMinus = tmpResult[minusOp - 1] - tmpResult[minusOp + 1];
      tmpResult[minusOp - 1] = tmpMinus;
      tmpResult.splice(minusOp, 2);
    }
    const plusOp = tmpResult.indexOf("＋");
    if (plusOp !== -1) {
      let tmpPlus = 0;
      tmpPlus = tmpResult[plusOp - 1] + tmpResult[plusOp + 1];
      tmpResult[plusOp - 1] = tmpPlus;
      tmpResult.splice(plusOp, 2);
    }
  }
  answer.innerText = tmpResult[0];
  if (isNaN(tmpResult[0])) {
    answer.innerText = "0";
  }
}

function executeFnc(key) {
  switch (key) {
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
      printNum(key);
      break;
    case "±":
      changeSign();
      break;
    case ".":
      addDot();
      break;
    case "×<sup>2</sup>":
      square();
      break;
    case "C":
      clear();
      checkOp = 0;
      break;
    case "÷":
    case "×":
    case "－":
    case "＋":
      addOp(key);
      checkOp = 1;
      break;
    case "＝":
      const answerArr = answer.innerText.split("");
      let ex = getExpression();
      calculate(ex);
      steps.innerText = "0";
      break;
  }
}

function getKey(event) {
  let key = event.target.innerHTML;
  executeFnc(key);
}

if (btn) {
  let key = btn.addEventListener("click", getKey);
}