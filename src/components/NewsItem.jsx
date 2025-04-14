import React, { useState } from "react";

const NewsItem = ({ title, content, date, sourceUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // 解碼 HTML Entities 的工具函式
  function decodeHtmlEntities(text) {
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
  }

  // 解碼後的內容
  const decodedTitle = decodeHtmlEntities(title);
  const decodedContent = decodeHtmlEntities(content);

  // 限制標題長度
  const maxTitleLength = 50;
  const shortenedTitle =
    decodedTitle.length > maxTitleLength
      ? decodedTitle.slice(0, maxTitleLength) + "..."
      : decodedTitle;

  return (
    <div
      className="relative max-w-4xl mx-auto p-3  border-gray-200 flex flex-col items-start 
  hover:bg-gray-100  rounded-lg transition duration-200 mb-2"
    >
      {/* 標題變成連結 */}
      <div className="mb-2">
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-gray-900 hover:underline"
        >
          {shortenedTitle}
        </a>
      </div>

      {/* 日期 */}
      <div className="text-gray-500 mb-2">
        {new Date(date).toLocaleDateString()}
      </div>

      {/* 展開按鈕 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-600 hover:underline mb-2"
      >
        {isExpanded ? "收起" : "展開"}
      </button>

      {/* 展開後顯示的內容（垂直排） */}
      {isExpanded && (
        <div className="mt-2 w-full max-h-64 overflow-auto pr-2">
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: decodedContent }}
          />
        </div>
      )}
      {/* 底線 */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gray-300" />
    </div>
  );
};

export default NewsItem;
