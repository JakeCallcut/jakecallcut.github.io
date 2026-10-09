export interface SiteSection {
  id: string;
  label: string;
  index: string;
}

export const SECTIONS: SiteSection[] = [
  { id: 'work', label: 'Work', index: '01' },
  { id: 'experience', label: 'Experience', index: '02' },
  { id: 'about', label: 'About', index: '03' },
  { id: 'writing', label: 'Writing', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
];

export const CV_PATH = '/Jake_Callcut.pdf';
