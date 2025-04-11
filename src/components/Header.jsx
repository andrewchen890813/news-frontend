import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-blue-600">新聞網 NewsPortal</h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-700 hover:text-blue-600">
            首頁
          </a>
          <a href="/about" className="text-gray-700 hover:text-blue-600">
            關於我們
          </a>
        </nav>

        {/* Hamburger menu button (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile nav menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <a
            href="/"
            className="block text-gray-700 py-2 hover:text-blue-600 font-bold"
          >
            首頁
          </a>
          <a
            href="/about"
            className="block text-gray-700 py-2 hover:text-blue-600 font-bold"
          >
            關於我們
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
