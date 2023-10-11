const btn = document.getElementsByClassName("button");
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
      steps.innerText = answer.innerText;
    } else {
      steps.innerText = steps.innerText.slice(0, -1);
    }
  } else if (steps.innerText === "0") {
    steps.innerText = answer.innerText;
  } else {
    steps.innerText = steps.innerText + answer.innerText;
  }
  steps.innerText += key;
}

function getResult() {
  return steps.innerText + answer.innerText;
}

function calculate(expression) {
  let tmpNums = expression.split(/÷|×|－|＋/);
  let tmpResult = [];
  let count = 0;
  const lengthNums = tmpNums.length;
  const lengthOps = lengthNums - 1;

  for (i = 0; i < lengthNums; i++) {
    tmpResult[2 * i] = Number(tmpNums[i]);
  }
  for (i = 0; i < lengthOps; i++) {
    for (j = count; j < expression.length; j++) {
      if (
        expression[j] === "÷" ||
        expression[j] === "×" ||
        expression[j] === "－" ||
        expression[j] === "＋"
      ) {
        tmpResult[2 * i + 1] = expression[j];
        count = j + 1;
        break;
      }
    }
  }

  for (let i = 0; i < lengthOps; i++) {
    const divideOp = tmpResult.indexOf("÷");
    if (divideOp !== -1) {
      let tmpDivide = 0;
      tmpDivide = tmpResult[divideOp - 1] / tmpResult[divideOp + 1];
      tmpResult[divideOp - 1] = tmpDivide;
      tmpResult.splice(divideOp, 2);
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
  if (isNaN(tmpResult[0]) || answer.innerText === "Infinity") {
    answer.innerText = "(정의되지 않은 값입니다)";
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
      let expression = getResult();
      calculate(expression);
      steps.innerText = "0";
      break;
  }
}

function getKey(event) {
  let key = event.target.innerHTML;
  executeFnc(key);
}

if (btn.length > 0) {
  for (i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", getKey);
  }
}
