import { useState, useEffect } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import burungOrnament from '../assets/heroes/burung.png';
import penariKiri from '../assets/heroes/penari-kiri.png';
import penariKanan from '../assets/heroes/penari-kanan.png';
import wayangKiri from '../assets/hero/wayang-kiri.png';
import wayangKanan from '../assets/hero/wayang-kanan.png';

const HeroesGallerySection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // State untuk API Data
  const [heroes, setHeroesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi Fetch API Pahlawan
  useEffect(() => {
    const fetchHeroes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://nusantaralens.vercel.app/heroes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '237aa5e59230a900ed4d1e632c5bf9e4a03d4f79d68ae991cd0aaaa2416b95e0'
          }
        });
        
        const result = await response.json();
        if (result.status === 'success') {
          setHeroesData(result.data.heroes || result.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data pahlawan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  // Logic Search
  const safeHeroes = Array.isArray(heroes) ? heroes : (heroes?.data || []);
  const filteredHeroes = safeHeroes.filter((hero) =>
    hero.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Logic Pagination
  const totalPages = Math.ceil(filteredHeroes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  // Potong array sesuai halaman aktif
  const currentHeroes = filteredHeroes.slice(startIndex, startIndex + itemsPerPage);

  // Handler Prev/Next
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Reset ke halaman 1 setiap kali user ngetik di kolom search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <section className="relative w-full bg-bianca-50 font-teachers flex flex-col items-center pt-32 z-10 overflow-hidden">
      
      <img src={wayangKiri} alt="Wayang Kiri" className="absolute left-0 top-[40%] -translate-y-1/2 w-10 md:w-16 lg:w-20 opacity-90 pointer-events-none" data-aos="fade-right" />
      <img src={wayangKanan} alt="Wayang Kanan" className="absolute right-0 top-[40%] -translate-y-1/2 w-10 md:w-16 lg:w-20 opacity-90 pointer-events-none" data-aos="fade-left" />

      {/* HEADER SECTION */}
      <div className="relative w-full max-w-5xl mx-auto px-6 pb-12 flex flex-col items-center text-center">
        <div data-aos="fade-left" className="absolute right-0 md:-right-10 top-5 md:top-10 w-24 md:w-36 pointer-events-none opacity-90 drop-shadow-sm">
           <img src={burungOrnament} alt="Ornamen Burung" className="w-full h-auto" />
        </div>

        <h1 data-aos="fade-down" className="text-4xl md:text-5xl lg:text-6xl font-bold font-base text-inv-accent mb-4 drop-shadow-sm leading-tight">
          Galeri Pahlawan <br /> Nasional Indonesia
        </h1>
        
        <p data-aos="fade-up" data-aos-delay="200" className="text-gray-600 max-w-2xl text-sm md:text-base leading-relaxed mb-10">
          Halaman ini merangkum catatan tokoh-tokoh yang telah ditetapkan sebagai Pahlawan Nasional Indonesia. Informasi disusun berdasarkan dokumentasi sejarah untuk memberikan gambaran mengenai profil dan latar belakang perjuangan setiap sosok.
        </p>

        {/* Input Search */}
        <div data-aos="zoom-in" data-aos-delay="400" className="w-full max-w-2xl bg-white rounded-full shadow-md flex items-center px-6 py-4 border border-gray-100 relative z-20">
          <FaMagnifyingGlass className="text-gray-400 text-lg mr-4" />
          <input 
            type="text" 
            placeholder="Cari nama pahlawan..." 
            className="flex-grow bg-transparent outline-none font-teachers text-gray-700 text-sm md:text-base placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* GRID GALERI PAHLAWAN */}
      <div className="w-full max-w-5xl mx-auto px-6 pb-16 relative z-10 min-h-[400px]">
        {isLoading ? (
          // Skeleton Loading
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-3xl overflow-hidden shadow-sm aspect-[3/4] bg-gray-200 animate-pulse relative">
                <div className="absolute bottom-0 left-0 w-full h-[35%] bg-black/20"></div>
              </div>
            ))}
          </div>
        ) : currentHeroes.length > 0 ? (
          // Data Asli
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {currentHeroes.map((hero, index) => (
              <div 
                key={hero.id} 
                data-aos="fade-up" 
                data-aos-delay={index * 50}
                className="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[3/4] bg-gray-200"
              >
                {/* Fallback jika properti gambar menggunakan nama image_url atau image */}
                <img src={hero.photo_url || hero.image_url || hero.image || hero.photo} alt={hero.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-full h-[35%] bg-black/60 backdrop-blur-[2px] transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                  <h3 className="text-white font-bold text-lg md:text-xl font-base drop-shadow-md">{hero.name}</h3>
                  {/* Handle variasi key response JSON dari backend */}
                  <p className="text-gray-200 text-xs md:text-sm mt-1">
                    {hero.birth_year ? `${hero.birth_year} - ${hero.death_year}` : hero.years}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="w-full flex flex-col items-center justify-center py-20 text-gray-500">
            <FaMagnifyingGlass size={32} className="mb-4 text-gray-300" />
            <p className="font-teachers text-lg">Pahlawan "{searchQuery}" tidak ditemukan.</p>
          </div>
        )}
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && !isLoading && (
        <div data-aos="fade-up" className="w-full flex justify-center items-center gap-2 md:gap-3 mb-24 relative z-10">
          
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold text-xs md:text-sm transition flex items-center ${
              currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#b5a38f]/40 hover:bg-[#b5a38f]/70 text-inv-base'
            }`}
          >
            &lt; Kembali
          </button>

          {/* Render Angka Halaman Dinamis */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button 
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`w-9 h-9 md:w-11 md:h-11 rounded-lg font-bold text-sm md:text-base transition ${
                currentPage === pageNumber 
                  ? 'bg-inv-base text-white shadow-md' 
                  : 'bg-[#b5a38f]/40 hover:bg-[#b5a38f]/70 text-inv-base'
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold text-xs md:text-sm transition flex items-center ${
              currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#b5a38f]/40 hover:bg-[#b5a38f]/70 text-inv-base'
            }`}
          >
            Lanjut &gt;
          </button>
        </div>
      )}

      {/* QUOTE SECTION */}
      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-6 pb-24 md:pb-32 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
        <div data-aos="fade-right" data-aos-duration="1500" className="w-32 md:w-48 lg:w-56 pointer-events-none drop-shadow-sm flex-shrink-0">
          <img src={penariKiri} alt="Ornamen Penari Kiri" className="w-full h-auto" />
        </div>
        <div data-aos="zoom-in" className="text-center max-w-xl flex-grow px-4">
          <h2 className="text-xl md:text-2xl font-base text-inv-accent font-semibold leading-relaxed mb-4 md:mb-6">
            "Bangsa Yang Besar Adalah Bangsa Yang Menghormati Jasa Para Pahlawannya."
          </h2>
          <p className="text-gray-700 font-teachers text-sm md:text-base tracking-wide">Ir. Soekarno</p>
        </div>
        <div data-aos="fade-left" data-aos-duration="1500" className="w-32 md:w-48 lg:w-56 pointer-events-none drop-shadow-sm flex-shrink-0">
          <img src={penariKanan} alt="Ornamen Penari Kanan" className="w-full h-auto" />
        </div>
      </div>

    </section>
  );
};

export default HeroesGallerySection;