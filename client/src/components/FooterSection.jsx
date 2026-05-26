import { FaInstagram, FaEnvelope, FaTiktok } from 'react-icons/fa6';
import candiKiri from '../assets/footer/candi-wayang-01.png';
import candiKanan from '../assets/footer/candi-wayang-02.png';
import garuda from '../assets/footer/garuda-picture.png';
import people from '../assets/footer/people.png';
import awan from '../assets/footer/mega-mendung.png';

const FooterSection = () => {
  return (
    <footer className="relative w-full bg-[#D4D9D7] pt-20 flex flex-col justify-end overflow-hidden">

      {/* --- AREA SILUET GAMBAR --- */}
      <div className="relative w-full max-w-6xl mx-auto flex justify-between items-end px-8 md:px-10 z-10 pointer-events-none">
        
        {/* KIRI: Awan + Candi */}
        <div className="relative w-[120px] md:w-[180px] flex-shrink-0">
          <img src={awan} alt="Awan Mega Mendung" className="absolute -top-10 md:-top-16 left-4 md:left-12 w-[50px] md:w-[75px] opacity-90" />
          <img src={candiKiri} alt="Candi Kiri" className="w-full h-auto block translate-y-[12px] md:translate-y-[18px]" />
        </div>

        {/* TENGAH: Garuda + Rakyat */}
        <div className="flex flex-col items-center justify-end relative w-[160px] md:w-[210px] flex-shrink-0">
          <img src={garuda} alt="Garuda" className="w-[45px] md:w-[61px] mb-8 md:mb-10" />
          <img src={people} alt="Rakyat Indonesia" className="w-full h-auto block translate-y-[12px] md:translate-y-[18px]" />
        </div>

        {/* KANAN: Awan + Candi */}
        <div className="relative w-[120px] md:w-[180px] flex-shrink-0">
          <img src={awan} alt="Awan Mega Mendung" className="absolute -top-10 md:-top-16 right-4 md:right-12 w-[50px] md:w-[75px] opacity-90" />
          <img src={candiKanan} alt="Candi Kanan" className="w-full h-auto block translate-y-[12px] md:translate-y-[18px]" />
        </div>

      </div>

      {/* --- AREA KONTEN UTAMA FOOTER (KOTAK HIJAU) --- */}
      <div className="relative w-full bg-[#274338] text-white pt-16 z-20 flex flex-col">
        
        {/* GRID LAYOUT*/}
        <div className="max-w-6xl w-full mx-auto px-8 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16">
          
          {/* KOLOM 1: BRANDING (Lebar 6/12) */}
          <div className="md:col-span-6 flex flex-col">
            <h2 className="text-3xl md:text-4xl font-bold font-teachers mb-4 tracking-wide">
              Nusantaralens
            </h2>
            <p className="text-gray-300 font-teachers text-sm md:text-base leading-relaxed italic w-full md:w-3/4">
              Menjembatani warisan masalalu dengan teknologi masa kini untuk masa depan Indonesia.
            </p>
          </div>

          {/* KOLOM 2: NAVIGATIONS (Lebar 3/12) */}
          <div className="md:col-span-3 flex flex-col md:pl-10">
            <h3 className="text-xl md:text-2xl font-bold font-teachers mb-6">Navigations</h3>
            <ul className="flex flex-col gap-4 font-teachers text-gray-300">
              <li className="hover:text-white cursor-pointer transition w-fit">Home</li>
              <li className="hover:text-white cursor-pointer transition w-fit">Explore</li>
              <li className="hover:text-white cursor-pointer transition w-fit">AI Assistant</li>
              <li className="hover:text-white cursor-pointer transition w-fit">Insights</li>
            </ul>
          </div>

          {/* KOLOM 3: CONTACT US (Lebar 3/12) */}
          <div className="md:col-span-3 flex flex-col md:items-start">
            <h3 className="text-xl md:text-2xl font-bold font-teachers mb-6">Contact Us</h3>
            <div className="flex gap-5">
              <a href="#" className="text-white hover:text-gray-300 transition hover:-translate-y-1 transform duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition hover:-translate-y-1 transform duration-300">
                <FaEnvelope size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition hover:-translate-y-1 transform duration-300">
                <FaTiktok size={24} />
              </a>
            </div>
          </div>

        </div>

        {/* COPYRIGHT BOTTOM STRIP*/}
        <div className="w-full bg-[#1e342b] py-6 mt-auto">
          <div className="max-w-6xl mx-auto px-8 md:px-10 flex justify-center">
            <p className="text-gray-300 font-teachers text-sm text-center">
              ©2026 Nusantaralens | All Right Reserved
            </p>
          </div>
        </div>

      </div>

    </footer>
  );
};

export default FooterSection;