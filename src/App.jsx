import { useState, useEffect } from "react";
import Search from "./components/Search";
import Button from "./components/Button";
import NewsItem from "./components/NewsItem";

function App() {
  // 關鍵字
  const [keyword, setKeyword] = useState("");

  // 新聞資料
  const [news, setNews] = useState([]);

  // 字體大小
  const [fontSize, setFontSize] = useState(
    localStorage.getItem("fontSize") || "text-base"
  );

  // 控制字體大小
  const handleFontSizeChange = (size) => {
    setFontSize(size);
    localStorage.setItem("fontSize", size);
  };

  // 搜尋
  const handleSearch = () => {
    fetch(`http://localhost:3000/api/news?keyword=${keyword}`)
      .then((r) => r.json())
      .then((obj) => {
        console.log(obj);
        setNews(obj);
      })
      .catch(console.warn);
  };

  // 首次渲染
  useEffect(() => {
    fetch(`http://localhost:3000/api/news?keyword=${keyword}`)
      .then((r) => r.json())

      .then((obj) => {
        console.log(obj);
        setNews(obj);
      })
      .catch(console.warn);
  }, []);

  return (
    <div className="App">
      <div className="p-4 max-w-4xl mx-auto">
        <div className="mb-4 flex flex-col sm:flex-row  justify-between gap-2">
          <div className="w-full sm:w-1/2 ">
            <Search
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={"Search news"}
              onSearch={handleSearch}
            />
          </div>

          <div className="w-full sm:w-1/2 text-left sm:text-right">
            <Button
              onClick={() => handleFontSizeChange("text-sm")}
              className={`mr-2 ${
                fontSize === "text-sm"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-200 text-black"
              }`}
            >
              Small
            </Button>

            <Button
              onClick={() => handleFontSizeChange("text-base")}
              className={`mr-2 ${
                fontSize === "text-base"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-200 text-black"
              }`}
            >
              Medium
            </Button>

            <Button
              onClick={() => handleFontSizeChange("text-lg")}
              className={`mr-2 ${
                fontSize === "text-lg"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-200 text-black"
              }`}
            >
              Large
            </Button>
          </div>
        </div>

        <div className={`news-list ${fontSize}`}>
          {news.length > 0 ? (
            news.map((item, index) => (
              <NewsItem
                key={index}
                title={item.標題}
                content={item.內容}
                date={item.上版日期}
                sourceUrl={item.來源網址}
              />
            ))
          ) : (
            <p>No news found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
