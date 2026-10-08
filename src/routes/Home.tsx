import SEO from '../lib/seo';
import { personJSONLD, websiteJSONLD } from '../lib/structuredData';
import Hero from '../components/sections/Hero';
import Work from '../components/sections/Work';
import Experience from '../components/sections/Experience';
import About from '../components/sections/About';
import Writing from '../components/sections/Writing';
import Contact from '../components/sections/Contact';
import content from '../data/content.json';

const { hero, social } = content;

const jsonLD = [
  personJSONLD({
    name: hero.name,
    url: social.website,
    email: social.email,
    jobTitle: hero.title,
    sameAs: [social.github, social.linkedin, social.kaggle],
  }),
  websiteJSONLD({ name: hero.name, url: social.website, description: hero.tagline }),
];

export default function Home() {
  return (
    <>
      <SEO description={hero.tagline} canonical="https://jakecallcut.dev/" jsonLD={jsonLD} />
      <Hero />
      <Work />
      <Experience />
      <About />
      <Writing />
      <Contact />
    </>
  );
}
