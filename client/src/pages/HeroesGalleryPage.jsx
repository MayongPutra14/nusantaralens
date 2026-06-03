import NavbarSection from '../components/NavbarSection';
import HeroesGallerySection from '../components/HeroesGallerySection';
import FooterSection from '../components/FooterSection';

const HeroesGalleryPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-bianca-50">
      <NavbarSection isAbsoluteBg={true} />
      <main className="flex-1 flex flex-col">
        <HeroesGallerySection />
      </main>
      <FooterSection />
    </div>
  );
};

export default HeroesGalleryPage;