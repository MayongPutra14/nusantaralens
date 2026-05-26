import { FaArrowRight } from 'react-icons/fa';

// Mengimpor aset gambar dari folder assets
import mapImg from '../assets/hero/peta-indonesia.png';
import candiImg from '../assets/hero/candi-borobudur.png';
import pahlawanImg from '../assets/hero/pahlawan.png';

const HeroSection = () => {
  return (
    // SECTION UTAMA: Membungkus seluruh area Hero. 
    <section 
      className="text-white min-h-screen relative overflow-hidden flex items-center pt-[77px]"
      style={{ background: '#274338' }}
    >
      {/* 1. LAYER PALING BAWAH (z-0): Gambar Candi Borobudur */}
      <img 
        src={candiImg} 
        alt="Background Candi" 
        className="absolute inset-0 w-full h-full object-cover opacity-75 z-0"
      />

      {/* 2. LAYER TENGAH (z-10): Efek Gradient / Bayangan Gelap */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          background: 'linear-gradient(to right, #274338 0%, #274338 30%, rgba(63, 88, 78, 0.7) 74%)' 
        }}
      ></div>

      {/* 3. LAYER ATAS (z-20): Gambar Peta Indonesia */}
      <img 
        src={mapImg} 
        alt="Background Peta" 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-none object-contain opacity-30 z-20 pointer-events-none"
      />

      {/* 4. LAYER KONTEN UTAMA (z-40): Tempat Judul, Teks Deskripsi, dan Tombol */}
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 relative z-40">
        <div className="md:w-full mt-10 md:mt-0 pb-10">
          
          {/* JUDUL UTAMA (Headline) */}
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold font-teachers leading-tight mb-8">
            Jelajahi <span className="block md:inline">Kekayaan</span>
            <span className="block text-nl-brown mt-4 md:mt-6">Budaya Indonesia</span>
          </h1>
          
          {/* TEKS DESKRIPSI (Sub-headline) */}
          <p className="text-base md:text-lg font-teachers mb-10 max-w-xl leading-relaxed text-gray-200">
            Dari keberanian para pahlawan hingga keajaiban bahasa daerah. Jelajahi warisan agung Nusantara yang mendunia dalam satu platform terpadu.
          </p>
          
          {/* TOMBOL (Call to Action / CTA) */}
          <button className="flex items-center justify-between bg-white text-nl-green w-[186px] h-[55px] rounded-full pl-5 pr-2 font-bold font-teachers hover:bg-gray-100 transition shadow-lg group">
            <span className="text-sm">Mulai Menjelajah</span>
            <span className="bg-nl-green text-white p-2.5 rounded-full group-hover:bg-[#1a2d25] transition">
              <FaArrowRight size={14} />
            </span>
          </button>
        </div>
      </div>

      {/* 5. LAYER GAMBAR PAHLAWAN (z-30) */}
      <div className="absolute bottom-0 -right-4 z-30 h-[75%] md:h-[90%] w-[60%] md:max-w-[55%] flex items-end pointer-events-none">
        <img 
          src={pahlawanImg} 
          alt="Pahlawan Nusantara" 
          className="h-full w-full object-contain object-right-bottom drop-shadow-2xl"
        />
      </div>

    </section>
  );
};

export default HeroSection;