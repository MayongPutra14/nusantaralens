import NavbarSection from '../components/NavbarSection';
import CultureSection from '../components/CultureSection';
import FooterSection from '../components/FooterSection';

const CulturePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-bianca-50">
      
      <div className="bg-[#9E7D5C] shadow-md">
        <NavbarSection isAbsoluteBg={true} />
      </div>
      
      <main className="flex-1 flex flex-col">
        <CultureSection />
      </main>
      
      <FooterSection />

    </div>
  );
};

export default CulturePage;