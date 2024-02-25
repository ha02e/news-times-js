const API_KEY = `fee0da4c686f44969b929bbc84192c2a`;
let newsList = [];
let searchArea = document.getElementById("search-area");
let searchIcon = document.getElementById("search-icon");
let searchKeyword = document.getElementById("search-keyword");
const menus = document.querySelectorAll(".menus button");

let totalResults = 0;
let page = 1;
const pageSize = 13;
const groupSize = 5;

let url = new URL(
  `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
);
//https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}
//https://hy-news-times.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}

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

//검색 엔터키
function enterKey() {
  if (window.event.keyCode == 13) {
    searchNews();
  }
}

const searchNews = async () => {
  searchIcon.style.display = "block";
  searchArea.style.display = "none";

  let keyword = searchKeyword.value;
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );
  //https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}
  //https://hy-news-times.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}

  getNews();
};

// 모바일 슬라이드 메뉴
const openNav = () => {
  document.getElementById("sideNav").style.width = "70vw";
};
const closeNav = () => {
  document.getElementById("sideNav").style.width = "0";
};

const getNews = async () => {
  try {
    //url 호출 전에 세팅해준다.
    url.searchParams.set("page", page); //&page=page
    url.searchParams.set("pageSize", pageSize); //&pageSize=pageSize

    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        //검색어 관련 기사가 없을 경우
        throw new Error("검색 결과가 없습니다.");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  //https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}
  //https://hy-news-times.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}

  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  //https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}
  //https://hy-news-times.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}

  getNews();
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
  searchKeyword.value = "";
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
  searchKeyword.value = "";
};

//페이지네이션
const paginationRender = () => {
  let paginationHTML = ``;
  const totalPage = Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page / groupSize);

  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPage) {
    lastPage = totalPage;
  }

  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  page === 1
    ? ""
    : (paginationHTML = `<li class="page-item" onclick="moveToPage(${1})"><a class="page-link" href="#">&lt;&lt;</a></li><li class="page-item" onclick="moveToPage(${
        page - 1
      })"><a class="page-link" href="#">&lt;</a></li>`);

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i == page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`;
  }

  page === lastPage
    ? ""
    : (paginationHTML += `<li class="page-item" onclick="moveToPage(${
        page + 1
      })"><a class="page-link" href="#">&gt;</a></li><li class="page-item" onclick="moveToPage(${totalPage})"><a class="page-link" href="#">&gt;&gt;</a></li>`);
  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  page = pageNum;
  getNews();
};

getLatestNews();
