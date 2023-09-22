const steps = document.querySelector("#steps");
const answer = document.querySelector("#answer");
const btn = document.querySelector("#btn");
// const plusMinus = document.querySelector(".plusMinus")

const data = {
  prev: "",
  curr: "",
  operator: undefined,
  pressedResult: false,
};

btn.addEventListener("click", (e) => {
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
  if (data[prevOrCurr] === -0){
    console.log("hi")
    answer.innerText = data[prevOrCurr];
  }
  if (val === "-1") {
    // console.log(typeof data[prevOrCurr])
    data[prevOrCurr] = Number(data[prevOrCurr]) * -1;
    console.log("bye")

  } else {
    data[prevOrCurr] += val;
  }
  answer.innerText = data[prevOrCurr];
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
