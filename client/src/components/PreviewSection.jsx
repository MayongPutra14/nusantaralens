import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import bgCandi from '../assets/preview/bg-candi.png'; 
import overlayGelap from '../assets/preview/overlay-gelap.png'; 
import imgBatik from '../assets/preview/card-batik.png';
import imgSoedirman from '../assets/preview/card-soedirman.png';
import imgKomunikasi from '../assets/preview/card-komunikasi.png';

const PreviewSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center bg-black">
      
      {/* 1. BACKGROUND LAYER */}
      <img src={bgCandi} alt="Background Preview" className="absolute inset-0 w-full h-full object-cover z-0" />
      <img src={overlayGelap} alt="Overlay Gelap" className="absolute inset-0 w-full h-full object-cover z-10 opacity-60" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

      {/* 2. KONTEN UTAMA */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between h-full pt-24 pb-32">
        
        {/* KIRI: TEKS */}
        <div className="md:w-5/12 text-white">
          <h2 className="text-5xl md:text-6xl font-bold font-teachers mb-6 tracking-wide">Budaya</h2>
          <p className="text-base md:text-lg font-teachers leading-relaxed mb-8 text-gray-200">
            Budaya Indonesia bukan sekadar warisan, tapi sumber inspirasi yang tak ada habisnya. Mari menyelami ragam adat dan karya seni ikonik yang membuat dunia terpana pada pesona Nusantara.
          </p>
          <button className="flex items-center justify-between bg-white text-nl-green w-[186px] h-[55px] rounded-full pl-5 pr-2 font-bold font-teachers hover:bg-gray-100 transition shadow-lg group">
            <span className="text-sm">Mulai Menjelajah</span>
            <span className="bg-nl-green text-white p-2.5 rounded-full group-hover:bg-[#1a2d25] transition">
              <FaArrowRight size={14} />
            </span>
          </button>
        </div>

        {/* KANAN: KARTU GLASSMORPHISM */}
        <div className="md:w-7/12 flex gap-4 md:gap-6 justify-end items-center h-[400px] mt-12 md:mt-0">
          
          {/* KARTU 1: BATIK */}
          <div className="relative w-1/3 h-full group [perspective:2000px] cursor-pointer">
            <div className="relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl will-change-transform">
              <div className="absolute inset-[1px] w-full h-full rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:translateZ(1px)] shadow-2xl">
                <img src={imgBatik} alt="Batik" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <h3 className="absolute bottom-6 left-6 text-white font-bold font-teachers text-xl md:text-2xl">Batik</h3>
              </div>
              {/* BACK SIDE: GLASS EFFECT */}
              <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-[#274338]/80 backdrop-blur-md p-4 flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] border border-white/20 shadow-2xl">
                 <h3 className="text-white font-bold font-['Merriweather_Sans'] text-lg mb-2">Batik Nusantara</h3>
                 <p className="text-sm font-teachers text-gray-200">Karya seni ikonik warisan leluhur yang diakui dunia.</p>
              </div>
            </div>
          </div>

          {/* KARTU 2: SOEDIRMAN */}
          <div className="relative w-1/3 h-[90%] group [perspective:2000px] cursor-pointer opacity-90 hover:opacity-100 transition-opacity duration-300">
            <div className="relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl will-change-transform">
              <div className="absolute inset-[1px] w-full h-full rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:translateZ(1px)] shadow-xl">
                <img src={imgSoedirman} alt="Jendral Soedirman" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <h3 className="absolute bottom-6 left-6 text-white font-bold font-teachers text-lg md:text-xl leading-tight">Jendral <br/> Soedirman</h3>
              </div>
              {/* BACK SIDE: GLASS EFFECT */}
              <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-[#274338]/80 backdrop-blur-md p-4 flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] border border-white/20 shadow-xl">
                 <h3 className="text-white font-bold font-['Merriweather_Sans'] text-lg mb-2">Sang Panglima</h3>
                 <p className="text-sm font-teachers text-gray-200">Tokoh pahlawan nasional yang pantang menyerah.</p>
              </div>
            </div>
          </div>

          {/* KARTU 3: KOMUNIKASI */}
          <div className="relative w-1/3 h-[80%] group [perspective:2000px] cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300">
            <div className="relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl will-change-transform">
              <div className="absolute inset-[1px] w-full h-full rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:translateZ(1px)] shadow-xl">
                <img src={imgKomunikasi} alt="Komunikasi" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <h3 className="absolute bottom-6 left-6 text-white font-bold font-teachers text-base md:text-lg">Komunikasi</h3>
              </div>
              {/* BACK SIDE: GLASS EFFECT */}
              <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-[#274338]/80 backdrop-blur-md p-4 flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] border border-white/20 shadow-xl">
                 <h3 className="text-white font-bold font-['Merriweather_Sans'] text-lg mb-2">Bahasa & Sastra</h3>
                 <p className="text-sm font-teachers text-gray-200">Ragam bahasa daerah penunjang persatuan bangsa.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. NAVIGASI BAWAH */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-6">
        <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/40 transition border border-white/30">
          <FaChevronLeft size={16} />
        </button>
        <div className="flex gap-3">
          <div className="w-3 h-3 rounded-full bg-white shadow-md"></div>
          <div className="w-3 h-3 rounded-full border border-white opacity-50"></div>
          <div className="w-3 h-3 rounded-full border border-white opacity-50"></div>
        </div>
        <button className="bg-white text-nl-green p-3 rounded-full hover:bg-gray-200 transition shadow-lg">
          <FaChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default PreviewSection;