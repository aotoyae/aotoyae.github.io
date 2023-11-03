const container = document.querySelector("#container");
const content = document.querySelector("#content");
const pageList = document.querySelectorAll("#page-list a");
const pageNumber = document.querySelectorAll("#page-list .num");
const key = api.key;
const url = `https://api.odcloud.kr/api/15063424/v1/uddi:257e1510-0eeb-44de-8883-8295c94dadf7?page=1&perPage=10&&serviceKey=${key}`;

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

function catchError(error) {
  console.log(error);
  document.querySelector("#content").innerHTML += `
              <tr>
                  <td colspan="4">Error occurred.</td>
              </tr>   
            `;
}

fetch(url)
  .then((response) => response.json())
  .then((json) => {
    console.log(json.currentCount);
    console.log(json.totalCount);
    console.log(json.page);
    console.log(json.perPage);
    displayJson(json);
  })
  .catch((error) => {
    catchError(error);
  });

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

function paging(page) {
  if (page === `&gt;`) {
    for (i = 0; i < 10; i++) {
      pageNumber[i].innerHTML = Number(pageNumber[i].innerHTML) + 10;
    }
  } else if (page === `&lt;`) {
    if (Number(pageNumber[0].innerHTML) !== 1) {
      for (i = 0; i < 10; i++) {
        pageNumber[i].innerHTML = Number(pageNumber[i].innerHTML) - 10;
      }
    }
  } else {
    pagingNum(page);
  }
}

function getPage(event) {
  content.innerHTML = "";
  let page = event.target.innerHTML;
  paging(page);
  console.log(page);
}

if (pageList.length > 0) {
  for (i = 0; i < pageList.length; i++) {
    pageList[i].addEventListener("click", getPage);
  }
}
