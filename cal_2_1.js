const btn = document.querySelectorAll("button");
const num = document.querySelector(".num");
const oper = document.querySelector(".operator");
const dot = document.querySelector(".dot");
const equal = document.querySelector(".equal");
const answer = document.querySelector("#answer span");

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function () {
    console.log("hi");
  });
}
