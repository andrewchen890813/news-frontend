import { useState, useEffect } from "react";
import Search from "./components/Search";
import Button from "./components/Button";
import NewsItem from "./components/NewsItem";
import Pagination from "./components/Pagination";

function App() {
  // 關鍵字
  const [keyword, setKeyword] = useState("");

  // 新聞資料
  const [news, setNews] = useState([]);

  // 字體大小
  const [fontSize, setFontSize] = useState(
    localStorage.getItem("fontSize") || "text-base"
  );
  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // 控制字體大小
  const handleFontSizeChange = (size) => {
    setFontSize(size);
    localStorage.setItem("fontSize", size);
  };

  // 每頁幾筆
  const ITEMS_PER_PAGE = 10;
  // 目前頁碼狀態
  const [currentPage, setCurrentPage] = useState(1);
  // 總頁數
  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  //
  const paginatedNews = news.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 本地後端
  // fetch(`http://localhost:3000/api/news?keyword=${keyword}`);

  // 搜尋
  const handleSearch = () => {
    setIsLoading(true);
    fetch(
      `https://us-central1-news-app-e6d68.cloudfunctions.net/api/news?keyword=${keyword}`
    )
      .then((r) => r.json())
      .then((obj) => {
        console.log(obj);
        if (!Array.isArray(obj)) {
          throw new Error("回傳資料不是陣列");
        }
        setNews(obj);
        setCurrentPage(1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  // 首次渲染
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://us-central1-news-app-e6d68.cloudfunctions.net/api/news?keyword=${keyword}`
    )
      .then((r) => r.json())

      .then((obj) => {
        console.log(obj);
        if (!Array.isArray(obj)) {
          throw new Error("回傳資料不是陣列");
        }
        setNews(obj);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
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
              小
            </Button>

            <Button
              onClick={() => handleFontSizeChange("text-base")}
              className={`mr-2 ${
                fontSize === "text-base"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-200 text-black"
              }`}
            >
              中
            </Button>

            <Button
              onClick={() => handleFontSizeChange("text-lg")}
              className={`mr-2 ${
                fontSize === "text-lg"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-200 text-black"
              }`}
            >
              大
            </Button>
          </div>
        </div>

        <div className={`news-list ${fontSize}`}>
          {isLoading ? (
            <p>Loading...</p>
          ) : news.length > 0 ? (
            paginatedNews.map((item, index) => (
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
        {!isLoading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
