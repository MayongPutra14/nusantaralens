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

const CultureSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // State untuk API Data Budaya & Modal Detail
  const [cultures, setCulturesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCulture, setSelectedCulture] = useState(null);

  // Fungsi Fetch API Budaya & Tradisi
  useEffect(() => {
    const fetchCultures = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://nusantaralens.vercel.app/cultures",
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
          setCulturesData(result.data.cultures || result.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data budaya:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCultures();
  }, []);

  // Logic filter pencarian
  const filteredCultures = cultures.filter(
    (culture) =>
      culture.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      culture.region?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Logic Pagination
  const totalPages = Math.ceil(filteredCultures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCultures = filteredCultures.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Mengunci scroll halaman utama ketika modal sedang aktif terbuka
  useEffect(() => {
    if (selectedCulture) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCulture]);

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
          className="absolute right-4 md:-right-6 -top-10 w-20 md:w-32 pointer-events-none opacity-80 drop-shadow-md"
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
          Budaya dan Tradisi <br />
          Daerah Indonesia
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-gray-600 max-w-2xl text-sm md:text-base leading-relaxed mb-10 font-medium"
        >
          Halaman ini merangkum berbagai aspek warisan tradisi yang tersebar di
          wilayah Nusantara. Informasi disajikan sebagai referensi untuk
          mengenal ragam adat istiadat, kesenian, dan identitas budaya yang
          mencirikan keunikan tiap daerah.
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
            placeholder="Cari tradisi, budaya, atau daerah..."
            className="flex-grow bg-transparent outline-none font-teachers text-gray-700 text-sm md:text-base placeholder-gray-400 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* GRID BUDAYA & TRADISI */}
      <div className="w-full max-w-5xl mx-auto px-6 pb-20 relative z-10 min-h-[400px]">
        {isLoading ? (
          // Skeleton Loading Grid
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
        ) : currentCultures.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {currentCultures.map((culture, index) => (
              <div
                key={culture.id}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                onClick={() => setSelectedCulture(culture)}
                className="relative group rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[3/4] bg-gray-100 border border-gray-100"
              >
                <img
                  src={
                    culture.photo_url ||
                    culture.image_url ||
                    culture.image ||
                    culture.photo
                  }
                  alt={culture.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:from-black/95 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-lg md:text-xl font-base drop-shadow-md tracking-wide line-clamp-2">
                    {culture.name}
                  </h3>
                  <div className="w-8 h-[2px] bg-[#b5a38f] mt-1.5 rounded-full transition-all duration-500 group-hover:w-16"></div>
                  {culture.region && (
                    <p className="text-gray-300 text-xs md:text-sm mt-1 font-medium tracking-wide">
                      Asal Daerah: {culture.region}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State Data Kosong
          <div className="w-full flex flex-col items-center justify-center py-24 text-gray-400 bg-white rounded-3xl shadow-inner border border-gray-50">
            <div className="p-4 bg-gray-50 rounded-full mb-4">
              <FaMagnifyingGlass size={40} className="text-gray-300" />
            </div>
            <p className="font-teachers text-lg font-semibold text-gray-500">
              Budaya Tidak Ditemukan
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Tidak ada warisan tradisi untuk kata kunci "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && !isLoading && (
        <div
          data-aos="fade-up"
          className="w-full flex justify-center items-center gap-2 md:gap-3 mb-28 relative z-10"
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

      {/* COMPONENT MODAL DETAIL WARISAN BUDAYA */}
      {selectedCulture && (
        <div
          className="fixed inset-0 z-[999] overflow-y-auto bg-black/75 backdrop-blur-md mt-20 px-4 py-20 md:py-12 flex items-start justify-center animate-fadeIn"
          onClick={() => setSelectedCulture(null)}
        >
          <div
            className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative my-auto animate-scaleUp border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Close */}
            <button
              onClick={() => setSelectedCulture(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/60 md:bg-gray-100 md:text-gray-600 md:hover:bg-gray-200 transition-colors shadow-lg"
            >
              <FaXmark size={20} />
            </button>

            {/*  FOTO WARISAN BUDAYA */}
            <div className="w-full md:w-2/5 h-80 md:h-auto min-h-[350px] md:min-h-[480px] relative bg-neutral-950 flex-shrink-0 overflow-hidden flex items-center justify-center">
              <img
                src={
                  selectedCulture.photo_url ||
                  selectedCulture.image_url ||
                  selectedCulture.image ||
                  selectedCulture.photo
                }
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 scale-110 pointer-events-none"
              />
              {/* Foto Utama */}
              <img
                src={
                  selectedCulture.photo_url ||
                  selectedCulture.image_url ||
                  selectedCulture.image ||
                  selectedCulture.photo
                }
                alt={selectedCulture.name}
                className="relative z-10 w-full h-full object-contain p-3 md:p-5"
              />
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/40 to-transparent z-15 pointer-events-none md:hidden"></div>
            </div>

            {/* DETAIL TEKS  */}
            <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-between bg-white font-teachers">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mt-4 mb-2">
                  {selectedCulture.name}
                </h2>

                <hr className="border-gray-100 my-4" />

                <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2.5">
                  Deskripsi Lengkap & Nilai Filosofis:
                </h4>

                {/* Paragraf loss total tanpa max-height, murni mengikuti kuantitas teks dari API */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify font-regular">
                  {selectedCulture.description ||
                    "Informasi deskripsi mendalam mengenai warisan kebudayaan daerah ini sedang dalam proses penyusunan literatur akademik."}
                </p>
              </div>

              {/* ACTION ACCENT BUTTON */}
              <div className="mt-8 pt-5 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedCulture(null)}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-inv-base text-white font-bold text-sm shadow-md hover:bg-inv-base/90 active:scale-95 transition-all text-center tracking-wide"
                >
                  Kembali ke Galeri
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
            “Banyak hal yang bisa menjatuhkanmu. Tapi, satu-satunya hal yang
            benar-benar dapat menjatuhkanmu adalah sikapmu sendiri.”
          </h2>
          <div className="w-12 h-1 bg-[#b5a38f] mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-500 font-teachers text-sm md:text-base tracking-widest font-medium">
            R.A Kartini
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

export default CultureSection;
