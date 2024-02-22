const API_KEY = `fee0da4c686f44969b929bbc84192c2a`;
let newsList = [];
let searchArea = document.getElementById("search-area");
let searchIcon = document.getElementById("search-icon");
const menus = document.querySelectorAll(".menus button");

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

//검색
const openSearchArea = () => {
  if (searchArea.style.display === "none") {
    searchArea.style.display = "flex";
    searchIcon.style.display = "none";
  } else {
    searchArea.style.display = "none";
    searchIcon.style.display = "block";
  }
};

const searchNews = async () => {
  searchIcon.style.display = "block";
  searchArea.style.display = "none";

  const keyword = document.getElementById("search-keyword").value;
  //console.log(keyword);
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

// 모바일 슬라이드 메뉴
const openNav = () => {
  document.getElementById("sideNav").style.width = "70vw";
};
const closeNav = () => {
  document.getElementById("sideNav").style.width = "0";
};

//뉴스 불러오는 함수
const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&pageSize=13&apiKey=${API_KEY}`
  );
  //https://newsapi.org/v2/top-headlines?country=kr&pageSize=13&apiKey=${API_KEY}
  //https://hy-news-times.netlify.app/top-headlines?country=us&apiKey=${API_KEY}

  //url 호출
  const response = await fetch(url);
  const data = await response.json(); //json:파일형식
  newsList = data.articles;
  render();
  console.log("dddd", newsList);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&pageSize=13&category=${category}&apiKey=${API_KEY}`
  );

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

//이미지 에러 처리
const imgError = (image) => {
  image.onerror = null;
  image.src = "images/no-image.png";
};

const render = () => {
  let noImageUrl = "images/no-image.png";

  const newsHTML = newsList
    .map(
      (news) =>
        `<div class="news news${newsList.indexOf(news) + 1}">
      <div class="news-image">
        <img src="${
          news.urlToImage == null || news.urlToImage == ""
            ? noImageUrl
            : news.urlToImage
        }"  alt="뉴스 이미지" onerror="imgError(this)"/>
      </div>
      <div class="news-contents">
        <h2 class="news-title">${news.title}</h2>
        <p class="news-text">
          ${
            news.description == null || news.description == ""
              ? "(내용 없음)"
              : news.description
          }
        </p>
        <div class="news-date">${moment(news.publishedAt).fromNow()}&nbsp; (${
          news.source.name == null || news.source.name == ""
            ? "no source"
            : news.source.name
        })</div>
      </div>
    </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();
