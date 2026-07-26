import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPaperclip, FaPaperPlane, FaUser, FaMusic, FaCommentDots, FaXmark } from 'react-icons/fa6';
import ReactMarkdown from 'react-markdown';
import bgBatik from '../assets/ai/bg-batik.png';

const AIChatSection = () => {
  const location = useLocation();
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  // Menyipan session id menggunakan sessionStorage jika dan menggunakannya jika user sudah memilikinya
  const [sessionId] = useState(() => {
    const savedSessionId = sessionStorage.getItem('nusabot_session_id');
    if (savedSessionId) return savedSessionId;

    const newSessionId = `session_${Date.now()}`;
    sessionStorage.setItem('nusabot_session_id', newSessionId);
    return newSessionId;
  });

  // Mepertahankan chat ketika di refresh atau pindah halaman.
  const [messages, setMessages] = useState(() => {
    const savedMessages = sessionStorage.getItem('nusabot_chat_messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleAttachmentClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Fungsi Tembak API AI
  const handleSendMessage = useCallback( async (text = inputText, file = selectedFile) => {
    if (!text.trim() && !file) return;

    // 1. Masukkan pesan user ke UI
    const newUserMsg = { 
      sender: 'user', 
      text: text, 
      image: file ? URL.createObjectURL(file) : null 
    };
    setMessages(prev => [...prev, newUserMsg]);
    
    // Reset Input
    setInputText("");
    removeImage();
    setIsTyping(true);

    try {
      // 2. Siapkan FormData (WAJIB untuk kirim file)
      const formData = new FormData();
      formData.append('sessionId', sessionId);
      if (text.trim()) formData.append('prompt', text);
      if (file) formData.append('image', file);

      // 3. Tembak API
      const response = await fetch('https://nusantaralens.vercel.app/chat/messages', {
        method: 'POST',
        headers: {
          'x-api-key': '237aa5e59230a900ed4d1e632c5bf9e4a03d4f79d68ae991cd0aaaa2416b95e0'
        },
        body: formData
      });

      const result = await response.json();

      if (result.status === 'success') {
        const aiResponse = { sender: 'ai', text: result.data.response };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        throw new Error(result.message);
      }

    } catch (error) {
      console.error("Gagal mendapat respon AI:", error);
      setMessages(prev => [...prev, { sender: 'ai', text: "Maaf, Nusabot sedang mengalami gangguan. Coba beberapa saat lagi ya!" }]);
    } finally {
      setIsTyping(false);
    }
  }, [sessionId, inputText, selectedFile]);

  // Sinkronasi chat baru dari user dan jawaban baru dari AI
  useEffect(() => {
    sessionStorage.setItem('nusabot_chat_messages', JSON.stringify(messages));
  }, [messages])

  // Auto-scroll ke chat terbawah
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Tangkap data lemparan dari halaman depan (AIAssistantSection)
  useEffect(() => {
    if (location.state) {
      const { initialPrompt, initialFile } = location.state;
      if (initialPrompt || initialFile) {
        const timer = setTimeout(() => {
          handleSendMessage(initialPrompt || "", initialFile);
          window.history.replaceState({}, document.title);
        }, 0);

        return () => clearTimeout(timer)
      }
    }
  }, [location.state, handleSendMessage]);

  return (
    <section className="relative w-full min-h-screen bg-bianca-50 flex flex-col items-center pt-32 pb-8 px-4 md:px-6 overflow-hidden">
      
      {/* Background Animasi */}
      <div className="absolute top-0 left-0 w-1/2 h-full z-0 overflow-hidden pointer-events-none opacity-40">
        <img src={bgBatik} alt="Batik Pattern" className="w-full h-full object-cover object-right" />
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full z-0 overflow-hidden pointer-events-none opacity-40">
        <img src={bgBatik} alt="Batik Pattern" className="w-full h-full object-cover object-left transform scale-x-[-1]" />
      </div>

      <div className="relative z-20 flex-1 w-full max-w-4xl flex flex-col h-[calc(100vh-180px)]">
        
        {/* Tampilan Default (Muncul kalau belum ada chat) */}
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-[54px] font-bold font-base text-inv-accent mb-4 drop-shadow-sm">Hallo, Saya Nusabot</h1>
              <p className="text-xl md:text-2xl font-teachers text-roman-coffee-800">Apa yang ingin anda ketahui?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl">
              <div onClick={() => handleSendMessage("Ceritakan kepada saya mengenai pahlawan nasional Ir. Soekarno!")} className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">
                <FaUser className="text-inv-base text-2xl" />
                <p className="font-teachers text-sm leading-relaxed text-gray-700">Ceritakan kepada saya mengenai pahlawan nasional Ir. Soekarno!</p>
              </div>
              <div onClick={() => handleSendMessage("Dari mana asalnya alat musik Sasando?")} className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">
                <FaMusic className="text-inv-base text-2xl" />
                <p className="font-teachers text-sm leading-relaxed text-gray-700">Dari mana asalnya alat musik Sasando?</p>
              </div>
              <div onClick={() => handleSendMessage("Beritahu saya 5 bahasa Jawa dalam percakapan sehari-hari!")} className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">
                <FaCommentDots className="text-inv-base text-2xl" />
                <p className="font-teachers text-sm leading-relaxed text-gray-700">Beritahu saya 5 bahasa Jawa dalam percakapan sehari-hari!</p>
              </div>
            </div>
          </div>
        ) : (
          // AREA RUANG CHAT (Muncul setelah ada pesan)
          <div className="flex-1 overflow-y-auto w-full flex flex-col gap-6 pr-2 custom-scrollbar pb-10">
            {messages.map((msg, idx) => (
              <div key={idx} className={`w-full flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] md:max-w-[75%] p-4 md:p-5 font-teachers text-sm md:text-base leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-inv-base text-white rounded-[24px] rounded-br-sm' 
                    : 'bg-white text-gray-800 rounded-[24px] rounded-bl-sm border border-gray-100'
                }`}>
                  {msg.image && <img src={msg.image} alt="User Upload" className="max-w-full h-40 md:h-60 object-cover rounded-xl mb-3 shadow-sm" />}
                  {msg.text && (
                    msg.sender === 'ai' ? (
                      <div className="prose-chat">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-line">{msg.text}</p>
                    )
                  )}
                </div>
              </div>
            ))}
            
            {/* Indikator Typing */}
            {isTyping && (
              <div className="w-full flex justify-start">
                <div className="bg-white text-gray-500 rounded-[24px] rounded-bl-sm border border-gray-100 p-4 font-teachers flex items-center gap-2 shadow-sm">
                  <div className="w-2 h-2 bg-inv-base rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-inv-base rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-inv-base rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        {/* CHAT INPUT BAR */}
        <div className="relative w-full mt-auto pt-4">
          {previewImage && (
            <div className="absolute -top-14 left-6 bg-white p-2 rounded-xl shadow-lg border border-gray-200 flex items-start gap-2 z-30">
              <img src={previewImage} alt="Preview" className="h-16 w-16 object-cover rounded-md" />
              <button onClick={removeImage} className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-sm"><FaXmark size={12} /></button>
            </div>
          )}

          <div className="bg-white rounded-[30px] shadow-xl shadow-inv-base/5 flex items-center p-2 pl-4 md:pl-6 gap-2 md:gap-4 border border-gray-100">
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
            
            <button onClick={handleAttachmentClick} disabled={isTyping} className="p-3 text-gray-400 hover:text-inv-base transition transform hover:scale-110 disabled:opacity-50">
              <FaPaperclip size={22} />
            </button>
            
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isTyping && handleSendMessage()}
              placeholder={isTyping ? "Nusabot sedang membalas..." : "Ketik pesan untuk Nusabot..."}
              disabled={isTyping}
              className="flex-1 bg-transparent outline-none font-teachers text-sm md:text-base text-gray-700 py-3 md:py-4 placeholder-gray-400 disabled:opacity-50"
            />

            <button onClick={() => handleSendMessage()} disabled={isTyping || (!inputText.trim() && !selectedFile)} className="bg-inv-base text-white h-[50px] md:h-[60px] px-8 md:px-12 rounded-[25px] hover:bg-roman-coffee-800 transition flex items-center justify-center shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed">
              <FaPaperPlane size={20} className="mr-1 mt-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AIChatSection;