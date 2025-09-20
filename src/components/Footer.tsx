import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-16 text-center text-sm bg-background">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <SocialLinks />
        <div className="text-muted-foreground">&copy; {new Date().getFullYear()} Jake Callcut. Built with React + Vite.</div>
      </div>
    </footer>
  );
}
