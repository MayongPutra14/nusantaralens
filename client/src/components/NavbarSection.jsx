import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaXmark } from 'react-icons/fa6';

const NavbarSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State untuk buka/tutup menu HP
  
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 1.8);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

  // Kalau menu mobile lagi kebuka, paksa mode terang biar teksnya gampang dibaca
  const isLightMode = !isHomePage || isScrolled || isMobileMenuOpen;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isLightMode 
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 text-gray-800 shadow-sm' 
          : 'bg-black/20 backdrop-blur-md border-b border-white/10 text-white'
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-16 py-4">
        <div className="text-xl md:text-2xl font-bold">
          <Link to="/">Nusantaralens</Link>
        </div>

        {/* --- MENU DESKTOP --- */}
        <ul className="hidden md:flex gap-8 font-teachers text-sm md:text-base">
          <li className="cursor-pointer hover:text-[#008781] transition"><Link to="/">Home</Link></li>
          <li className="cursor-pointer hover:text-[#008781] transition">Explore</li>
          <li className="cursor-pointer hover:text-[#008781] transition"><Link to="/ai-assistant">AI Assistant</Link></li>
          <li className="cursor-pointer hover:text-[#008781] transition"><Link to="/insights">Insights</Link></li>
        </ul>

        {/* --- TOMBOL HAMBURGER (HANYA MUNCUL DI HP) --- */}
        <button 
          className="md:hidden text-2xl p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {/* --- MENU DROPDOWN MOBILE --- */}
      {/* Akan muncul kalau isMobileMenuOpen = true */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg text-gray-800 flex flex-col py-4 px-6 gap-4 font-teachers animate-fade-in">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#008781] py-2 border-b border-gray-50">Home</Link>
          <span className="hover:text-[#008781] py-2 border-b border-gray-50 cursor-pointer">Explore</span>
          <Link to="/ai-assistant" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#008781] py-2 border-b border-gray-50">AI Assistant</Link>
          <Link to="/insights" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#008781] py-2">Insights</Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarSection;