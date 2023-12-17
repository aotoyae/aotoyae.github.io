const content = document.querySelector("#content");
const pageList = document.querySelectorAll("#page-list a");
const pageNumberBtn = document.querySelectorAll("#page-list .num");
const firstBtn = document.getElementsByClassName("first");
const prevBtn = document.getElementsByClassName("prev");
const nextBtn = document.getElementsByClassName("next");
const lastBtn = document.getElementsByClassName("last");
const searchBox = document.getElementById("search-box");
// const searchBtn = document.getElementsByClassName("search-btn");
const logoutBtn = document.getElementsByClassName("logout-btn");

const key = api.key;
const DEFAULT_PER_PAGE = 10;
let page = 1;
let pageListNum = 1;
let pageSize = 0;
let perPage = 10;

const url = `https://api.odcloud.kr/api/15063424/v1/uddi:257e1510-0eeb-44de-8883-8295c94dadf7?`;
const urlWithPerPageAndKey = `${url}&perPage=${DEFAULT_PER_PAGE}&&serviceKey=${key}`;
const fullUrl = `${urlWithPerPageAndKey}&page=${page}`;

// 처음 페이지로 이동하는 함수
function firstPage() {
  fetch(fullUrl)
    .then((response) => response.json())
    .then((json) => {
      pageSize = Math.ceil(json.totalCount / DEFAULT_PER_PAGE);
      displayJson(json);
    })
    .catch((error) => {
      catchError(error);
    });
}

firstPage();

function toFirstPage() {
  content.innerHTML = "";
  pageListNum = 1;
  let onNum = document.querySelector(".on");
  onNum.classList.remove("on");
  pageList[2].classList.add("on");

  showAllList();

  if (Number(onNum.innerHTML) === 1) {
    alert(`첫 페이지입니다.`);
  } else {
    for (let i = 0; i < 10; i++) {
      pageNumberBtn[i].innerHTML = 1;
      pageNumberBtn[i].innerHTML = Number(pageNumberBtn[i].innerHTML) + i;
    }
  }
  firstPage();
}

// 검색 기능 test
// 전부 가져오는데 너무 오래걸림
// let searchedDataArr = [];

// async function searchDong() {
//   const totalPage = 4793;

//   try {
//     for (let pageNum = 1; pageNum <= totalPage; pageNum++) {
//       const response = await fetch(`${urlWithPerPageAndKey}&page=${pageNum}`);

//       if (!response.ok) {
//         throw new Error(`데이터 가져오는 데 ERROR 발생`);
//       }

//       const data = await response.json();
//       searchedDataArr = searchedDataArr.concat(data);
//     }
//     // console.log(searchedDataArr);
//   } catch (error) {
//     console.error(`데이터를 가져오는 중 ERROR 발생`, error);
//   }
//   console.log(searchedDataArr);
// }

function searchDong() {
  content.innerHTML = "";
  console.log(searchBox.value);
  fetch(`${url}&perPage=20&serviceKey=${key}`)
    .then((response) => response.json())
    .then((json) => {
      let dongData = json.data;
      console.log(dongData);
      dongData
        .filter((ele) => ele.읍면동명 === `소하읍`)
        .forEach((ele) => {
          content.innerHTML += `
                          <tr>
                          <td>${
                            ele.법정동코드 !== null ? ele.법정동코드 : `-`
                          }</td>
                          <td>${ele.시도명 !== null ? ele.시도명 : `-`}</td>
                          <td>${ele.시군구명 !== null ? ele.시군구명 : `-`}</td>
                          <td>${ele.읍면동명 !== null ? ele.읍면동명 : `-`}</td>
                          <td>${ele.리명 !== null ? ele.리명 : `-`}</td>
                          <td>${ele.순위 !== null ? ele.순위 : `-`}</td>
                          <td>${ele.생성일자 !== null ? ele.생성일자 : `-`}</td>
                          <td>${ele.삭제일자 !== null ? ele.삭제일자 : `-`}</td>
                          <td>${
                            ele.과거법정동코드 !== null
                              ? ele.과거법정동코드
                              : `-`
                          }</td>
                          </tr>`;
        });
    })
    .catch((error) => {
      catchError(error);
    });
}

