const steps = document.getElementById("steps");
//steps >> processCalculation ..
const answer = document.getElementById("answer");
const btn = document.getElementById("btn");
const dot = document.getElementById("dot");
const zero = document.getElementById("zero");
// const plusMinus = document.querySelector(".plusMinus")

const data = {
  prev: "",
  curr: "",
  operator: undefined,
  pressedResult: false,
};
btn.addEventListener("click", (e) => {
  // const id = target.id 등 중복 이름들 바꾸기
  const target = e.target;
  if (target.id === "reset") {
    resetData();
    return;
  }
  if (target.classList.contains("num")) {
    onNum(data.operator, target);
  }
  if (target.classList.contains("op")) {
    onOp(target);
  }
  if (target.id === "btnResult") {
    showResult();
  }
});
function onNum(bool, target) {
  const val = target.value;
  const prevOrCurr = bool ? "curr" : "prev";
  // . 여러개 써지는거
  if (answer.innerText.indexOf(".") !== -1) {
    dot.disabled = true;
  } else {
    dot.disabled = false;
  }
  // >> 위에 식 dot.disabled = answer.innerText.indexOf(".") !== -1
  // if문 간결화 찾아보기
  if (val === "-1") {
    data[prevOrCurr] = Number(data[prevOrCurr]) * -1;
  } else {
    data[prevOrCurr] += val;
  }
  answer.innerText = data[prevOrCurr];
  // 0 처음에 여러개 써지는거
  if (answer.innerText === "0") {
    zero.disabled = true;
  } else {
    zero.disabled = false;
  }
}
function onOp(target) {
  steps.classList.remove("off");
  data.operator = target.value;
  if (!data.pressedResult && data.curr) {
    showResult();
  }
  showMiddleStep();
  data.curr = "";
  data.pressedResult = false;
}
function showResult() {
  data.pressedResult = true;
  showFinalStep();
  data.prev = calSwitch();
  answer.innerText = data.prev;
}
function calSwitch() {
  const { prev, curr, operator } = data;
  switch (operator) {
    case "+":
      return Number(prev) + Number(curr);
    case "-":
      return Number(prev) - Number(curr);
    case "*":
      return Number(prev) * Number(curr);
    case "/":
      return Number(prev) / Number(curr);
    case "**":
      return Number(prev) ** Number(curr);
  }
}
function opToString() {
  const { operator } = data;
  switch (operator) {
    case "+":
      return "+";
    case "-":
      return "-";
    case "*":
      return "×";
    case "/":
      return "÷";
    case "**":
      return "**";
  }
}
function showMiddleStep() {
  steps.innerText = `${data.prev} ${opToString()}`;
}
function showFinalStep() {
  steps.innerText = `${data.prev} ${opToString()} ${data.curr} =`;
}
function resetData() {
  data.prev = "";
  data.curr = "";
  steps.innerText = "&nbsp";
  steps.classList.add("off");
  answer.innerText = "0";
  data.operator = undefined;
  data.pressedResult = true;
}
