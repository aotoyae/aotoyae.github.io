const container = document.querySelector("#container");
const content = document.querySelector("#content");
const pageList = document.querySelectorAll("#page-list a");
const pageNumber = document.querySelectorAll("#page-list .num");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const key = api.key;

const totalcount = 47922;
const limit = 10;
const totalPage = Math.ceil(totalcount / limit);

function paging(page) {
  fetch(
    `https://api.odcloud.kr/api/15063424/v1/uddi:257e1510-0eeb-44de-8883-8295c94dadf7?page=${page}&perPage=10&&serviceKey=${key}`
  )
    .then((response) => response.json())
    .then((json) => {
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
    })
    .catch((error) => {
      console.log(error);
      document.querySelector("#content").innerHTML += `
              <tr>
                  <td colspan="4">Error occurred.</td>
              </tr>   
            `;
    });
}
function getPage(event) {
  content.innerHTML = "";
  let page = event.target.innerHTML;
  paging(page);
}

if (pageList.length > 0) {
  for (i = 0; i < pageList.length; i++) {
    pageList[i].addEventListener("click", getPage);
  }
}

function nextPage() {
  for (i = 0; i < 10; i++) {
    pageNumber[i].innerHTML = Number(pageNumber[i].innerHTML) + 10;
  }
}
function prevPage() {
  if (Number(pageNumber[0].innerHTML) !== 1) {
    for (i = 0; i < 10; i++) {
      pageNumber[i].innerHTML = Number(pageNumber[i].innerHTML) - 10;
    }
  }
}

nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", prevPage);
