const operatorArr = ["C", "±", "x<sup>2</sup>", "÷", "×", "-", "+", ".", "="];
const numArr = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];

operatorArr.forEach((val, idx) => {
  let btn = document.createElement("div");
  let txt = document.createElement("span");
  txt.innerText = val;
  console.log(parseInt(val));
  if (val == "C") {
    btn.classList.add("allclear");
  }
});
