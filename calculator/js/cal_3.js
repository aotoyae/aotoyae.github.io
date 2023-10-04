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
  // -02 해결
  // const answerVal = answer.innerText;
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
// getEx > getExpression 등
function getEx() {
  return steps.innerText + answer.innerText;
}

function calculate(ex) {
  // [1, "+", 2, "-", 3]
  // > [1, 2, 3]
  let tmpNums = ex.split(/÷|×|－|＋/);
  let tmpResult = [];
  let count = 0;
  const lengthNums = tmpNums.length;
  const lengthOps = lengthNums - 1;
  // let lengthTmp = ex.length; 안쓰는거 지우고
  let countOp = 0;
  let tmp = 0;
  // tmp랑 cointOp 밑에 식마다 바꿔주기, 같은 함수명 돌려쓰는거 안좋음
  // tmpDivide 이런식으로 divideOp ..

  for (let i = 0; i < lengthNums; i++) {
    tmpResult[2 * i] = Number(tmpNums[i]);
  }
  for (let i = 0; i < lengthOps; i++) {
    for (let j = count; j < ex.length; j++) {
      if (ex[j] === "÷" || ex[j] === "×" || ex[j] === "－" || ex[j] === "＋") {
        tmpResult[2 * i + 1] = ex[j];
        count = j + 1;
        break;
      }
    }
  }
  for (let i = 0; i < lengthOps; i++) {
    countOp = tmpResult.indexOf("÷");
    // [1, "+", 2, "-", 3, "*", 4, "÷", 5]
    // countOp = 7
    if (countOp !== -1) {
      tmp = tmpResult[countOp - 1] / tmpResult[countOp + 1];
      // tmp = 4 / 5
      tmpResult[countOp - 1] = tmp;
      // tmpResult[6] = 0.8
      tmpResult.splice(countOp, 2);
      // [1, "+", 2, "-", 3, "*", 0.8]
    }
    countOp = tmpResult.indexOf("×");
    if (countOp !== -1) {
      tmp = tmpResult[countOp - 1] * tmpResult[countOp + 1];
      tmpResult[countOp - 1] = tmp;
      tmpResult.splice(countOp, 2);
    }
    countOp = tmpResult.indexOf("－");
    if (countOp !== -1) {
      tmp = tmpResult[countOp - 1] - tmpResult[countOp + 1];
      tmpResult[countOp - 1] = tmp;
      tmpResult.splice(countOp, 2);
    }
    countOp = tmpResult.indexOf("＋");
    if (countOp !== -1) {
      tmp = tmpResult[countOp - 1] + tmpResult[countOp + 1];
      tmpResult[countOp - 1] = tmp;
      tmpResult.splice(countOp, 2);
    }
  }
  // [] 하나만 남음 마지막에
  answer.innerText = tmpResult[0];
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
      // checkOp 이렇게 전역변수 값이 자꾸 바뀌는거 안좋음
      break;
    case "＝":
      // -2 = 실행했을 때 NaN 나오는거 해결
      const answerArr = answer.innerText.split("");
      if (answerArr[0] === "-") {
        console.log("hi");
        console.log(answer.innerText);
        console.log(Number(answer.innerText));
        // answer.innerText = 123; << 이건 됨
        answer.innerText = Number(answer.innerText);
      }
      let ex = getEx();
      calculate(ex);
      steps.innerText = "0";
      break;
  }
}

function getKey(event) {
  let key = event.target.innerHTML;
  // innerText로 쓰면 ×<sup>2</sup>에서 문자만 가져와서 실행 안됨
  executeFnc(key);
}

if (btn) {
  let key = btn.addEventListener("click", getKey);
}
