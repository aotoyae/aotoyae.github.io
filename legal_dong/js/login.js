const idBox = document.getElementsByClassName("user-id");
const passBox = document.getElementsByClassName("user-pass");
const joinBtn = document.getElementsByClassName("join-btn");
const loginBtn = document.getElementsByClassName("login-btn");

localStorage.setItem("users", JSON.stringify([]));
const users = JSON.parse(localStorage.getItem("users"));

function handleSubmitId(event) {
  event.preventDefault();
  const id = idBox[0].value;
  const password = passBox[0].value;
  users.push({ id: id, password: password });
  localStorage.setItem("users", JSON.stringify(users));
  alert(`${id}님 회원가입을 환영합니다.`);
}

function checkValue(event) {
  event.preventDefault();
  const id = idBox[0].value;
  const password = passBox[0].value;
  for (i = 0; i < users.length; i++) {
    if (users[i].id == id && users[i].password == password) {
      alert(`${id}님 반갑습니다.`);
      window.location.href = "sub.html";
    } else {
      alert(`아이디 또는 비밀번호를 잘못 입력했습니다.`);
    }
  }
}

joinBtn[0].addEventListener("click", handleSubmitId);
loginBtn[0].addEventListener("click", checkValue);
