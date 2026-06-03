import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import wayangKiri from '../assets/hero/wayang-kiri.png';
import wayangKanan from '../assets/hero/wayang-kanan.png';
import gunungan from '../assets/hero/gunungan-jawa.png';
import awanCluster from '../assets/hero/awan-cluster.svg';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen bg-bianca-50 flex flex-col items-center justify-start md:justify-center overflow-hidden px-4 sm:px-6 pt-28 sm:pt-40 md:pt-0">
      
      {/* --- ORNAMEN BACKGROUND --- */}
      {/* Wayang Kiri */}
      <img data-aos="fade-in" data-aos-duration="1500" src={wayangKiri} alt="Wayang Kiri" className="absolute left-[-2%] sm:left-[-1%] md:left-[-2%] bottom-0 h-[40%] xs:h-[50%] sm:h-[60%] md:h-[85%] opacity-100 z-0 pointer-events-none transition-all duration-300" />
      
      {/* Wayang Kanan */}
      <img data-aos="fade-in" data-aos-duration="1500" src={wayangKanan} alt="Wayang Kanan" className="absolute right-[-2%] sm:right-[-1%] md:right-[-2%] bottom-0 h-[40%] xs:h-[50%] sm:h-[60%] md:h-[85%] opacity-100 z-0 pointer-events-none transition-all duration-300" />
      
      {/* --- CLUSTER AWAN --- */}
      {/* Awan Kanan Atas */}
      <img 
        src={awanCluster} 
        alt="Awan Cluster" 
        className="absolute top-20 sm:top-24 md:top-32 right-[5%] sm:right-[10%] md:right-[18%] w-16 sm:w-20 md:w-40 z-0 opacity-80 pointer-events-none transition-all duration-300" 
      />

      {/* Awan Kiri Bawah */}
      <img 
        src={awanCluster} 
        alt="Awan Cluster" 
        className="absolute bottom-20 sm:bottom-24 md:bottom-32 left-[5%] sm:left-[10%] md:left-[18%] w-16 sm:w-20 md:w-40 z-0 opacity-80 pointer-events-none transition-all duration-300" 
      />

      {/* --- KONTEN UTAMA --- */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mt-0 md:mt-0">
        <img src={gunungan} alt="Gunungan" className="w-12 sm:w-16 md:w-24 mb-4 md:mb-6 transition-all duration-300" />

        <h1 data-aos="fade-down" className="text-4xl sm:text-5xl md:text-[72px] font-base text-swirl-600 mb-4 md:mb-6 drop-shadow-md leading-[1.2] xs:leading-tight md:leading-[1.15] font-bold transition-all duration-300 max-w-[300px] xs:max-w-[400px] md:max-w-none">
          Jelajahi Kekayaan <br /> Budaya Indonesia
        </h1>
        
        <p data-aos="fade-up" data-aos-delay="200" className="text-xs sm:text-sm md:text-lg font-teachers text-roman-coffee-800 mb-8 md:mb-10 max-w-2xl leading-relaxed">
          Dari keberanian para pahlawan hingga keajaiban bahasa daerah. 
          Jelajahi warisan agung Nusantara yang mendunia dalam satu platform terpadu.
        </p>

        {/* TOMBOL */}
        <button data-aos="zoom-in" data-aos-delay="400" onClick={() => navigate('/insights')} className="flex items-center justify-between bg-white text-inv-base w-[190px] h-[55px] rounded-full pl-6 pr-2 font-bold font-teachers hover:bg-gray-50 transition shadow-lg border border-gray-200 group">
          <span className="text-sm">Mulai Menjelajah</span>
          <span className="bg-inv-base text-white p-2.5 rounded-full group-hover:bg-roman-coffee-800 transition">
            <FaArrowRight size={14} />
          </span>
        </button>

      </div>
    </section>
  );
};

export default HeroSection;