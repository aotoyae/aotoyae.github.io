const idBox = document.getElementsByClassName("user-id");
const passBox = document.getElementsByClassName("user-pass");
const joinBtn = document.getElementsByClassName("join-btn");
const loginBtn = document.getElementsByClassName("login-btn");

localStorage.setItem("users", JSON.stringify([]));
const users = JSON.parse(localStorage.getItem("users"));

function validation() {}

function joinMembership(event) {
  event.preventDefault();
  const id = idBox[0].value;
  const password = passBox[0].value;
  const numRule = /[0-9]/;
  const lowerRule = /[a-z]/;
  const upperRule = /[A-Z]/;

  if (id === "") {
    alert(`아이디를 입력하세요.`);
    return false;
  } else if (
    !numRule.test(id) ||
    !lowerRule.test(id) ||
    20 < id.length ||
    id.length < 5
  ) {
    alert(`아이디: 5~20자의 영문 소문자, 숫자를 입력해 주세요.`);
    return false;
  }

  if (password === "") {
    alert(`비밀번호를 입력하세요.`);
    return false;
  } else if (
    !numRule.test(password) ||
    !lowerRule.test(password) ||
    !upperRule.test(password) ||
    20 < password.length ||
    password.length < 8
  ) {
    alert(`비밀번호: 8~20자의 영문 대소문자, 숫자를 입력해 주세요.`);
    return false;
  }

  for (const element of users) {
    if (id === element.id) {
      alert(`사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요.`);
      return false;
    }
  }

  users.push({ id: id, password: password });
  localStorage.setItem("users", JSON.stringify(users));
  alert(`${id}님 회원가입을 환영합니다.`);
}

function checkValue(event) {
  event.preventDefault();
  const id = idBox[0].value;
  const password = passBox[0].value;
  const numRule = /[0-9]/;
  const lowerRule = /[a-z]/;
  const upperRule = /[A-Z]/;

  if (id === "") {
    alert(`아이디를 입력하세요.`);
    return false;
  } else if (
    !numRule.test(id) ||
    !lowerRule.test(id) ||
    20 < id.length ||
    id.length < 5
  ) {
    alert(`아이디: 5~20자의 영문 소문자, 숫자를 입력해 주세요.`);
    return false;
  }

  if (password === "") {
    alert(`비밀번호를 입력하세요.`);
    return false;
  } else if (
    !numRule.test(password) ||
    !lowerRule.test(password) ||
    !upperRule.test(password) ||
    20 < password.length ||
    password.length < 8
  ) {
    alert(`비밀번호: 8~20자의 영문 대소문자, 숫자를 입력해 주세요.`);
    return false;
  }

  if (users.length === 0) {
    alert(`회원가입을 진행해 주세요.`);
    return false;
  }

  if (
    users.some((obj) => obj.id !== id) ||
    users.some((obj) => obj.password !== password)
  ) {
    alert(`아이디 또는 비밀번호를 잘못 입력했습니다.`);
  }

  for (i = 0; i < users.length; i++) {
    if (users[i].id === id && users[i].password === password) {
      alert(`${id}님 반갑습니다.`);
      window.location.href = "sub.html";
    }
  }
}

joinBtn[0].addEventListener("click", joinMembership);
loginBtn[0].addEventListener("click", checkValue);
