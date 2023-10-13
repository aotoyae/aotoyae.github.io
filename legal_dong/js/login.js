const idBox = document.getElementsByClassName("user-id");
const passBox = document.getElementsByClassName("user-pass");
const joinBtn = document.getElementsByClassName("join-btn");
const loginBtn = document.getElementsByClassName("login-btn");

// function onJoinSubmit(event) {
//   event.preventDefault();
//   const userid = idBox.value;
//   localStorage.setItem(USERID_KEY, userid);
// }

function handleSubmitId(event) {
  const ID = idBox[0].value;
  const PASSWORD = passBox[0].value;
  event.preventDefault();
  console.log("hi");
  localStorage.setItem(ID, PASSWORD);
}

function checkValue(event) {
  event.preventDefault();
  const ID = idBox[0].value;
  const PASSWORD = passBox[0].value;
  if (localStorage.getItem(ID) == PASSWORD) {
    alert(`${ID}님 반갑습니다.`);
    window.location.href = "sub.html";
  } else {
    alert(`아이디 또는 비밀번호를 잘못 입력했습니다.`);
  }
}

joinBtn[0].addEventListener("click", handleSubmitId);
loginBtn[0].addEventListener("click", checkValue);
