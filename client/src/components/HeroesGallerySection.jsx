import { useState, useEffect } from "react";
import {
  FaMagnifyingGlass,
  FaChevronLeft,
  FaChevronRight,
  FaXmark,
} from "react-icons/fa6";
import burungOrnament from "../assets/heroes/burung.png";
import penariKiri from "../assets/heroes/penari-kiri.png";
import penariKanan from "../assets/heroes/penari-kanan.png";
import wayangKiri from "../assets/hero/wayang-kiri.png";
import wayangKanan from "../assets/hero/wayang-kanan.png";

const HeroesGallerySection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // State untuk API Data & Modal Detail
  const [heroes, setHeroesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHero, setSelectedHero] = useState(null);

  // Fungsi Fetch API Pahlawan
  useEffect(() => {
    const fetchHeroes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://nusantaralens.vercel.app/heroes",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                "237aa5e59230a900ed4d1e632c5bf9e4a03d4f79d68ae991cd0aaaa2416b95e0",
            },
          },
        );
        const result = await response.json();
        if (result.status === "success") {
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
  const safeHeroes = Array.isArray(heroes) ? heroes : heroes?.data || [];
  const filteredHeroes = safeHeroes.filter((hero) =>
    hero.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Logic Pagination
  const totalPages = Math.ceil(filteredHeroes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentHeroes = filteredHeroes.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

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

  // Kunci scroll body saat modal terbuka agar tidak berantakan
  useEffect(() => {
    if (selectedHero) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedHero]);

  return (
    <section className="relative w-full bg-bianca-50 font-teachers flex flex-col items-center pt-32 pb-12 z-10 overflow-hidden select-none">
      {/* Background Decorative Wayang */}
      <img
        src={wayangKiri}
        alt="Wayang Kiri"
        className="absolute left-0 top-[35%] -translate-y-1/2 w-12 md:w-20 lg:w-28 opacity-20 md:opacity-40 pointer-events-none z-0 hidden sm:block"
        data-aos="fade-right"
      />
      <img
        src={wayangKanan}
        alt="Wayang Kanan"
        className="absolute right-0 top-[35%] -translate-y-1/2 w-12 md:w-20 lg:w-28 opacity-20 md:opacity-40 pointer-events-none z-0 hidden sm:block"
        data-aos="fade-left"
      />

      {/* HEADER SECTION */}
      <div className="relative w-full max-w-5xl mx-auto px-6 pb-16 flex flex-col items-center text-center z-10">
        <div
          data-aos="fade-left"
          className="absolute right-2 md:-right-6 -top-10 w-20 md:w-32 pointer-events-none opacity-80 drop-shadow-md"
        >
          <img
            src={burungOrnament}
            alt="Ornamen Burung"
            className="w-full h-auto animate-pulse"
            style={{ animationDuration: "4s" }}
          />
        </div>

        <h1
          data-aos="fade-down"
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-base text-inv-accent mb-6 drop-shadow-sm leading-tight tracking-tight"
        >
          Galeri Pahlawan <br />
          Nasional Indonesia
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-gray-600 max-w-2xl text-sm md:text-base leading-relaxed mb-10 font-medium"
        >
          Halaman ini merangkum catatan tokoh-tokoh yang telah ditetapkan
          sebagai Pahlawan Nasional Indonesia. Informasi disusun berdasarkan
          dokumentasi sejarah untuk memberikan gambaran mengenai profil dan
          latar belakang perjuangan setiap sosok.
        </p>

        {/* Input Search */}
        <div
          data-aos="zoom-in"
          data-aos-delay="400"
          className="w-full max-w-2xl bg-white rounded-full shadow-lg hover:shadow-xl focus-within:shadow-xl focus-within:ring-2 focus-within:ring-[#b5a38f]/50 flex items-center px-6 py-4 border border-gray-100/80 transition-all duration-300 relative z-20"
        >
          <FaMagnifyingGlass className="text-gray-400 text-xl mr-4 flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari nama pahlawan..."
            className="flex-grow bg-transparent outline-none font-teachers text-gray-700 text-sm md:text-base placeholder-gray-400 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* GRID GALERI PAHLAWAN */}
      <div className="w-full max-w-5xl mx-auto px-6 pb-20 relative z-10 min-h-[400px]">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden shadow-md aspect-[3/4] bg-gray-200/80 animate-pulse relative"
              >
                <div className="absolute bottom-0 left-0 w-full h-[35%] bg-gradient-to-t from-gray-300 to-transparent"></div>
              </div>
            ))}
          </div>
        ) : currentHeroes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {currentHeroes.map((hero, index) => (
              <div
                key={hero.id}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                onClick={() => setSelectedHero(hero)} // Memicu modal ketika card diklik
                className="relative group rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[3/4] bg-gray-100 border border-gray-100"
              >
                <img
                  src={
                    hero.photo_url || hero.image_url || hero.image || hero.photo
                  }
                  alt={hero.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:from-black/95 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-lg md:text-xl font-base drop-shadow-md tracking-wide line-clamp-2">
                    {hero.name}
                  </h3>
                  <p className="text-gray-300 text-xs md:text-sm mt-2 font-medium tracking-wider bg-white/10 backdrop-blur-sm inline-block px-3 py-1 rounded-full border border-white/10">
                    {hero.birth_date
                      ? `${hero.birth_date} — ${hero.death_date}`
                      : hero.years}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-24 text-gray-400 bg-white rounded-3xl shadow-inner border border-gray-50">
            <div className="p-4 bg-gray-50 rounded-full mb-4">
              <FaMagnifyingGlass size={40} className="text-gray-300" />
            </div>
            <p className="font-teachers text-lg font-semibold text-gray-500">
              Pahlawan Tidak Ditemukan
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Tidak ada hasil untuk kata kunci "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && !isLoading && (
        <div
          data-aos="fade-up"
          className={`w-full flex justify-center items-center gap-2 md:gap-3 mb-28 relative z-10`}
        >
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-3 md:px-5 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 flex items-center gap-2 border ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                : "bg-white hover:bg-inv-base hover:text-white text-inv-base border-gray-200 shadow-sm active:scale-95"
            }`}
          >
            <FaChevronLeft className="text-xs" />{" "}
            <span className="hidden sm:inline">Kembali</span>
          </button>

          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-9 h-9 md:w-11 md:h-11 rounded-lg font-bold text-sm md:text-base transition-all duration-300 active:scale-95 ${
                    currentPage === pageNumber
                      ? "bg-inv-base text-white shadow-md scale-105"
                      : "bg-transparent hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {pageNumber}
                </button>
              ),
            )}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-3 md:px-5 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 flex items-center gap-2 border ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                : "bg-white hover:bg-inv-base hover:text-white text-inv-base border-gray-200 shadow-sm active:scale-95"
            }`}
          >
            <span className="hidden sm:inline">Lanjut</span>{" "}
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      )}

      {/* COMPONENT MODAL DETAIL */}
      {selectedHero && (
        <div
          className="fixed inset-0 z-[999] overflow-y-auto bg-black/80 backdrop-blur-md mt-16 -20 px-4 py-20 md:py-12 md:mt   flex items-start justify-center animate-fadeIn"
          onClick={() => setSelectedHero(null)}
        >
          <div
            className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative my-auto animate-scaleUp border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Close Pojok Atas */}
            <button
              onClick={() => setSelectedHero(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/60 md:bg-gray-100 md:text-gray-600 md:hover:bg-gray-200 transition-colors shadow-lg"
            >
              <FaXmark size={20} />
            </button>

            {/* FOTO PAHLAWAN */}
            <div className="w-full md:w-2/5 h-80 md:h-auto min-h-[350px] md:min-h-[500px] relative bg-neutral-900 flex-shrink-0 overflow-hidden flex items-center justify-center">
              {/* Background Blurred Effect*/}
              <img
                src={
                  selectedHero.photo_url ||
                  selectedHero.image_url ||
                  selectedHero.image ||
                  selectedHero.photo
                }
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
              />
              {/* Foto Utama */}
              <img
                src={
                  selectedHero.photo_url ||
                  selectedHero.image_url ||
                  selectedHero.image ||
                  selectedHero.photo
                }
                alt={selectedHero.name}
                className="relative z-10 w-full h-full object-contain p-2 md:p-4"
              />
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/50 to-transparent z-15 pointer-events-none md:hidden"></div>
            </div>

            {/*BIOGRAFI */}
            <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-between bg-white font-teachers">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                  {selectedHero.name}
                </h2>

                {/* GRID FOTO DAN DETAILS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50/70 p-4 rounded-2xl border border-gray-100 mb-6 text-left">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                      Tempat / Tgl Lahir
                    </p>
                    <p className="text-xs md:text-sm font-medium text-gray-700 mt-0.5">
                      {selectedHero.birth_place
                        ? `${selectedHero.birth_place}, `
                        : ""}
                      {selectedHero.birth_date || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                      Tempat / Tgl Wafat
                    </p>
                    <p className="text-xs md:text-sm font-medium text-gray-700 mt-0.5">
                      {selectedHero.death_place
                        ? `${selectedHero.death_place}, `
                        : ""}
                      {selectedHero.death_date || "-"}
                    </p>
                  </div>
                  <div className="sm:col-span-2 border-t border-gray-200/50 pt-2.5 mt-0.5">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                      Lokasi Persemayaman / Makam
                    </p>
                    <p className="text-xs md:text-sm font-medium text-gray-700 mt-0.5">
                      {selectedHero.burial_place ||
                        "Informasi Makam Tidak Tersedia"}
                    </p>
                  </div>
                </div>

                <hr className="border-gray-100 my-4" />

                {/* DESKRIPSI UTAMA */}
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2.5">
                  Ringkasan Sejarah & Perjuangan:
                </h4>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify font-regular">
                  {selectedHero.description ||
                    "Informasi narasi sejarah mengenai tokoh pahlawan ini sedang diperbarui oleh tim arsip negara."}
                </p>

                {/* NOMOR SK */}
                {selectedHero.ascencion_document_number && (
                  <div className="mt-5 p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-left">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                      No. Lembaran Negara / SK Dokumen
                    </p>
                    <p className="text-xs font-mono font-medium text-neutral-600 mt-0.5">
                      {selectedHero.ascencion_document_number}
                    </p>
                  </div>
                )}
              </div>

              {/* BUTTON ACTION */}
              <div className="mt-8 pt-5 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedHero(null)}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-inv-base text-white font-bold text-sm shadow-md hover:bg-inv-base/90 active:scale-95 transition-all text-center tracking-wide"
                >
                  Tutup Lembar Profil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* QUOTE SECTION */}
      <div className="relative w-full max-w-5xl mx-auto px-6 pb-16 flex flex-col md:flex-row items-center justify-between gap-8 z-10 border-t border-gray-200/60 pt-16">
        <div
          data-aos="fade-right"
          data-aos-duration="1200"
          className="w-24 md:w-36 lg:w-44 pointer-events-none drop-shadow-md flex-shrink-0 opacity-80"
        >
          <img
            src={penariKiri}
            alt="Ornamen Penari Kiri"
            className="w-full h-auto"
          />
        </div>
        <div data-aos="zoom-in" className="text-center max-w-xl flex-grow px-4">
          <h2 className="text-xl md:text-2xl font-base text-inv-accent font-bold leading-relaxed mb-4 italic text-gray-800">
            "Bangsa yang besar adalah bangsa yang menghormati jasa para
            pahlawannya."
          </h2>
          <div className="w-12 h-1 bg-[#b5a38f] mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-500 font-teachers text-sm md:text-base tracking-widest font-medium">
            Ir. Soekarno
          </p>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="1200"
          className="w-24 md:w-36 lg:w-44 pointer-events-none drop-shadow-md flex-shrink-0 opacity-80"
        >
          <img
            src={penariKanan}
            alt="Ornamen Penari Kanan"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroesGallerySection;
