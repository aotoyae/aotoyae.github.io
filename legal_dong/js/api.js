const code = document.querySelector("#container tr .code");
const doName = document.querySelector("#container tr .do-name");
const guName = document.querySelector("#container tr .gu-name");
const dongName = document.querySelector("#container tr .dong-name");
const riName = document.querySelector("#container tr .ri-name");
const rank = document.querySelector("#container tr .rank");
const creatDate = document.querySelector("#container tr .creat-date");
const deleteDate = document.querySelector("#container tr .delete-date");
const pastCode = document.querySelector("#container tr .past-code");

fetch(
  "https://api.odcloud.kr/api/15063424/v1/uddi:257e1510-0eeb-44de-8883-8295c94dadf7?page=1&perPage=10&&serviceKey=1fQnx228HxXx%2FibxiDlyQJH%2FJtwMiCBQ8BI9iT0unNG9gvlFKGnW3QFDt7I8SotDg%2FtJxFAJTXi712a220uc7w%3D%3D  "
)
  .then((response) => response.json())
  .then((data) => console.log(data));
