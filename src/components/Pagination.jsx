import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function Pagination({
  currentPage = 0,
  totalPages = 0,
  onPageChange = () => {},
}) {
  if (totalPages <= 1) return null;

  // 取得欲顯示的頁碼陣列
  const createPageArray = () => {
    const pages = [];

    let start = currentPage - 2;
    let end = currentPage + 2;

    if (start < 1) {
      end += 1 - start;
      start = 1;
    }

    if (end > totalPages) {
      start -= end - totalPages;
      end = totalPages;
    }

    // 確保 start 不會小於 1
    start = Math.max(1, start);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <div className="inline-flex min-w-full justify-center items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded bg-gray-300 disabled:opacity-50 cursor-pointer"
        >
          <FaAngleLeft />
        </button>

        {createPageArray().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded text-sm cursor-pointer ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded bg-gray-300 disabled:opacity-50 cursor-pointer"
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
