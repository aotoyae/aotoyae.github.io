const idBox = document.getElementById("user-id");
const passBox = document.getElementById("user-pass");
const joinBtn = document.getElementsByClassName("join-btn");
const loginBtn = document.getElementsByClassName("login-btn");
const numRule = /[0-9]/;
const lowerRule = /[a-z]/;
const upperRule = /[A-Z]/;

let accountData = [];
const users = JSON.parse(localStorage.getItem("users"));

if (users !== null) {
  accountData = users;
}

function handleJoin(event) {
  event.preventDefault();
  const id = idBox.value;
  const password = passBox.value;
  const btoaPassword = btoa(password);

  if (id === "") {
    alert(`아이디를 입력하세요.`);
    return;
  } else if (
    !numRule.test(id) ||
    !lowerRule.test(id) ||
    20 < id.length ||
    id.length < 5
  ) {
    alert(`아이디: 5~20자의 영문 소문자, 숫자를 입력해 주세요.`);
    return;
  }

  if (password === "") {
    alert(`비밀번호를 입력하세요.`);
    return;
  } else if (
    !numRule.test(password) ||
    !lowerRule.test(password) ||
    !upperRule.test(password) ||
    20 < password.length ||
    password.length < 8
  ) {
    alert(`비밀번호: 8~20자의 영문 대소문자, 숫자를 입력해 주세요.`);
    return;
  }

  for (const user of accountData) {
    if (id === user.id) {
      alert(`사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요.`);
      return;
    }
  }

  accountData.push({ id: id, password: btoaPassword });
  localStorage.setItem("users", JSON.stringify(accountData));
  alert(`${id}님 회원가입을 환영합니다.`);
}

function checkValue(event) {
  event.preventDefault();
  const id = idBox.value;
  const password = passBox.value;
  const btoaPassword = btoa(password);

  if (id === "") {
    alert(`아이디를 입력하세요.`);
    return;
  } else if (
    !numRule.test(id) ||
    !lowerRule.test(id) ||
    20 < id.length ||
    id.length < 5
  ) {
    alert(`아이디: 5~20자의 영문 소문자, 숫자를 입력해 주세요.`);
    return;
  }

  if (password === "") {
    alert(`비밀번호를 입력하세요.`);
    return;
  } else if (
    !numRule.test(password) ||
    !lowerRule.test(password) ||
    !upperRule.test(password) ||
    20 < password.length ||
    password.length < 8
  ) {
    alert(`비밀번호: 8~20자의 영문 대소문자, 숫자를 입력해 주세요.`);
    return;
  }

  if (accountData.length === 0) {
    alert(`회원가입을 진행해 주세요.`);
    return;
  }

  return accountData.some(
    (obj) => obj.id === id && obj.password === btoaPassword
  );
}

function handleLogIn(event) {
  const isValid = checkValue(event);
  const id = idBox.value;

  if (isValid) {
    alert(`${id}님 반갑습니다.`);
    window.location.href = "sub.html";
  } else if (isValid === false) {
    alert(`아이디 또는 비밀번호를 잘못 입력했습니다.`);
  }
}

joinBtn[0].addEventListener("click", handleJoin);
loginBtn[0].addEventListener("click", handleLogIn);
