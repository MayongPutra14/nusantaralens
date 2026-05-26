import { FaPaperclip } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';

const AiAssistantSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#F4F6F5] overflow-hidden py-24 shadow-[inset_0_10px_20px_rgba(0,0,0,0.03)]">

      {/* --- EFEK BLOB (GLOWING GREEN) --- */}
      <div className="absolute left-[-5%] top-[10%] w-[400px] h-[400px] bg-[#008781] rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-pulse pointer-events-none z-0"></div>
      <div className="absolute right-[-5%] top-[15%] w-[350px] h-[350px] bg-[#008781] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none delay-1000 z-0"></div>

      {/* --- KONTEN UTAMA --- */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        
        <h2 className="text-5xl md:text-6xl font-bold font-teachers text-gray-500 mb-2">
          Eksplorasi dengan
        </h2>
        <h2 className="text-5xl md:text-6xl font-bold font-teachers text-[#008781] mb-6">
          NusantaraLens AI
        </h2>
        
        <p className="text-base md:text-lg font-teachers text-gray-600 mb-10 max-w-2xl leading-relaxed">
          Cari tahu informasi lebih dalam tentang budaya dan sejarah melalui teks atau gambar.
          Cukup tanyakan atau unggah foto untuk mendapatkan penjelasan yang relevan.
        </p>

        <button className="flex items-center justify-between bg-white text-[#008781] w-[186px] h-[55px] rounded-full pl-5 pr-2 font-bold font-teachers hover:bg-gray-100 transition shadow-md border border-gray-100 group mb-16">
          <span className="text-sm">Mulai Menjelajah</span>
          <span className="bg-[#008781] text-white p-2.5 rounded-full group-hover:bg-[#006b66] transition">
            <FaArrowRight size={14} />
          </span>
        </button>

        {/* --- DUMMY INPUT BOX --- */}
        <div className="flex items-center bg-white w-full max-w-2xl h-[70px] rounded-full shadow-lg px-4 border border-gray-100">
          <button className="p-3 text-gray-400 hover:text-gray-600 transition">
            <FaPaperclip size={20} />
          </button>
          
          <input 
            type="text" 
            placeholder="Siapa Ki Hadjar Dewantara?" 
            className="flex-1 bg-transparent border-none outline-none text-gray-700 font-teachers px-3 text-base md:text-lg placeholder-gray-400"
            disabled
          />
          
          <button className="bg-[#008781] text-white font-bold font-teachers px-8 h-[45px] rounded-full hover:bg-[#006b66] transition shadow-md ml-2">
            Kirim
          </button>
        </div>

      </div>

    </section>
  );
};

export default AiAssistantSection;