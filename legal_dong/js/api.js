const container = document.querySelector("#container");
const content = document.querySelector("#content");
const pageNum = document.querySelectorAll("#page-number a");
console.log(pageNum);

const key = api.key;

const num = 4793;

function paging(page) {
  fetch(
    `https://api.odcloud.kr/api/15063424/v1/uddi:257e1510-0eeb-44de-8883-8295c94dadf7?page=${page}&perPage=10&&serviceKey=${key}`
  )
    .then((response) => response.json())
    .then((json) => {
      let dongData = json.data;
      console.log(dongData);
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
  console.log(page);
}

if (pageNum.length > 0) {
  for (i = 0; i < pageNum.length; i++) {
    pageNum[i].addEventListener("click", getPage);
  }
}
