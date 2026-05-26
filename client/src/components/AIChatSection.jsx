import { FaPaperclip, FaPaperPlane, FaUser, FaMusic, FaCommentDots } from 'react-icons/fa6';

const AiChatSection = () => {
  return (
    // Background diubah jadi lebih cerah (#E5E9E6)
    <section className="w-full min-h-screen bg-[#E5E9E6] flex flex-col items-center pt-32 pb-10 px-6">
      
      {/* CONTAINER KONTEN (Membungkus Teks & Card supaya Input Box bisa didorong ke bawah) */}
      <div className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center">
        
        {/* HEADER TEXT */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl font-bold font-teachers text-[#274338] mb-4">
            Hallo, Saya Nusabot
          </h1>
          <p className="text-lg md:text-4xl font-teachers text-[#274338]">
            Apa yang ingin anda ketahui?
          </p>
        </div>

        {/* SUGGESTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-[20px] shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-md transition duration-300">
            <FaUser className="text-[#274338] text-xl" />
            <p className="font-teachers text-sm leading-relaxed text-gray-700">
              Ceritakan kepada saya mengenai pahlawan nasional Ir. Soekarno!
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-[20px] shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-md transition duration-300">
            <FaMusic className="text-[#274338] text-xl" />
            <p className="font-teachers text-sm leading-relaxed text-gray-700">
              Dari mana asalnya alat musik Sasando?
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-[20px] shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-md transition duration-300">
            <FaCommentDots className="text-[#274338] text-xl" />
            <p className="font-teachers text-sm leading-relaxed text-gray-700">
              Beritahu saya 5 bahasa Jawa dalam percakapan sehari-hari!
            </p>
          </div>
        </div>

      </div>

      {/* CHAT INPUT BAR */}
      <div className="w-full max-w-4xl mt-auto pt-8">
        <div className="bg-white rounded-full shadow-md flex items-center p-2 pl-6 gap-4 border border-gray-100">
          <button className="text-gray-400 hover:text-gray-800 transition">
            <FaPaperclip size={20} />
          </button>
          
          <input 
            type="text" 
            placeholder="Tanyakan sesuatu..."
            className="flex-1 bg-transparent outline-none font-teachers text-gray-700 py-3"
          />

          {/* Tombol Send */}
          <button className="bg-[#274338] text-white w-[50px] h-[50px] rounded-full hover:bg-[#1e342b] transition flex items-center justify-center shadow-sm">
            <FaPaperPlane size={18} className="mr-1 mt-1" />
          </button>
        </div>
      </div>

    </section>
  );
};

export default AiChatSection;