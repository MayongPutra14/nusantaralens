import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaXmark, FaChevronDown } from 'react-icons/fa6';

const NavbarSection = ({ isAbsoluteBg }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreMobileOpen, setIsExploreMobileOpen] = useState(false);
  
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 50);

      const vh = window.innerHeight;
      const heroTransitionArea = vh * 0.9; 
      const previewInArea = vh * 1.0; 
      const previewOutArea = vh * 1.9;

      if (isHomePage) {
        if (scrollPos > heroTransitionArea && scrollPos < previewInArea) {
          setIsDarkSection(false);
        } else if (scrollPos >= previewInArea && scrollPos < previewOutArea) {
          setIsDarkSection(true);
        } else if (scrollPos >= previewOutArea) {
          setIsDarkSection(false);
        } else {
          setIsDarkSection(false);
        }
      } else {
        setIsDarkSection(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // --- LOGIC KELAS DINAMIS NAVBAR ---
  let navClasses = "fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ";
  let textClasses = "";
  let brandClasses = "";
  let hoverClasses = "";

  if (isMobileMenuOpen) {
    navClasses += "bg-bianca-50 shadow-lg py-4";
    textClasses = "text-inv-base";
    brandClasses = "text-inv-base";
    hoverClasses = "hover:text-inv-accent"; 
  } else if (isAbsoluteBg) {
    navClasses += "bg-[#9E7D5C] shadow-md py-4";
    textClasses = "text-white";
    brandClasses = "text-white";
    hoverClasses = "hover:text-gray-300";
  } else if (isDarkSection) {
    navClasses += "bg-black/5 backdrop-blur-xl shadow-lg text-white py-4";
    textClasses = "text-white";
    brandClasses = "text-white";
    hoverClasses = "hover:text-gray-300";
  } else if (isScrolled) {
    navClasses += "bg-bianca-50/80 backdrop-blur-md shadow-sm text-inv-base py-4";
    textClasses = "text-inv-base";
    brandClasses = "text-inv-base";
    hoverClasses = "hover:text-inv-accent"; 
  } else {
    navClasses += "bg-transparent text-inv-base py-6";
    textClasses = "text-inv-base";
    brandClasses = "text-inv-base";
    hoverClasses = "hover:text-inv-accent"; 
  }

  return (
    <nav className={navClasses}>
      <div className="flex justify-between items-center px-6 md:px-16 transition-all duration-300">
        
        {/* LOGO BRAND */}
        <div className={`text-xl md:text-2xl font-bold font-base ${brandClasses}`}>
          <Link to="/">Nusantaralens</Link>
        </div>

        {/* --- MENU DESKTOP --- */}
        <ul className={`hidden md:flex items-center gap-8 font-teachers text-sm md:text-base font-medium ${textClasses}`}>
          <li className={`cursor-pointer transition ${hoverClasses}`}><Link to="/">Home</Link></li>
          
          {/* MENU EXPLORE */}
          <li className="relative group cursor-pointer py-4">
            <div className={`flex items-center gap-1.5 transition ${hoverClasses}`}>
              Explore <FaChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300" />
            </div>
            
            {/* KOTAK DROPDOWN (Hover di sini tetap cokelat karena bg kotak putih) */}
            <div className="absolute top-[100%] left-[-20px] w-56 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden text-inv-base z-50">
              <Link to="/explore/pahlawan" className="px-5 py-3 hover:bg-bianca-50 hover:text-inv-accent transition border-b border-gray-50">Galeri Pahlawan</Link>
              <Link to="/explore/kamus" className="px-5 py-3 hover:bg-bianca-50 hover:text-inv-accent transition border-b border-gray-200">Kamus Bahasa Daerah</Link>
              <Link to="/explore/budaya" className="px-5 py-3 hover:bg-bianca-50 hover:text-inv-accent transition">Budaya & Tradisi</Link>
            </div>
          </li>

          <li className={`cursor-pointer transition ${hoverClasses}`}><Link to="/ai-assistant">AI Assistant</Link></li>
          <li className={`cursor-pointer transition ${hoverClasses}`}><Link to="/insights">Insights</Link></li>
        </ul>

        {/* --- TOMBOL HAMBURGER --- */}
        <button 
          className={`md:hidden text-2xl p-2 focus:outline-none transition ${hoverClasses}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {/* --- MENU MOBILE --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg text-inv-base flex flex-col py-4 px-6 gap-2 font-teachers animate-fade-in z-50">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-inv-accent py-3 border-b border-gray-50 font-medium">Home</Link>
          
          <div className="flex flex-col border-b border-gray-50">
            <button onClick={() => setIsExploreMobileOpen(!isExploreMobileOpen)} className="flex items-center justify-between py-3 font-medium hover:text-inv-accent">
              Explore <FaChevronDown size={12} className={`transition-transform duration-300 ${isExploreMobileOpen ? 'rotate-180' : ''}`} />
            </button>
            {isExploreMobileOpen && (
              <div className="flex flex-col pl-4 pb-2 gap-2 text-sm text-gray-600">
                <Link to="/explore/pahlawan" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-inv-accent">Galeri Pahlawan</Link>
                <Link to="/explore/kamus" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-inv-accent">Kamus Bahasa Daerah</Link>
                <Link to="/explore/budaya" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-inv-accent">Budaya & Tradisi</Link>
              </div>
            )}
          </div>
          <Link to="/ai-assistant" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-inv-accent py-3 border-b border-gray-50 font-medium">AI Assistant</Link>
          <Link to="/insights" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-inv-accent py-3 font-medium">Insights</Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarSection;