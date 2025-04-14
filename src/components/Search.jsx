const Search = ({
  value = "",
  onChange = () => {},
  placeholder = "輸入關鍵字搜尋新聞",
  className = "",
  onSearch = () => {},
}) => {
  return (
    <div className={`w-full max-w-xl mx-auto ${className}`}>
      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border border-gray-300 px-4 py-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={onSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          搜尋
        </button>
      </div>
    </div>
  );
};

export default Search;
