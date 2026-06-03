import { useState, useRef, useEffect } from 'react';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom'; // 1. IMPORT useNavigate

// --- GAMBAR BACKGROUND ---
import bgCulture from '../assets/preview/bg-candi.png'; 
import bgHistory from '../assets/preview/bg-sejarah.png'; 
import bgLanguage from '../assets/preview/bg-bahasa.png'; 

// --- GAMBAR KARTU ---
import imgBatik from '../assets/preview/card-batik.png';
import imgSoedirman from '../assets/preview/card-soedirman.png';
import imgKomunikasi from '../assets/preview/card-komunikasi.png';

const PreviewSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const isAutoScrolling = useRef(false);

  const carouselData = [
    {
      id: 1,
      title: "Budaya",
      desc: "Budaya Indonesia bukan sekadar warisan, tapi sumber inspirasi yang tak ada habisnya. Mari menyelami ragam adat dan karya seni ikonik yang membuat dunia terpana pada pesona Nusantara.",
      bgImg: bgCulture,
      cardImg: imgBatik,
      cardTitleFront: "Batik",
      cardTitleBack: "Batik Nusantara",
      cardDescBack: "Karya seni ikonik warisan leluhur yang diakui dunia.",
      route: "/explore/budaya"
    },
    {
      id: 2,
      title: "Sejarah",
      desc: "Di balik kemerdekaan yang kita hirup, ada jejak keberanian dan pengorbanan yang tak ternilai. Kenali lebih dekat sosok-sosok tangguh yang berdiri di garis depan demi menyatukan ribuan pulau dalam satu bangsa.",
      bgImg: bgHistory,
      cardImg: imgSoedirman,
      cardTitleFront: "Jendral Soedirman",
      cardTitleBack: "Sang Panglima",
      cardDescBack: "Tokoh pahlawan nasional yang pantang menyerah.",
      route: "/explore/pahlawan"
    },
    {
      id: 3,
      title: "Bahasa",
      desc: "Setiap daerah punya cerita, setiap bahasa punya jiwa. Mulai perjalanan bahasamu hari ini dan lestarikan kekayaan tutur kata bangsa melalui kamus bahasa daerah yang ada di NusantaraLens.",
      bgImg: bgLanguage,
      cardImg: imgKomunikasi,
      cardTitleFront: "Komunikasi",
      cardTitleBack: "Bahasa & Sastra",
      cardDescBack: "Ragam bahasa daerah penunjang persatuan bangsa.",
      route: "/explore/bahasa"
    }
  ];

  // --- LOGIC ANIMASI SCROLL ANTI-BENTROK ---
  const scrollToCard = (index) => {
    isAutoScrolling.current = true; // Aktifkan wasit, stop sensor swipe sementara
    setActiveIndex(index);
    
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.querySelector(`[data-index="${index}"]`);
      if (card) {
        const scrollPos = card.offsetLeft - (container.offsetWidth / 2) + (card.offsetWidth / 2);
        container.scrollTo({ left: scrollPos, behavior: 'smooth' });
      }
    }

    // Matikan wasit setelah animasi scroll selesai (sekitar 600ms)
    setTimeout(() => {
      isAutoScrolling.current = false;
    }, 600);
  };

  const handleNext = () => scrollToCard((activeIndex + 1) % carouselData.length);
  const handlePrev = () => scrollToCard((activeIndex - 1 + carouselData.length) % carouselData.length);

  // Sync scroll manual di HP
  useEffect(() => {
    const handleScroll = () => {
      if (isAutoScrolling.current) return; 

      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const centerPosition = container.scrollLeft + (container.offsetWidth / 2);

        let closestIndex = 0;
        let minDistance = Infinity;

        Array.from(container.children).forEach((child) => {
          const indexStr = child.getAttribute('data-index');
          if (indexStr !== null) {
            const index = parseInt(indexStr, 10);
            const childCenter = child.offsetLeft + (child.offsetWidth / 2);
            const distance = Math.abs(centerPosition - childCenter);

            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          }
        });

        if (closestIndex !== activeIndex) {
          setActiveIndex(closestIndex);
        }
      }
    };
    
    const container = scrollContainerRef.current;
    if (container) container.addEventListener('scroll', handleScroll);
    return () => { if (container) container.removeEventListener('scroll', handleScroll); };
  }, [activeIndex]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col md:flex-row items-center bg-transparent pt-20 pb-32 md:pb-0">
      
      {/* 1. BACKGROUND LAYER */}
      {carouselData.map((data, index) => (
        <img 
          key={data.id}
          src={data.bgImg} 
          alt="Background" 
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            activeIndex === index ? 'opacity-100' : 'opacity-0'
          }`} 
        />
      ))}
      <div className="absolute inset-0 bg-black/50 z-10 transition-colors duration-500" /> 
      <div className="absolute inset-x-0 bottom-0 h-1/2 z-10 bg-gradient-to-t from-black/90 to-transparent pointer-events-none"></div>

      {/* 2. KONTEN UTAMA */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-0 md:px-16 flex flex-col md:flex-row items-center justify-between h-full gap-8 md:gap-0 mt-8 md:mt-0 pb-10 md:pb-0">
        
        {/* KIRI: TEKS */}
        <div className="w-full md:w-5/12 text-white flex flex-col items-start px-6 md:px-0 order-2 md:order-1 relative z-30">
          <h2 data-aos="fade-right" className="text-4xl md:text-[80px] font-base font-bold mb-4 drop-shadow-md leading-tight">
            {carouselData[activeIndex].title}
          </h2>
          <p data-aos="fade-in" data-aos-delay="200" className="text-sm md:text-lg font-teachers leading-relaxed mb-6 md:mb-8 text-gray-200 min-h-[100px] md:min-h-[120px]">
             {carouselData[activeIndex].desc}
          </p>
          
          {/* 4. EKSEKUSI KLIK TOMBOL DINAMIS */}
          <button 
            onClick={() => navigate(carouselData[activeIndex].route)} 
            data-aos="fade-up" 
            className="flex items-center justify-between bg-white text-inv-base w-[170px] md:w-[190px] h-[45px] md:h-[55px] rounded-full pl-5 pr-1.5 md:pl-6 md:pr-2 font-bold font-teachers hover:bg-gray-100 transition shadow-lg group"
          >
            <span className="text-xs md:text-sm">Mulai Menjelajah</span>
            <span className="bg-inv-base text-white p-2 md:p-2.5 rounded-full group-hover:bg-roman-coffee-800 transition">
              <FaArrowRight size={12} className="md:text-sm" />
            </span>
          </button>
        </div>

        {/* KANAN: KARTU NATIVE */}
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          ref={scrollContainerRef}
          className="w-full md:w-7/12 flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 md:px-10 py-4 order-1 md:order-2 scroll-smooth relative"
        >
          {carouselData.map((card, index) => (
            <div 
              key={card.id} 
              data-index={index}
              className={`relative flex-shrink-0 snap-center group [perspective:2000px] cursor-pointer transition-all duration-500
                w-[220px] h-[340px] md:w-[260px] md:h-[420px]
                ${activeIndex === index ? 'opacity-100 scale-100 z-30' : 'opacity-60 scale-95 hover:opacity-80 z-10'}
              `}
              onClick={() => scrollToCard(index)}
            >
              <div className="relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-3xl will-change-transform bg-black/50 shadow-2xl">
                
                <div className="absolute inset-[1px] w-full h-full rounded-3xl overflow-hidden [backface-visibility:hidden] [transform:translateZ(1px)] bg-black">
                  <img src={card.cardImg} alt={card.cardTitleFront} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <h3 className="absolute bottom-6 left-5 text-white font-bold font-base text-xl md:text-[28px] drop-shadow-md leading-tight">
                    {card.cardTitleFront.split(' ').map((word, i) => (
                      <span key={i}>{word}<br/></span>
                    ))}
                  </h3>
                </div>

                <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-menu-bg/95 backdrop-blur-md p-5 md:p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] border border-white/20 z-20">
                   <h3 className="text-white font-bold font-base text-lg md:text-2xl mb-2 md:mb-3">{card.cardTitleBack}</h3>
                   <p className="text-sm md:text-base font-teachers text-gray-200">{card.cardDescBack}</p>
                </div>

              </div>
            </div>
          ))}
          <div className="w-[30vw] md:hidden flex-shrink-0" aria-hidden="true"></div>
        </div>
      </div>

      {/* 3. NAVIGASI BAWAH */}
      <div className="absolute bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-4 bg-black/30 backdrop-blur-sm py-2 px-6 rounded-full border border-white/10">
        <button onClick={handlePrev} className="bg-menu-bg text-white w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full hover:bg-roman-coffee-800 transition shadow-lg">
          <FaChevronLeft size={12} className="md:text-sm" />
        </button>
        <div className="flex gap-2 md:gap-3 px-2">
          {carouselData.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => scrollToCard(idx)} 
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-white scale-125 shadow-md' : 'border border-white/70 hover:bg-white/50'}`} 
            />
          ))}
        </div>
        <button onClick={handleNext} className="bg-menu-bg text-white w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full hover:bg-roman-coffee-800 transition shadow-lg">
          <FaChevronRight size={12} className="md:text-sm" />
        </button>
      </div>
    </section>
  );
};

export default PreviewSection;