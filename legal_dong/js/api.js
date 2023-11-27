const content = document.querySelector("#content");
const pageList = document.querySelectorAll("#page-list a");
const pageNumberBtn = document.querySelectorAll("#page-list .num");
const firstBtn = document.getElementsByClassName("first");
const prevBtn = document.getElementsByClassName("prev");
const nextBtn = document.getElementsByClassName("next");
const lastBtn = document.getElementsByClassName("last");
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
      // console.log(json.currentCount); // 10
      // console.log(json.totalCount); // 47921
      // console.log(pageSize); // 4793
      // console.log(json.page); // 1
      // console.log(json.perPage); // 10
    })
    .catch((error) => {
      catchError(error);
    });
}

firstPage();

// 법정동 리스트 가져와 보여주는 함수
function displayJson(json) {
  let dongData = json.data;
  console.log(searchBox.value);
  dongData
    .filter((v) => v.읍면동명 === `동탄면`)
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
                          ele.과거법정동코드 !== null ? ele.과거법정동코드 : `-`
                        }</td>
                        </tr>`;
    });
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
  fetch(`${url}page=${pageSize}&perPage=${DEFAULT_PER_PAGE}&&serviceKey=${key}`)
    .then((response) => response.json())
    .then((json) => {
      displayJson(json);

      pageSize = Math.ceil(json.totalCount / DEFAULT_PER_PAGE); // 4793
      let perPage = json.perPage; // 10
      let firstNumOfLastList = Math.floor(pageSize / perPage) * 10 + 1; // 4791
      let numOfLastList = pageSize % 10; // 3
      const lastPageIdx = pageNumberBtn[numOfLastList - 1];

      pageNumberBtn[numOfLastList - 1].classList.add("on");
      pageListNum = pageSize;

      if (Number(lastPageIdx.innerHTML) === pageSize) {
        alert(`마지막 페이지입니다.`);
      } else {
        for (let i = 0; i < 10; i++) {
          pageNumberBtn[i].innerHTML = firstNumOfLastList;
          pageNumberBtn[i].innerHTML = Number(pageNumberBtn[i].innerHTML) + i;
        }

        for (j = numOfLastList; j < 10; j++) {
          pageNumberBtn[j].classList.add("hide");
        }
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

  if (pageBtn === `&lt;` || pageBtn === `처음으로`) {
    for (i = 0; i < 10; i++) {
      if (pageNumberBtn[i].classList.contains("hide")) {
        pageNumberBtn[i].classList.remove("hide");
      }
    }
  }

  if (pageBtn === `&gt;`) {
    pageList[2].classList.add("on");
    if (Number(lastPageIdx.innerHTML) !== lastPageIdx + 1) {
      pageListNum += 10;
      for (let i = 0; i < 10; i++) {
        pageNumberBtn[i].innerHTML = Number(pageNumberBtn[i].innerHTML) + 10;
      }
      moveList(pageListNum);
    } else {
      if (Number(onNum.innerHTML) === lastPage + 1) {
        alert(`마지막 페이지입니다.`);
      }
      lastPage();
    }
  } else if (pageBtn === `&lt;`) {
    pageList[2].classList.add("on");
    if (Number(pageNumberBtn[0].innerHTML) !== 1) {
      pageListNum -= 10;
      for (let i = 0; i < 10; i++) {
        pageNumberBtn[i].innerHTML = Number(pageNumberBtn[i].innerHTML) - 10;
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
        pageNumberBtn[i].innerHTML = 1;
        pageNumberBtn[i].innerHTML = Number(pageNumberBtn[i].innerHTML) + i;
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
