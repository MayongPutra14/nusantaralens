import { FaInstagram, FaEnvelope, FaTiktok } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  return (
    <footer className="relative w-full bg-bianca-50 flex flex-col justify-end overflow-hidden pt-20">

      {/* --- SVG GELOMBANG --- */}
      <div className="w-full leading-none z-10 translate-y-[1px]">
        <svg 
          className="w-full h-auto block min-h-[80px] md:min-h-[150px] lg:min-h-[200px]" 
          viewBox="0 0 1440 250" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,96L80,112C160,128,320,160,480,154.7C640,149,800,107,960,101.3C1120,96,1280,128,1360,144L1440,160V250H1360C1280,250,1120,250,960,250C800,250,640,250,480,250C320,250,160,250,80,250H0V96Z" 
            fill="#856647" 
          />
        </svg>
      </div>

      {/* --- AREA KONTEN UTAMA FOOTER (KOTAK COKELAT) --- */}
      <div className="relative w-full bg-[#856647] text-white pt-8 md:pt-12 z-20 flex flex-col">
        
        {/* GRID LAYOUT */}
        <div className="max-w-7xl w-full mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 md:pb-24">
          
          {/* KOLOM 1: BRANDING */}
          <div data-aos="fade-up" className="md:col-span-5 flex flex-col">
            <h2 className="text-3xl md:text-[40px] font-bold font-base mb-3 md:mb-5 tracking-wide drop-shadow-sm">
              Nusantaralens
            </h2>
            <p className="text-gray-200 font-teachers text-sm md:text-base leading-relaxed italic w-full md:w-4/5">
              Menjembatani warisan masalalu dengan teknologi masa kini untuk masa depan Indonesia.
            </p>
          </div>

          {/* KOLOM 2: NAVIGATIONS */}
          <div data-aos="fade-up" data-aos-delay="200" className="md:col-span-4 flex flex-col md:pl-16">
            <h3 className="text-2xl md:text-[28px] font-bold font-base mb-6 md:mb-8 drop-shadow-sm">
              Navigations
            </h3>
            <ul className="flex flex-col gap-4 md:gap-6 font-teachers text-gray-200 text-sm md:text-base">
              <li className="hover:text-white hover:translate-x-2 transition-all duration-300 w-fit">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-white hover:translate-x-2 transition-all duration-300 w-fit">
                <Link to="/ai-assistant">AI Assistant</Link>
              </li>
              <li className="hover:text-white hover:translate-x-2 transition-all duration-300 w-fit">
                <Link to="/insights">Insights Peta</Link>
              </li>
              <li className="hover:text-white hover:translate-x-2 transition-all duration-300 w-fit">
                <Link to="/explore/budaya">- Eksplor Budaya</Link>
              </li>
              <li className="hover:text-white hover:translate-x-2 transition-all duration-300 w-fit">
                <Link to="/explore/pahlawan">- Eksplor Pahlawan</Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: CONTACT US */}
          <div data-aos="fade-left" data-aos-delay="400" className="md:col-span-3 flex flex-col items-start gap-4 md:gap-6 md:pl-8">
            <div className="flex gap-6 mt-2 md:mt-0">
              <a href="#" className="text-white hover:text-gray-300 hover:-translate-y-1 transform transition-all duration-300">
                <FaInstagram size={26} className="md:text-[32px]" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 hover:-translate-y-1 transform transition-all duration-300">
                <FaEnvelope size={26} className="md:text-[32px]" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 hover:-translate-y-1 transform transition-all duration-300">
                <FaTiktok size={26} className="md:text-[32px]" />
              </a>
            </div>
            <h3 className="text-2xl md:text-[28px] font-bold font-base drop-shadow-sm mt-2">
              Contact Us
            </h3>
          </div>

        </div>

        {/* COPYRIGHT BOTTOM STRIP (Lebih Gelap) */}
        <div className="w-full bg-[#694F36] py-6 md:py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-8 md:px-16 flex justify-center">
            <p className="text-gray-300 font-teachers text-sm text-center tracking-wide">
              ©2026 Nusantaralens | All Right Reserved
            </p>
          </div>
        </div>

      </div>

    </footer>
  );
};

export default FooterSection;