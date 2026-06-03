import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './pages/Home';
import AIAssistantPage from './pages/AIAssistantPage';
import InsightPage from './pages/InsightPage';
import HeroesGalleryPage from './pages/HeroesGalleryPage';
import DictionaryPage from './pages/DictionaryPage';
import CulturePage from './pages/CulturePage';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="/insights" element={<InsightPage />} />
        <Route path="/explore/pahlawan" element={<HeroesGalleryPage />} />
        <Route path="/explore/kamus" element={<DictionaryPage />} />
        <Route path="/explore/budaya" element={<CulturePage />} />
      </Routes>
    </Router>
  );
}

export default App;