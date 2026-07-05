import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App.tsx';
import { restoreGithubPagesRedirect } from './lib/githubPagesRedirect';

restoreGithubPagesRedirect();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-screen bg-background text-foreground">
      <App />
    </div>
  </StrictMode>,
);
