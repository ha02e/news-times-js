const API_KEY = `fee0da4c686f44969b929bbc84192c2a`;
let news = [];
let searchIcon = document.getElementById("search-icon");

//뉴스 불러오는 함수
const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  //https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}
  //https://hy-news-times.netlify.app/top-headlines?country=us&apiKey=${API_KEY}

  //url 호출
  const response = await fetch(url);
  const data = await response.json(); //json:파일형식
  news = data.articles;
  console.log("dddd", news);
};

const render = () => {
  const newsHTML = ``;
  document.getElementById("").innerHTML = newsHTML;
};

getLatestNews();

//검색
const openSearchArea = () => {
  let searchArea = document.getElementById("search-area");
  let searchIcon = document.getElementById("search-icon");

  if (searchArea.style.display === "none") {
    searchArea.style.display = "flex";
    searchIcon.style.display = "none";
  } else {
    searchArea.style.display = "none";
    searchIcon.style.display = "block";
  }
};

const searchNews = () => {
  let searchArea = document.getElementById("search-area");
  let searchIcon = document.getElementById("search-icon");

  searchIcon.style.display = "block";
  searchArea.style.display = "none";
};

// 모바일 슬라이드 메뉴
const openNav = () => {
  document.getElementById("sideNav").style.width = "70vw";
};
const closeNav = () => {
  document.getElementById("sideNav").style.width = "0";
};
