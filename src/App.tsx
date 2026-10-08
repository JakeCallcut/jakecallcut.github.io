import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import Home from './routes/Home';
import Writing from './routes/Writing';
import WritingPost from './routes/WritingPost';
import NotFound from './routes/NotFound';

// The site used to have a page per section; keep those URLs working.
const LEGACY_SECTION_ROUTES = [
  { path: '/projects', hash: '#work' },
  { path: '/experience', hash: '#experience' },
  { path: '/about', hash: '#about' },
  { path: '/contact', hash: '#contact' },
];

function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ScrollManager />
        <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
          <Header />
          <main id="main" className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/writing" element={<Writing />} />
              <Route path="/writing/:slug" element={<WritingPost />} />
              {LEGACY_SECTION_ROUTES.map(({ path, hash }) => (
                <Route key={path} path={path} element={<Navigate to={{ pathname: '/', hash }} replace />} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App;
