const API_KEY = `fee0da4c686f44969b929bbc84192c2a`;

//뉴스 불러오는 함수
const getLatestNews = () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  //url 호출
  const response = fetch(url);
};

getLatestNews();
