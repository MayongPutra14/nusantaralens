import { useState, useEffect } from "react";
import { FaMagnifyingGlass, FaArrowLeft } from "react-icons/fa6";
import burungOrnament from "../assets/heroes/burung.png";
import penariKiri from "../assets/heroes/penari-kiri.png";
import penariKanan from "../assets/heroes/penari-kanan.png";
import wayangKiri from "../assets/hero/wayang-kiri.png";
import wayangKanan from "../assets/hero/wayang-kanan.png";

const DictionarySection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // State API Kamus
  const [dictionaries, setDictionariesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Stare Untuk Menyimpan isoCode bahasa daerah yang lagi di klik
  const [selectedIso, setSelectedIso] = useState(null);

  // State untuk Menyimpan list kosakata [{indonesia, daerah}] dari API
  const [words, setWords] = useState([]);

  // State untuk loading saat mengambil list kata
  const [isWordsLoading, setIsWordsLoading] = useState(false);

  // State untuk pencarian kata di dalam kamus daerah
  const [wordSearchQuery, setWordSearchQuery] = useState("");

  // Fungsi Fetch API Bahasa/Kamus
  useEffect(() => {
    const fetchDictionaries = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://nusantaralens.vercel.app/iso-code",
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
          const rawCodes = result.data.iso_codes || [];

          const mappedDictionaries = rawCodes.map((code) => {
            const languageMap = {
              jv: {
                name: "Bahasa Jawa",
                region: "Jawa",
                image:
                  "https://plus.unsplash.com/premium_photo-1700954824012-08ce5362e6c6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              ace: {
                name: "Bahasa Aceh",
                region: "Nanggroe Aceh Darussalam",
                image:
                  "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=800",
              },
              abui: {
                name: "Bahasa Abui",
                region: "Nusa Tenggara Timur",
                image:
                  "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800",
              },
            };

            const info = languageMap[code] || {
              name: `Bahasa (${code})`,
              region: "Indonesia",
              image:
                "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800",
            };

            return {
              id: code,
              name: info.name,
              region: info.region,
              image: info.image,
              image_url: info.image,
            };
          });

          setDictionariesData(mappedDictionaries);
        }
      } catch (error) {
        console.error("Gagal mengambil data kamus:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDictionaries();
  }, []);

  // Fetch data constanta ketika baru di klik
  useEffect(() => {
    if (!selectedIso) return;

    const fetchWordsByIso = async () => {
      setIsWordsLoading(true);
      try {
        const response = await fetch(
          `https://nusantaralens.vercel.app/language/${selectedIso}/words`,
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
          setWords(result.data.words || []);
        }
      } catch (error) {
        console.error("Gagal mengambil data kata daerah:", error);
      } finally {
        setIsWordsLoading(false);
      }
    };

    fetchWordsByIso();
  }, [selectedIso]);

  // Logic filter pencarian (Mendukung properti name/language dan region)
  const filteredDicts = dictionaries.filter((dict) => {
    const langName = dict.name || dict.language || "";
    const regionName = dict.region || "";

    return (
      langName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      regionName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Logic pencarian kata di kamus daerah
  const filteredWords = words.filter((item) => {
    return (
      item.indonesia.toLowerCase().includes(wordSearchQuery.toLowerCase()) ||
      item.daerah.toLowerCase().includes(wordSearchQuery.toLowerCase())
    );
  });

  // Logic Pagination
  const totalPages = Math.ceil(filteredDicts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDicts = filteredDicts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Reset ke halaman 1 saat user ngetik pencarian baru
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Mencari info data bahasa yang sedang aktif untuk dipasang di Header Detail
  const activeLanguageInfo = dictionaries.find((d) => d.id === selectedIso);

  // Menampilkan kosa kata dari kamus yang di pilih
  if (selectedIso) {
    return (
      <section className="relative w-full bg-bianca-50 font-teachers flex flex-col items-center pt-32 z-10 overflow-hidden min-h-screen">
        {/* Background decorative wayang*/}
        <img
          src={wayangKiri}
          alt="Wayang Kiri"
          className="absolute left-0 top-[40%] -translate-y-1/2 w-10 md:w-16 lg:w-20 opacity-90 pointer-events-none"
          data-aos="fade-right"
        />
        <img
          src={wayangKanan}
          alt="Wayang Kanan"
          className="absolute right-0 top-[40%] -translate-y-1/2 w-10 md:w-16 lg:w-20 opacity-90 pointer-events-none"
          data-aos="fade-left"
        />

        <div className="w-full max-w-4xl mx-auto px-6 pb-24 relative z-10 flex flex-col items-start">
          <button
            onClick={() => {
              setSelectedIso(null); // Kembali ke menu utama
              setWords([]); // Bersihkan data array kata utnuk memori
              setWordSearchQuery(""); // Reset kolom pencarian kata
            }}
            className="group flex items-center gap-2 px-4 py-2 bg-white text-inv-base font-semibold rounded-full shadow-sm hover:shadow-md border border-gray-100 transition-all text-sm mb-8"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Daftar Kamus
          </button>

          {/* HEADER KAMUS */}
          <div className="w-full text-left border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-base text-inv-accent mt-3">
              {activeLanguageInfo?.name}
            </h1>
            <p className="text-gray-500 text-sm md:text-base mt-1">
              Asal Wilayah:{" "}
              <span className="font-semibold text-gray-700">
                {activeLanguageInfo?.region}
              </span>
            </p>

            {/* Input Pencarian Kata Khusus */}
            <div className="w-full max-w-md bg-white rounded-xl shadow-sm flex items-center px-4 py-3 border border-gray-100 mt-6">
              <FaMagnifyingGlass className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder={`Cari arti kata Indonesia atau daerah...`}
                className="flex-grow bg-transparent outline-none text-gray-700 text-sm md:text-base placeholder-gray-400"
                value={wordSearchQuery}
                onChange={(e) => setWordSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* MAIN CONTENT: Loading dan Grid */}
          {isWordsLoading ? (
            <div className="w-full flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-inv-accent mx-auto mb-4"></div>
              <p className="text-sm">Sedang memuat seluruh kosakata...</p>
            </div>
          ) : filteredWords.length > 0 ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredWords.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center text-left relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#b5a38f]/50 group-hover:bg-[#b5a38f] transition-colors" />
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                    Bahasa Daerah
                  </span>
                  <h3 className="text-lg font-bold text-inv-accent mb-2">
                    {item.daerah}
                  </h3>
                  <div className="border-t border-dashed border-gray-100 pt-2 mt-1">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-0.5">
                      Bahasa Indonesia
                    </span>
                    <p className="text-gray-600 font-medium text-sm md:text-base">
                      {item.indonesia}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200 text-gray-500">
              <FaMagnifyingGlass
                size={24}
                className="mx-auto mb-3 text-gray-300"
              />
              <p className="text-sm">
                Kata "{wordSearchQuery}" tidak ditemukan dalam kamus ini.
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }
  return (
    <section className="relative w-full bg-bianca-50 font-teachers flex flex-col items-center pt-32 z-10 overflow-hidden">
      <img
        src={wayangKiri}
        alt="Wayang Kiri"
        className="absolute left-0 top-[40%] -translate-y-1/2 w-10 md:w-16 lg:w-20 opacity-90 pointer-events-none"
        data-aos="fade-right"
      />
      <img
        src={wayangKanan}
        alt="Wayang Kanan"
        className="absolute right-0 top-[40%] -translate-y-1/2 w-10 md:w-16 lg:w-20 opacity-90 pointer-events-none"
        data-aos="fade-left"
      />

      <div className="relative w-full max-w-5xl mx-auto px-6 pb-12 flex flex-col items-center text-center">
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
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-base text-inv-accent mb-4 drop-shadow-sm leading-tight"
        >
          Kamus Bahasa <br /> Daerah Indonesia
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-gray-600 max-w-2xl text-sm md:text-base leading-relaxed mb-10"
        >
          Halaman ini memuat dokumentasi bahasa daerah yang tersebar di berbagai
          wilayah Indonesia. Informasi disajikan sebagai referensi untuk
          mengenal ragam kosakata dan identitas tutur yang menjadi bagian dari
          kekayaan budaya tiap daerah.
        </p>

        <div
          data-aos="zoom-in"
          data-aos-delay="400"
          className="w-full max-w-2xl bg-white rounded-full shadow-md flex items-center px-6 py-4 border border-gray-100 relative z-20"
        >
          <FaMagnifyingGlass className="text-gray-400 text-lg mr-4" />
          <input
            type="text"
            placeholder="Cari daerah atau nama bahasa..."
            className="flex-grow bg-transparent outline-none font-teachers text-gray-700 text-sm md:text-base placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Render Data dengan Pagination (currentDicts) */}
      <div className="w-full max-w-5xl mx-auto px-6 pb-16 relative z-10 min-h-[400px]">
        {isLoading ? (
          // Skeleton Loading
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden shadow-sm aspect-[3/4] bg-gray-200 animate-pulse relative"
              >
                <div className="absolute bottom-0 left-0 w-full h-[35%] bg-black/20"></div>
              </div>
            ))}
          </div>
        ) : currentDicts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {currentDicts.map((dict, index) => (
              <div
                key={dict.id}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                onClick={() => {
                  console.log("Kartu diklik! ID Bahasa:", dict.id);
                  setSelectedIso(dict.id);
                }}
                className="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[3/4] bg-gray-200 z-30 pointer-events-auto"
              >
                <img
                  src={dict.image || dict.image_url}
                  alt={dict.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 w-full h-[35%] bg-black/60 backdrop-blur-[2px] transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                  <h3 className="text-white font-bold text-lg md:text-xl font-base drop-shadow-md">
                    {dict.region}
                  </h3>
                  <p className="text-gray-200 text-xs md:text-sm mt-1">
                    {dict.name || dict.language}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-20 text-gray-500">
            <FaMagnifyingGlass size={32} className="mb-4 text-gray-300" />
            <p className="font-teachers text-lg">
              Kamus "{searchQuery}" tidak ditemukan.
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && !isLoading && (
        <div
          data-aos="fade-up"
          className="w-full flex justify-center items-center gap-2 md:gap-3 mb-24 relative z-10"
        >
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold text-xs md:text-sm transition flex items-center ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#b5a38f]/40 hover:bg-[#b5a38f]/70 text-inv-base"
            }`}
          >
            &lt; Kembali
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`w-9 h-9 md:w-11 md:h-11 rounded-lg font-bold text-sm md:text-base transition ${
                  currentPage === pageNumber
                    ? "bg-inv-base text-white shadow-md"
                    : "bg-[#b5a38f]/40 hover:bg-[#b5a38f]/70 text-inv-base"
                }`}
              >
                {pageNumber}
              </button>
            ),
          )}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold text-xs md:text-sm transition flex items-center ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#b5a38f]/40 hover:bg-[#b5a38f]/70 text-inv-base"
            }`}
          >
            Lanjut &gt;
          </button>
        </div>
      )}

      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-6 pb-24 md:pb-32 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
        <div
          data-aos="fade-right"
          data-aos-duration="1500"
          className="w-32 md:w-48 lg:w-56 pointer-events-none drop-shadow-sm flex-shrink-0"
        >
          <img
            src={penariKiri}
            alt="Ornamen Penari Kiri"
            className="w-full h-auto"
          />
        </div>
        <div data-aos="zoom-in" className="text-center max-w-xl flex-grow px-4">
          <h2 className="text-xl md:text-2xl font-base text-inv-accent font-bold leading-relaxed mb-4 italic text-gray-800">
            "Membaca buku-buku yang baik berarti memberi makanan rohani yang
            baik."
          </h2>
          <div className="w-12 h-1 bg-[#b5a38f] mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-500 font-teachers text-sm md:text-base tracking-widest font-medium">
            Buya Hamka
          </p>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="1500"
          className="w-32 md:w-48 lg:w-56 pointer-events-none drop-shadow-sm flex-shrink-0"
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

export default DictionarySection;
