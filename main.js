const API_KEY = `fee0da4c686f44969b929bbc84192c2a`;
let news = [];

//뉴스 불러오는 함수
const getLatestNews = async () => {
  const url = new URL(
    `https://hy-news-times.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
  );
  //url 호출
  const response = await fetch(url);
  const data = await response.json(); //json:파일형식
  news = data.articles;
  //console.log("dddd", news);
};

getLatestNews();
