import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarSection from '../components/NavbarSection';
import FooterSection from '../components/FooterSection';
import MapIndonesia from '../components/MapIndonesia';

// Penerjemah ID dari Peta ke format URL API (Slug)
const islandSlugMapper = {
  'Pulau_Sumatera': 'sumatera',
  'Pulau_Jawa': 'jawa',
  'Pulau_Kalimantan': 'kalimantan',
  'Pulau_Sulawesi': 'sulawesi',
  'Pulau_Papua': 'papua',
  'Bali': 'bali',
  'Bangka_Belitung': 'bangka-belitung',
  'Kepulauan_Riau': 'kepulauan-riau',
  'NTB': 'nusa-tenggara-barat',
  'NTT': 'nusa-tenggara-timur',
  'Maluku': 'maluku',
  'Maluku_Utara': 'maluku',
};

const InsightPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialIsland = location.state?.selectedIsland || 'Pulau_Sumatera';
  const [activeIsland, setActiveIsland] = useState(initialIsland);
  

  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi Fetch API dengan API KEY
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setApiData(null); // Reset data lama
      
      const slug = islandSlugMapper[activeIsland] || 'sumatera';
      const apiUrl = `https://nusantaralens.vercel.app/islands/${slug}`;
      
      console.log(`🚀 [Mencoba Fetch API] -> ${apiUrl}`);

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '237aa5e59230a900ed4d1e632c5bf9e4a03d4f79d68ae991cd0aaaa2416b95e0'
          }
        });
        
        console.log(`📡 [Status HTTP] -> ${response.status} ${response.statusText}`);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - Pastikan link API benar & CORS sudah update!`);
        }

        const result = await response.json();
        console.log("✅ [Data Berhasil Didapat] ->", result);

        if (result.status === 'success') {
          setApiData(result.data);
        }
      } catch (error) {
        console.error("❌ [GAGAL FETCH API] ->", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeIsland]);

  // Ekstrak Data dari API
  let pieData = { pria: 50, wanita: 50 };
  let islandName = activeIsland.replace('_', ' ');
  let ecoGrowth = 0;
  let landAreaPercent = 0;
  let landAreaKm = 0;
  
  if (apiData) {
    // 1. Ambil Nama Pulau
    if (apiData.island && apiData.island.name) {
      islandName = apiData.island.name;
    }

    // 2. Ambil Populasi
    if (apiData.populations && apiData.populations.length > 0) {
      const pop = apiData.populations[0];
      const male = parseInt(pop.male_population) || 0;
      const female = parseInt(pop.female_population) || 0;
      const total = male + female;
      
      if (total > 0) {
        pieData.pria = Math.round((male / total) * 100);
        pieData.wanita = Math.round((female / total) * 100);
      }
    }

    // 3. Ambil Ekonomi (Set 0 jika kosong)
    if (apiData.economic_growths && apiData.economic_growths.length > 0) {
      ecoGrowth = parseFloat(apiData.economic_growths[0].growth_rate) || 0;
    }

    // 4. Ambil Luas Wilayah (Set 0 jika kosong)
    if (apiData.land_areas && apiData.land_areas.length > 0) {
      landAreaPercent = parseFloat(apiData.land_areas[0].land_area_percentage) || 0;
      landAreaKm = parseFloat(apiData.land_areas[0].land_area_km2) || 0;
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-bianca-50">
      <div className="bg-[#9E7D5C] shadow-md z-50">
        <NavbarSection isAbsoluteBg={true} />
      </div>
      
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 pt-32 pb-24 max-w-5xl mx-auto w-full">
        
        {/* AREA PETA INDONESIA */}
        <div data-aos="fade-down" className="w-full max-w-7xl mx-auto drop-shadow-xl flex justify-start md:justify-center mb-12 relative z-10 overflow-x-auto md:overflow-x-visible pb-4 hide-scrollbar">
           <div className="min-w-[600px] md:min-w-[800px] w-full pr-8 md:pr-0 pl-4 md:pl-0">
              <MapIndonesia onPilihPulau={setActiveIsland} />
           </div>
        </div>

        {/* KOTAK DESKRIPSI LOKASI */}
        <div data-aos="fade-up" className="bg-inv-base text-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg w-full max-w-2xl text-left md:text-center mb-16 relative z-10 transition-all duration-500 min-h-[150px] flex flex-col justify-center">
           {isLoading ? (
             <div className="animate-pulse flex flex-col items-center gap-3">
               <div className="h-6 bg-white/20 rounded w-1/3 mb-2"></div>
               <div className="h-4 bg-white/20 rounded w-5/6"></div>
               <div className="h-4 bg-white/20 rounded w-4/6"></div>
             </div>
           ) : (
             <>
               <h3 className="font-base text-xl md:text-2xl font-bold mb-3 text-inv-accent transition-all duration-300">
                 {islandName}
               </h3>
               <p className="font-teachers text-sm md:text-base leading-relaxed tracking-wide opacity-90">
                 Berdasarkan data BPS tahun terbaru, persentase jumlah penduduk Laki-laki di {islandName} sebesar {pieData.pria}%, sedangkan populasi Perempuan sebanyak {pieData.wanita}%.
               </p>
             </>
           )}
        </div>

        {/* GRID CARD CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full relative z-10">
           
           {/* PIE CHART POPULASI */}
           <div data-aos="fade-up" className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition duration-300 min-h-[350px]">
              <div className="bg-inv-base text-white text-center py-3.5 px-4 rounded-xl font-base text-lg font-semibold mb-8 shadow-sm">
                Rasio Laki-laki & Perempuan
              </div>
              <div className="flex-1 flex flex-col items-center justify-center relative">
                {isLoading ? (
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gray-200 animate-pulse"></div>
                ) : (
                  <div 
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full drop-shadow-md flex items-center justify-center transition-all duration-700 ease-in-out"
                    style={{ background: `conic-gradient(#ef4444 0% ${pieData.wanita}%, #3b82f6 ${pieData.wanita}% 100%)` }}
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                       <span className="text-blue-500 font-bold text-sm md:text-base">Pria: {pieData.pria}%</span>
                       <span className="text-red-500 font-bold text-sm md:text-base">Wanita: {pieData.wanita}%</span>
                    </div>
                  </div>
                )}
              </div>
           </div>

           {/* KOTAK STATISTIK TAMBAHAN */}
           <div data-aos="fade-up" data-aos-delay="100" className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition duration-300 min-h-[350px]">
              <div className="bg-inv-base text-white text-center py-3.5 px-4 rounded-xl font-base text-lg font-semibold mb-8 shadow-sm">
                Statistik Tambahan
              </div>
              <div className="flex-1 flex flex-col justify-center gap-6 w-full px-2">
                {isLoading ? (
                   <div className="flex flex-col gap-6 w-full animate-pulse">
                     <div className="h-16 bg-gray-200 rounded-xl w-full"></div>
                     <div className="h-16 bg-gray-200 rounded-xl w-full"></div>
                   </div>
                ) : (
                  <>
                    {/* Data Ekonomi */}
                    <div className="bg-green-50 rounded-xl p-4 flex justify-between items-center border border-green-100">
                      <div className="flex flex-col">
                        <span className="text-green-800 font-bold font-teachers text-sm md:text-base">Pertumbuhan Ekonomi</span>
                        <span className="text-green-600 text-xs mt-1">Data Terbaru</span>
                      </div>
                      <span className="text-2xl md:text-3xl font-base font-bold text-green-700">
                        {ecoGrowth}%
                      </span>
                    </div>

                    {/* Data Luas Wilayah */}
                    <div className="bg-orange-50 rounded-xl p-4 flex justify-between items-center border border-orange-100">
                      <div className="flex flex-col">
                        <span className="text-orange-800 font-bold font-teachers text-sm md:text-base">Luas Wilayah</span>
                        <span className="text-orange-600 text-xs mt-1">
                          {landAreaKm > 0 ? `${landAreaKm.toLocaleString('id-ID')} km²` : 'Data Belum Tersedia'}
                        </span>
                      </div>
                      <span className="text-2xl md:text-3xl font-base font-bold text-orange-700">
                        {landAreaPercent}%
                      </span>
                    </div>
                  </>
                )}
              </div>
           </div>

        </div>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default InsightPage;