const container = document.querySelector("#container");
const content = document.querySelector("#content");
const pageList = document.querySelectorAll("#page-list a");
const pageNumber = document.querySelectorAll("#page-list .num");
const searchBox = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const key = api.key;
const url = `https://api.odcloud.kr/api/15063424/v1/uddi:257e1510-0eeb-44de-8883-8295c94dadf7?page=1&perPage=10&&serviceKey=${key}`;
let pageListNum = 1;

// 처음 페이지로 이동하는 함수
function firstPage() {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      displayJson(json);
      // console.log(json.currentCount);
      // console.log(json.totalCount);
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
  dongData.forEach((ele) => {
    content.innerHTML += `
                  <tr>
                  <td>${ele.법정동코드}</td>
                  <td>${ele.시도명}</td>
                  <td>${ele.시군구명}</td>
                  <td>${ele.읍면동명}</td>
                  <td>${ele.리명}</td>
                  <td>${ele.순위}</td>
                  <td>${ele.생성일자}</td>
                  <td>${ele.삭제일자}</td>
                  <td>${ele.과거법정동코드}</td>
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
function pagingNum(page) {
  fetch(
    `https://api.odcloud.kr/api/15063424/v1/uddi:257e1510-0eeb-44de-8883-8295c94dadf7?page=${page}&perPage=10&&serviceKey=${key}`
  )
    .then((response) => response.json())
    .then((json) => {
      displayJson(json);
    })
    .catch((error) => {
      catchError(error);
    });
}

// > 클릭 시 다음 페이지 목록으로 이동하는 함수
function nextPage(pageListNum) {
  fetch(
    `https://api.odcloud.kr/api/15063424/v1/uddi:257e1510-0eeb-44de-8883-8295c94dadf7?page=${pageListNum}&perPage=10&&serviceKey=${key}`
  )
    .then((response) => response.json())
    .then((json) => {
      displayJson(json);
    })
    .catch((error) => {
      catchError(error);
    });
}

// < 클릭 시 이전 페이지 목록으로 이동하는 함수
function prevPage(pageListNum) {
  fetch(
    `https://api.odcloud.kr/api/15063424/v1/uddi:257e1510-0eeb-44de-8883-8295c94dadf7?page=${pageListNum}&perPage=10&&serviceKey=${key}`
  )
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
  fetch(
    `https://api.odcloud.kr/api/15063424/v1/uddi:257e1510-0eeb-44de-8883-8295c94dadf7?page=4793&perPage=10&&serviceKey=${key}`
  )
    .then((response) => response.json())
    .then((json) => {
      displayJson(json);
    })
    .catch((error) => {
      catchError(error);
    });
}

// 각 페이지 이동 함수를 실행하는 함수
function getPage(event) {
  content.innerHTML = "";
  let page = event.target.innerHTML;

  if (page === `&gt;`) {
    pageListNum += 10;
    for (i = 0; i < 10; i++) {
      pageNumber[i].innerHTML = Number(pageNumber[i].innerHTML) + 10;
    }
    nextPage(pageListNum);
  } else if (page === `&lt;` && Number(pageNumber[0].innerHTML) !== 1) {
    pageListNum -= 10;
    for (i = 0; i < 10; i++) {
      pageNumber[i].innerHTML = Number(pageNumber[i].innerHTML) - 10;
    }
    prevPage(pageListNum);
  } else if (page === `처음으로`) {
    for (i = 0; i < 10; i++) {
      pageNumber[i].innerHTML = 1;
      pageNumber[i].innerHTML = Number(pageNumber[i].innerHTML) + i;
    }
    firstPage();
  } else if (page === `마지막으로`) {
    lastPage();
  } else {
    pagingNum(page);
  }
}

function search() {
  console.log(searchBox.value);
}

if (pageList.length > 0) {
  for (i = 0; i < pageList.length; i++) {
    pageList[i].addEventListener("click", getPage);
  }
}

searchBtn.addEventListener("click", search);
