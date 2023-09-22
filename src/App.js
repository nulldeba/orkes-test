import { useEffect, useRef, useState } from "react";
import "./App.css";
import { NewsCard } from "./NewsCard";

function App() {
  const [newsData, setNewsData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isDataExist, setIsDataExist] = useState(true);
  const ref = useRef(null);

  const fetchNews = async () => {
    const response = await fetch(`http://localhost:3001/${pageNumber}`);
    const newsResponse = await response.json();
    if (newsResponse.length === 0) {
      setIsDataExist(false);
    } else {
      setNewsData((prev) => [...prev, ...newsResponse]);
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && isDataExist) {
      fetchNews();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [newsData]);

  return (
    <div className="App">
      <h2>Daily News</h2>
      <div className="news-container">
        {newsData.map((news) => {
          return <NewsCard news={news.node} />;
        })}
      </div>
      {isDataExist && (
        <div ref={ref} className="loading-div">
          Loading More data
        </div>
      )}
    </div>
  );
}

export default App;
