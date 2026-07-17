import { SectionId } from '../../data/data';
import Section from '../Layout/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { FC, memo, useState, useCallback } from 'react';

type TechCategory = 'All' | 'AI / ML' | 'Backend' | 'Frontend' | 'Cloud & DevOps' | 'Databases';

interface TechItem {
  name: string;
  category: TechCategory;
  icon: JSX.Element;
  colorClass: string;
}

const SvgIcon: FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 mb-3 transition-colors duration-300">
    {children}
  </svg>
);

const techItems: TechItem[] = [
  // AI / ML
  {
    name: 'Python',
    category: 'AI / ML',
    colorClass: 'group-hover:text-[#3776AB]',
    icon: (
      <SvgIcon>
        <path d="M14.25 2c-3.13 0-5.87.5-5.87 2.25v2.5h6v1.5h-8.5C3.75 8.25 2 10.13 2 13.5c0 3.38 1.75 5.25 3.88 5.25h1.5v-2.5h-6v-1.5h8.5c2.13 0 3.88-1.88 3.88-5.25 0-3.38-1.75-5.25-3.88-5.25z" fillRule="evenodd" />
      </SvgIcon>
    ),
  },
  {
    name: 'PyTorch',
    category: 'AI / ML',
    colorClass: 'group-hover:text-[#EE4C2C]',
    icon: (
      <SvgIcon>
        <path d="M12 2L4 6v6c0 5.52 3.58 10.74 8 12 4.42-1.26 8-6.48 8-12V6l-8-4zm0 2.18l6 3v4.82c0 4.38-2.67 8.52-6 9.77-3.33-1.25-6-5.39-6-9.77V7.18l6-3z" />
      </SvgIcon>
    ),
  },
  {
    name: 'HuggingFace',
    category: 'AI / ML',
    colorClass: 'group-hover:text-[#FFD21E]',
    icon: (
      <SvgIcon>
        <circle cx="12" cy="12" r="10" />
        <circle cx="8" cy="10" r="1.5" fill="white" />
        <circle cx="16" cy="10" r="1.5" fill="white" />
        <path d="M7 15s1.5 3 5 3 5-3 5-3" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </SvgIcon>
    ),
  },
  {
    name: 'LangChain',
    category: 'AI / ML',
    colorClass: 'group-hover:text-[#0052CC]',
    icon: (
      <SvgIcon>
        <path d="M8 10V6c0-2.21 1.79-4 4-4s4 1.79 4 4v4h2V6c0-3.31-2.69-6-6-6S6 2.69 6 6v4H8zm8 4v4c0 2.21-1.79 4-4 4s-4-1.79-4-4v-4H6v4c0 3.31 2.69 6 6 6s6-2.69 6-6v-4h-2z" />
      </SvgIcon>
    ),
  },
  {
    name: 'LangGraph',
    category: 'AI / ML',
    colorClass: 'group-hover:text-[#0052CC]',
    icon: (
      <SvgIcon>
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <path d="M8.12 8.12l3.76 3.76M15.88 8.12l-3.76 3.76M6 9v3M18 9v3" stroke="currentColor" strokeWidth="2" />
      </SvgIcon>
    ),
  },
  {
    name: 'spaCy',
    category: 'AI / ML',
    colorClass: 'group-hover:text-[#09A3D5]',
    icon: (
      <SvgIcon>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </SvgIcon>
    ),
  },
  {
    name: 'BERT',
    category: 'AI / ML',
    colorClass: 'group-hover:text-[#4285F4]',
    icon: (
      <SvgIcon>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10v2H7zM7 12h10v2H7z" fill="white" />
      </SvgIcon>
    ),
  },
  // Backend
  {
    name: 'FastAPI',
    category: 'Backend',
    colorClass: 'group-hover:text-[#009688]',
    icon: (
      <SvgIcon>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </SvgIcon>
    ),
  },
  {
    name: 'Flask',
    category: 'Backend',
    colorClass: 'group-hover:text-[#000000]',
    icon: (
      <SvgIcon>
        <path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm-1-17v6l-5 7h12l-5-7V5h-2z" />
      </SvgIcon>
    ),
  },
  {
    name: 'Django',
    category: 'Backend',
    colorClass: 'group-hover:text-[#092E20]',
    icon: (
      <SvgIcon>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9h2v9h-2zm4 0v-9h2v9h-2z" />
      </SvgIcon>
    ),
  },
  {
    name: 'Celery',
    category: 'Backend',
    colorClass: 'group-hover:text-[#37814A]',
    icon: (
      <SvgIcon>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H9v-2h4v2zm0-4H9V7h4v5z" />
      </SvgIcon>
    ),
  },
  {
    name: 'Pydantic',
    category: 'Backend',
    colorClass: 'group-hover:text-[#E92063]',
    icon: (
      <SvgIcon>
        <path d="M12 2l-9 4v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4zm0 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
      </SvgIcon>
    ),
  },
  // Frontend
  {
    name: 'React',
    category: 'Frontend',
    colorClass: 'group-hover:text-[#61DAFB]',
    icon: (
      <SvgIcon>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="2" />
      </SvgIcon>
    ),
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    colorClass: 'group-hover:text-[#3178C6]',
    icon: (
      <SvgIcon>
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M13.5 17h-2.5v-7h-3v-2h8.5v2h-3v7zm6-4.5h-3.5v1.5h3.5v2H14v-5h3.5v-1.5H14v-2h5.5v5z" fill="white" />
      </SvgIcon>
    ),
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    colorClass: 'group-hover:text-[#F7DF1E]',
    icon: (
      <SvgIcon>
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M11.5 17h-2.5c0 1.5-1.5 2-3 2s-3-.5-3-2H5c0 2.5 2 4 4.5 4s4.5-1.5 4.5-4v-7h-2.5v7zm8.5-2.5c0 1.5-1.5 2-3 2s-3-.5-3-2H15c0 2.5 2 4 4.5 4s4.5-1.5 4.5-4v-1.5c0-1.5-1.5-2-3-2s-3-.5-3-2 1.5-2 3-2 3 .5 3 2H18c0-2.5-2-4-4.5-4s-4.5 1.5-4.5 4v1.5c0 1.5 1.5 2 3 2s3 .5 3 2v1.5z" fill="white" />
      </SvgIcon>
    ),
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    colorClass: 'group-hover:text-[#000000]',
    icon: (
      <SvgIcon>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16l-4-5m0 0L8 8v8m4-3v3m0-11v1" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </SvgIcon>
    ),
  },
  // Cloud & DevOps
  {
    name: 'Azure',
    category: 'Cloud & DevOps',
    colorClass: 'group-hover:text-[#008AD7]',
    icon: (
      <SvgIcon>
        <path d="M13 2L2 15h6l4-8 5 9h5L13 2z" />
      </SvgIcon>
    ),
  },
  {
    name: 'Docker',
    category: 'Cloud & DevOps',
    colorClass: 'group-hover:text-[#2496ED]',
    icon: (
      <SvgIcon>
        <path d="M22 13.5c0-1.5-1.5-2.5-3-2.5H6.5v-3h1.5V6.5H6.5v-3H4.5v3H3v1.5h1.5V11H3v1.5h1.5v1H2C.9 13.5 0 14.4 0 15.5S.9 17.5 2 17.5h18c1.1 0 2-.9 2-2z" />
      </SvgIcon>
    ),
  },
  {
    name: 'CI/CD',
    category: 'Cloud & DevOps',
    colorClass: 'group-hover:text-[#F05032]',
    icon: (
      <SvgIcon>
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-11v4h2v-4h-2zm0 6v2h2v-2h-2z" />
      </SvgIcon>
    ),
  },
  {
    name: 'Azure OpenAI',
    category: 'Cloud & DevOps',
    colorClass: 'group-hover:text-[#10A37F]',
    icon: (
      <SvgIcon>
        <path d="M12 2L2 8l10 6 10-6-10-6zm0 8L4.5 6 12 2l7.5 4L12 10zM2 12v6l10 6 10-6v-6l-10 6-10-6z" />
      </SvgIcon>
    ),
  },
  // Databases
  {
    name: 'PostgreSQL',
    category: 'Databases',
    colorClass: 'group-hover:text-[#336791]',
    icon: (
      <SvgIcon>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </SvgIcon>
    ),
  },
  {
    name: 'MongoDB',
    category: 'Databases',
    colorClass: 'group-hover:text-[#47A248]',
    icon: (
      <SvgIcon>
        <path d="M12 2C8.4 4.5 5 8 5 12c0 3.9 3.1 7 7 7s7-3.1 7-7c0-4-3.4-7.5-7-10z" />
      </SvgIcon>
    ),
  },
  {
    name: 'FAISS',
    category: 'Databases',
    colorClass: 'group-hover:text-[#000000]',
    icon: (
      <SvgIcon>
        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
      </SvgIcon>
    ),
  },
  {
    name: 'Chroma',
    category: 'Databases',
    colorClass: 'group-hover:text-[#FF5722]',
    icon: (
      <SvgIcon>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20M2 12h20" stroke="white" strokeWidth="2" />
      </SvgIcon>
    ),
  },
];

