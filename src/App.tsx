import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import Projects from './routes/Projects';
import Experience from './routes/Experience';
import About from './routes/About';
import Contact from './routes/Contact';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
  <div className="flex flex-col min-h-screen font-sans bg-background text-foreground">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
