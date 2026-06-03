import NavbarSection from '../components/NavbarSection';
import DictionarySection from '../components/DictionarySection';
import FooterSection from '../components/FooterSection';

const DictionaryPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-bianca-50">
      <div className="bg-inv-base shadow-md">
        <NavbarSection isAbsoluteBg={true} />
      </div>
      <main className="flex-1 flex flex-col">
        <DictionarySection />
      </main>
      <FooterSection />
    </div>
  );
};

export default DictionaryPage;