const categories: TechCategory[] = ['All', 'AI / ML', 'Backend', 'Frontend', 'Cloud & DevOps', 'Databases'];

const TechRadar: FC = memo(() => {
  const [activeCategory, setActiveCategory] = useState<TechCategory>('All');

  const filteredTech = techItems.filter(
    (tech) => activeCategory === 'All' || tech.category === activeCategory
  );

  const handleCategoryChange = useCallback((category: TechCategory) => {
    setActiveCategory(category);
  }, []);

  return (
    <Section sectionId={SectionId.Skills} className="py-24">
      <div className="flex flex-col items-center mb-16">
        <span className="section-label mb-4">✦ Technologies</span>
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-slate-800 text-center">
          My Tech Stack
        </h2>
      </div>

      <div className="flex justify-start md:justify-center overflow-x-auto pb-6 mb-8 gap-3 px-4 hide-scrollbar w-full max-w-5xl mx-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`pill whitespace-nowrap transition-all duration-300 ${
              activeCategory === category
                ? 'bg-[#E77C19] text-white'
                : 'bg-white text-slate-600 hover:bg-[#CC6B13] hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-6xl mx-auto px-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredTech.map((tech) => (
            <motion.div
              key={tech.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, type: 'spring', bounce: 0.4 }}
              className="bg-white shadow-card rounded-3xl p-6 border border-gray-100/50 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center justify-center"
            >
              <div className={`text-slate-500 transition-colors duration-300 ${tech.colorClass}`}>
                {tech.icon}
              </div>
              <span className="font-heading font-medium text-slate-700 text-center">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
});

TechRadar.displayName = 'TechRadar';

export default TechRadar;