// 법정동 리스트 가져와 보여주는 함수
function displayJson(json) {
  let dongData = json.data;
  dongData.forEach((ele) => {
    content.innerHTML += `
                        <tr>
                        <td>${
                          ele.법정동코드 !== null ? ele.법정동코드 : `-`
                        }</td>
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

// 이전 페이지 리스트로 이동
function toPrevList() {
  content.innerHTML = "";
  let onNum = document.querySelector(".on");
  onNum.classList.remove("on");
  let numOfLastList = pageSize % 10; // 3
  const isHideList = showAllList();

  if (isHideList) {
    pageListNum -= numOfLastList - 1;
  }

  if (Number(onNum.innerHTML) === 1) {
    alert(`첫 페이지입니다.`);
  }
  pageList[2].classList.add("on");
  if (Number(pageNumberBtn[0].innerHTML) !== 1) {
    pageListNum -= 10;
    for (let i = 0; i < 10; i++) {
      pageNumberBtn[i].innerHTML = Number(pageNumberBtn[i].innerHTML) - 10;
    }
  }
  fetch(`${urlWithPerPageAndKey}&page=${pageListNum}`)
    .then((response) => response.json())
    .then((json) => {
      displayJson(json);
    })
    .catch((error) => {
      catchError(error);
    });
}

// 이후 페이지 리스트로 이동
function toNextList() {
  content.innerHTML = "";
  let onNum = document.querySelector(".on");
  onNum.classList.remove("on");
  pageList[2].classList.add("on");
  let firstNumOfLastList = Math.floor(pageSize / perPage) * 10 + 1; //4791
  let lastListLength = pageSize % 10; // 3

  if (pageSize === Number(onNum.innerHTML)) {
    alert(`마지막 페이지입니다.`);
    toLastPage();
    return;
  }

  if (firstNumOfLastList < Number(pageNumberBtn[0].innerHTML) + 10) {
    toLastPage();
    return;
  } else if (firstNumOfLastList !== Number(pageNumberBtn[0].innerHTML) + 10) {
    pageListNum += 10;
    for (let i = 0; i < 10; i++) {
      pageNumberBtn[i].innerHTML = Number(pageNumberBtn[i].innerHTML) + 10;
    }
  } else {
    hideList(firstNumOfLastList, lastListLength);
  }

  fetch(`${urlWithPerPageAndKey}&page=${pageListNum}`)
    .then((response) => response.json())
    .then((json) => {
      displayJson(json);
    })
    .catch((error) => {
      catchError(error);
    });
}

// 마지막 페이지로 이동하는 함수
function toLastPage() {
  content.innerHTML = "";
  let onNum = document.querySelector(".on");
  if (Number(onNum.innerHTML) !== pageSize) onNum.classList.remove("on");

  let firstNumOfLastList = Math.floor(pageSize / perPage) * 10 + 1; // 4791
  let lastListLength = pageSize % 10; // 3
  pageNumberBtn[lastListLength - 1].classList.add("on");
  pageListNum = pageSize;

  if (Number(onNum.innerHTML) === pageSize) {
    alert(`마지막 페이지입니다.`);
  } else {
    hideList(firstNumOfLastList, lastListLength);
  }

  fetch(`${url}page=${pageSize}&perPage=${DEFAULT_PER_PAGE}&&serviceKey=${key}`)
    .then((response) => response.json())
    .then((json) => {
      displayJson(json);
    })
    .catch((error) => {
      catchError(error);
    });
  pageListNum -= lastListLength - 1;
}

function showAllList() {
  for (i = 0; i < 10; i++) {
    if (pageNumberBtn[i].classList.contains("hide")) {
      pageNumberBtn[i].classList.remove("hide");
    }
  }
}

function hideList(firstNumOfLastList, lastListLength) {
  for (let i = 0; i < 10; i++) {
    pageNumberBtn[i].innerHTML = firstNumOfLastList;
    pageNumberBtn[i].innerHTML = Number(pageNumberBtn[i].innerHTML) + i;
  }

  for (j = lastListLength; j < 10; j++) {
    pageNumberBtn[j].classList.add("hide");
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

// 각 페이지 이동 함수를 실행하는 함수
function getPage(event) {
  content.innerHTML = "";
  let pageBtn = event.target.innerHTML;
  let onNum = document.querySelector(".on");
  onNum.classList.remove("on");

  event.target.classList.add("on");
  pagingNum(pageBtn);
}

if (pageNumberBtn.length > 0) {
  for (let i = 0; i < pageNumberBtn.length; i++) {
    pageNumberBtn[i].addEventListener("click", getPage);
  }
}

function logOut() {
  window.location.href = "main.html";
}

// searchBtn[0].addEventListener("click", searchDong);
logoutBtn[0].addEventListener("click", logOut);
firstBtn[0].addEventListener("click", toFirstPage);
prevBtn[0].addEventListener("click", toPrevList);
nextBtn[0].addEventListener("click", toNextList);
lastBtn[0].addEventListener("click", toLastPage);
