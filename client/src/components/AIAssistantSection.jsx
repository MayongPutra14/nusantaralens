import { useState, useRef } from 'react';
import { FaPaperclip, FaArrowRight, FaXmark } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import barong from '../assets/ai/reog-bali.png';

const AIAssistantSection = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [promptText, setPromptText] = useState("");
  const fileInputRef = useRef(null);

  const handleAttachmentClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = () => {
    if (!promptText && !selectedFile) return;
    
    // Lempar data ke halaman Chat AI pakai fitur State React Router
    navigate('/ai-assistant', { 
      state: { 
        initialPrompt: promptText, 
        initialFile: selectedFile 
      } 
    });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-bianca-50 overflow-hidden py-24 px-4 sm:px-6 shadow-[inset_0_10px_20px_rgba(0,0,0,0.03)]">

      <div className="absolute left-[-5%] top-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#8B7E6D] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse pointer-events-none z-0"></div>
      <div className="absolute right-[-5%] bottom-[15%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#5a442e] rounded-full mix-blend-multiply filter blur-[100px] opacity-35 pointer-events-none delay-1000 z-0"></div>

      <div data-aos="fade-right" data-aos-delay="200" className="hidden md:block absolute left-[-5%] lg:left-[2%] top-1/2 transform -translate-y-1/2 w-48 lg:w-72 opacity-90 z-10 pointer-events-none transition-all duration-300">
        <img src={barong} alt="Ornamen Barong Kiri" className="absolute left-0 top-1/2 left-1/4 -translate-y-1/2 w-32 md:w-48 opacity-80" />
      </div>
      <div data-aos="fade-left" data-aos-delay="200" className="hidden md:block absolute right-[-5%] lg:right-[2%] top-1/2 transform -translate-y-1/2 w-48 lg:w-72 opacity-90 z-10 pointer-events-none transition-all duration-300">
        <img src={barong} alt="Ornamen Barong Kanan" className="absolute right-0 top-1/2 right-1/4 -translate-y-1/2 w-32 md:w-48 opacity-80" />
      </div>

      <div className="relative z-20 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2 data-aos="fade-up" data-aos-delay="200" className="text-4xl md:text-[64px] font-base font-bold text-swirl-600 mb-6 drop-shadow-sm leading-tight">
          Eksplorasi dengan <br className="hidden md:block" /> NusantaraLens AI
        </h2>
        <p data-aos="zoom-in" data-aos-delay="500" className="text-sm md:text-lg font-teachers text-roman-coffee-800 mb-10 max-w-2xl leading-relaxed px-4 md:px-0">
          Cari tahu informasi lebih dalam tentang budaya dan sejarah melalui teks atau gambar. Cukup tanyakan atau unggah foto untuk mendapatkan penjelasan yang relevan.
        </p>

        <button data-aos="fade-up" data-aos-delay="400" onClick={() => navigate('/ai-assistant')} className="flex items-center justify-between bg-white text-inv-base w-[190px] h-[55px] rounded-full pl-6 pr-2 font-bold font-teachers hover:bg-gray-50 transition shadow-lg border border-gray-200 group mb-16 relative z-30">
          <span className="text-sm">Mulai Menjelajah</span>
          <span className="bg-inv-base text-white p-2.5 rounded-full group-hover:bg-roman-coffee-800 transition"><FaArrowRight size={14} /></span>
        </button>

        <div data-aos="fade-down" className="flex items-center bg-white w-full max-w-3xl min-h-[60px] md:min-h-[75px] rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.08)] px-3 md:px-4 border border-gray-100 relative z-30 transition-all duration-300 hover:shadow-[0_25px_60px_rgba(90,68,46,0.1)] focus-within:shadow-[0_25px_60px_rgba(90,68,46,0.1)] py-2">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          <button onClick={handleAttachmentClick} className="p-2 md:p-3 text-gray-400 hover:text-inv-base transition cursor-pointer flex-shrink-0" title="Unggah Gambar">
            <FaPaperclip size={18} className="md:text-xl" />
          </button>
          
          <div className="flex-1 flex flex-wrap items-center gap-2 overflow-hidden px-2">
            {selectedFile && (
              <div className="flex items-center gap-2 bg-bianca-50 border border-inv-border text-inv-base px-3 py-1.5 rounded-full text-xs md:text-sm font-teachers animate-fade-in flex-shrink-0">
                <span className="truncate max-w-[100px] md:max-w-[150px]">{selectedFile.name}</span>
                <button onClick={handleRemoveFile} className="hover:text-red-500 transition focus:outline-none"><FaXmark size={14} /></button>
              </div>
            )}
            <input type="text" value={promptText} onChange={(e) => setPromptText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={selectedFile ? "Tambahkan pesan..." : "Cari tahu tentang Budaya Indonesia disini..."} className="flex-1 min-w-[150px] bg-transparent border-none outline-none text-inv-base font-teachers py-2 text-sm md:text-lg placeholder-gray-400" />
          </div>
          
          <button onClick={handleSend} className="bg-inv-base text-white font-bold font-teachers text-sm md:text-base px-6 md:px-10 h-[45px] md:h-[55px] rounded-full hover:bg-roman-coffee-800 transition shadow-md ml-2 cursor-pointer flex-shrink-0">
            Kirim
          </button>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantSection;