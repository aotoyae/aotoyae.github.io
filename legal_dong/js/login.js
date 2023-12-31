const idBox = document.getElementById("user-id");
const passBox = document.getElementById("user-pass");
const joinBtn = document.getElementsByClassName("join-btn");
const loginBtn = document.getElementsByClassName("login-btn");
const numRule = /[0-9]/;
const lowerRule = /[a-z]/;
const upperRule = /[A-Z]/;
const idAllowRule = /^[a-z0-9]*$/;
const pwAllowRule = /^[a-zA-Z0-9]*$/;

function checkIdIsInvalid(id) {
  return !numRule.test(id) ||
    !lowerRule.test(id) ||
    !idAllowRule.test(id) ||
    20 < id.length ||
    id.length < 5;
}

function checkPwIsInvalid(password) {
  return !numRule.test(password) ||
    !lowerRule.test(password) ||
    !upperRule.test(password) ||
    !pwAllowRule.test(password) ||
    20 < password.length ||
    password.length < 8;
}

function alertInputIsInvalid() {
  const id = idBox.value;
  const password = passBox.value;

  if (id === "") {
    alert(`아이디를 입력하세요.`);
    return;
  } else if (checkIdIsInvalid(id)) {
    alert(`아이디: 5~20자의 영문 소문자, 숫자를 입력해 주세요.`);
    return;
  }

  if (password === "") {
    alert(`비밀번호를 입력하세요.`);
    return;
  } else if (checkPwIsInvalid(password)) {
    alert(`비밀번호: 8~20자의 영문 대소문자, 숫자를 입력해 주세요.`);
    return;
  }
}

function handleJoin(event) {
  event.preventDefault();
  const id = idBox.value;
  const password = passBox.value;
  const btoaPassword = btoa(password);

  if (
    id === "" ||
    checkIdIsInvalid(id) ||
    password === "" ||
    checkPwIsInvalid(password)
  ) {
    alertInputIsInvalid();
    return;
  }

  let accountData = JSON.parse(localStorage.getItem("users"));

  if (accountData === null) {
    accountData = [];
  }

  const isDuplicated = checkIsDuplicated(id, accountData);

  if (!isDuplicated) {
    accountData.push({ id: id, password: btoaPassword });
    localStorage.setItem("users", JSON.stringify(accountData));
    alert(`${id}님 회원가입을 환영합니다.`);
  }
}

function checkIsDuplicated(id, accountData) {
  for (const user of accountData) {
    if (id === user.id) {
      alert(`사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요.`);
      return true;
    }
  }

  return false;
}

function checkAccountIsValid() {
  const id = idBox.value;
  const password = passBox.value;
  const btoaPassword = btoa(password);
  const processType = {
    SUCCEED: `SUCCEED`,
    INVALID: `INVALID`,
    FAILED: `FAILED`,
  };

  if (
    id === "" ||
    checkIdIsInvalid(id) ||
    password === "" ||
    checkPwIsInvalid(password)
  ) {
    alertInputIsInvalid();
    return processType.INVALID;
  }

  let accountData = JSON.parse(localStorage.getItem("users"));
  const noAccount = checkAccountExist(accountData);

  if (!noAccount) {
    return accountData.some(
      (obj) => obj.id === id && obj.password === btoaPassword
    )
      ? processType.SUCCEED
      : processType.FAILED;
  }
}

function checkAccountExist(accountData) {
  if (accountData === null) {
    alert(`회원가입을 진행해 주세요.`);
    return true;
  }
  return false;
}

function handleLogIn(event) {
  event.preventDefault();
  const accountIsValid = checkAccountIsValid();
  const id = idBox.value;
  console.log(accountIsValid);
  if (accountIsValid === `SUCCEED`) {
    alert(`${id}님 반갑습니다.`);
    window.location.href = "sub.html";
  } else if (accountIsValid === `FAILED`) {
    alert(`아이디 또는 비밀번호를 잘못 입력했습니다.`);
  }
}

joinBtn[0].addEventListener("click", handleJoin);
loginBtn[0].addEventListener("click", handleLogIn);
