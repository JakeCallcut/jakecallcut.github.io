import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import '@fontsource/instrument-serif/400.css';
import './styles/globals.css';
import App from './App.tsx';
import { restoreGithubPagesRedirect } from './lib/githubPagesRedirect';

restoreGithubPagesRedirect();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
