const $steps = document.querySelector("#steps");
const $answer = document.querySelector("#answer");
const $btn = document.querySelector("#btn");

const data = {
  prev: "",
  curr: "",
  operator: undefined,
  pressdResult: false,
};

$btn.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName !== "BUTTON") {
    return;
  }
  if (target.id == "reset") {
    reset_data();
    return;
  }
  if (target.classList.contains("num")) {
    on_num(data.operator, target);
  }
  if (target.classList.contains("op")) {
    on_op(target);
  }
  if (target.id == "btnResult") {
    show_result();
  }
  target.blur();
});
function on_num(bool, target) {
  const val = target.dataset.val;
  const prevOrcurr = bool ? "curr" : "prev";
  if (val == "-1") {
    data[prevOrcurr] = Number(data[prevOrcurr]) * -1;
  } else {
    data[prevOrcurr] += val;
  }
  $answer.textContent = data[prevOrcurr];
}
function on_op(target) {
  $steps.classList.remove("off");
  const val_op = target.dataset.val;
  data.operator = val_op;
  if (data.prev == undefined) {
    return;
  }
  if (!data.pressdResult && data.curr) {
    show_result();
  }
  show_middleStep();
  data.curr = "";
  data.pressdResult = false;
}
function show_result() {
  if (data.prev == undefined || data.curr == undefined || !data.operator) {
    return;
  }
  data.pressdResult = true;
  show_finalStep();
  data.prev = calculSwitch();
  $answer.textContent = data.prev;
}
function calculSwitch() {
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
function operator_to_string() {
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
function show_middleStep() {
  const step_str = `${data.prev} ${operator_to_string()}`;
  $steps.textContent = step_str;
}
function show_finalStep() {
  const calcul_str = `${data.prev} ${operator_to_string()} ${data.curr}`;
  $steps.textContent = `${calcul_str} =`;
}
function reset_data() {
  data.prev = "";
  data.curr = "";
  $steps.textContent = "&nbsp";
  $steps.classList.add("off");
  $answer.textContent = "0";
  data.operator = undefined;
  data.pressdResult = true;
}
