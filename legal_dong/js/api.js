const content = document.querySelector("#content");
const pageList = document.querySelectorAll("#page-list a");
const pageNumberBtn = document.querySelectorAll("#page-list .num");
const firstBtn = document.querySelectorAll("#page-list .first");
const preveBtn = document.querySelectorAll("#page-list .prev");
const nextBtn = document.querySelectorAll("#page-list .next");
const lastBtn = document.querySelectorAll("#page-list .last");
const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementsByClassName("search-btn");
const logoutBtn = document.getElementsByClassName("logout-btn");
const key = api.key;

const DEFAULT_PER_PAGE = 10;
let pageListNum = 1;
let pageSize = 0;
let page = 1;

const url = `https://api.odcloud.kr/api/15063424/v1/uddi:257e1510-0eeb-44de-8883-8295c94dadf7?`;
const urlWithPerPageAndKey = `${url}&perPage=${DEFAULT_PER_PAGE}&serviceKey=${key}`;
const fullUrl = `${urlWithPerPageAndKey}&page=${page}`;

// 처음 페이지로 이동하는 함수
function firstPage() {
  fetch(fullUrl)
    .then((response) => response.json())
    .then((json) => {
      pageSize = Math.ceil(json.totalCount / DEFAULT_PER_PAGE);
      displayJson(json);
      // console.log(json.currentCount);
      console.log(json.totalCount);
      console.log(pageSize);
      // console.log(json.page);
      // console.log(json.perPage);
    })
    .catch((error) => {
      catchError(error);
    });
}

firstPage();

// 법정동 리스트 가져와 보여주는 함수
function displayJson(json) {
  let dongData = json.data;
  // console.log(dongData.filter((v) => v.읍면동명 === `동탄면`));
  if (searchBox.value.length !== 0) {
    console.log("hi");
  } else {
    dongData.forEach((ele) => {
      content.innerHTML += `
                      <tr>
                      <td>${ele.법정동코드 !== null ? ele.법정동코드 : `-`}</td>
                      <td>${ele.시도명 !== null ? ele.시도명 : `-`}</td>
                      <td>${ele.시군구명 !== null ? ele.시군구명 : `-`}</td>
                      <td>${ele.읍면동명 !== null ? ele.읍면동명 : `-`}</td>
                      <td>${ele.리명 !== null ? ele.리명 : `-`}</td>
                      <td>${ele.순위 !== null ? ele.순위 : `-`}</td>
                      <td>${ele.생성일자 !== null ? ele.생성일자 : `-`}</td>
                      <td>${ele.삭제일자 !== null ? ele.삭제일자 : `-`}</td>
                      <td>${
                        ele.과거법정동코드 !== null ? ele.과거법정동코드 : `-`
                      }</td>
                      </tr>`;
    });
  }
}

// 에러시 실행 함수
function catchError(error) {
  console.log(error);
  document.querySelector("#content").innerHTML += `
              <tr>
                  <td colspan="4">Error occurred.</td>
              </tr>   
            `;
}

// 숫자 클릭 시 페이지 이동하는 함수
function pagingNum(pageBtn) {
  page = pageBtn;
  fetch(`${urlWithPerPageAndKey}&page=${page}`)
    .then((response) => response.json())
    .then((json) => {
      displayJson(json);
    })
    .catch((error) => {
      catchError(error);
    });
}

// > 클릭 시 이전,다음 페이지 목록으로 이동하는 함수
function moveList(pageListNum) {
  page = pageListNum;
  fetch(`${urlWithPerPageAndKey}&page=${page}`)
    .then((response) => response.json())
    .then((json) => {
      displayJson(json);
    })
    .catch((error) => {
      catchError(error);
    });
}

// 마지막 페이지로 이동하는 함수
function lastPage() {
  fetch(`${url}page=4793&perPage=${DEFAULT_PER_PAGE}&&serviceKey=${key}`)
    .then((response) => response.json())
    .then((json) => {
      pageSize = Math.ceil(json.totalCount / DEFAULT_PER_PAGE);
      displayJson(json);
      for (let i = 0; i < 10; i++) {
        pageNumber[i].innerHTML = Number(pageNumber[i].innerHTML) + 10;
      }
    })
    .catch((error) => {
      catchError(error);
    });
}

// 각 페이지 이동 함수를 실행하는 함수
function getPage(event) {
  content.innerHTML = "";
  let pageBtn = event.target.innerHTML;
  let onNum = document.querySelector(".on");
  onNum.classList.remove("on");

  if (pageBtn === `&gt;`) {
    pageList[2].classList.add("on");
    pageListNum += 10;
    for (let i = 0; i < 10; i++) {
      pageNumber[i].innerHTML = Number(pageNumber[i].innerHTML) + 10;
    }
    moveList(pageListNum);
  } else if (pageBtn === `&lt;`) {
    pageList[2].classList.add("on");
    if (Number(pageNumber[0].innerHTML) !== 1) {
      pageListNum -= 10;
      for (let i = 0; i < 10; i++) {
        pageNumber[i].innerHTML = Number(pageNumber[i].innerHTML) - 10;
      }
      moveList(pageListNum);
    } else {
      if (Number(onNum.innerHTML) === 1) {
        alert(`첫 페이지입니다.`);
      }
      firstPage();
    }
  } else if (pageBtn === `처음으로`) {
    pageList[2].classList.add("on");
    if (Number(onNum.innerHTML) === 1) {
      alert(`첫 페이지입니다.`);
    } else {
      for (let i = 0; i < 10; i++) {
        pageNumber[i].innerHTML = 1;
        pageNumber[i].innerHTML = Number(pageNumber[i].innerHTML) + i;
      }
    }
    firstPage();
  } else if (pageBtn === `마지막으로`) {
    lastPage();
  } else {
    event.target.classList.add("on");
    pagingNum(pageBtn);
  }
}

if (pageList.length > 0) {
  for (let i = 0; i < pageList.length; i++) {
    pageList[i].addEventListener("click", getPage);
  }
}

function logOut() {
  window.location.href = "main.html";
}

searchBtn[0].addEventListener("click", displayJson);
logoutBtn[0].addEventListener("click", logOut);
