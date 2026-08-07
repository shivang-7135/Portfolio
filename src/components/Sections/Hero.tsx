import {ArrowDownRightIcon} from '@heroicons/react/24/outline';
import {motion, Variants} from 'framer-motion';
import {FC, memo, useEffect, useState} from 'react';

import {heroData, SectionId} from '../../data/data';
import Section from '../Layout/Section';
import Socials from '../Socials';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 50, damping: 15 } 
  },
};

const Hero: FC = memo(() => {
  const {description, actions} = heroData;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div className="relative flex flex-col justify-center min-h-screen w-full px-5 overflow-hidden pt-28 pb-16 sm:px-8">
        
        {/* Ambient Floating Orbs tied to mouse position */}
        <motion.div 
          className="pointer-events-none absolute w-[38rem] h-[38rem] rounded-full bg-accent/15 blur-[120px] top-0 -left-32"
          animate={{
            x: mousePosition.x / 4,
            y: mousePosition.y / 4,
          }}
          transition={{ type: 'spring', damping: 40, stiffness: 40 }}
        />
        <motion.div 
          className="pointer-events-none absolute w-[46rem] h-[46rem] rounded-full bg-violet-600/20 blur-[140px] bottom-0 -right-20"
          animate={{
            x: mousePosition.x / -6,
            y: mousePosition.y / -6,
          }}
          transition={{ type: 'spring', damping: 50, stiffness: 30 }}
        />

        <motion.div 
          className="relative mx-auto w-full max-w-7xl z-10 flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-text-secondary">
            <span className="h-2 w-2 rounded-full bg-accent shadow-glow" />
            Available for new opportunities
          </motion.div>

          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_280px]">
            <div className="relative">
              <motion.h1 variants={itemVariants} className="font-heading text-[17vw] font-black tracking-[-0.085em] text-text-primary leading-[0.76] sm:text-[11.5vw] lg:text-[8.8rem] xl:text-[10.5rem]">
                Building<br /><span className="gradient-text">useful AI.</span>
              </motion.h1>
              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-2">
                {['AI Systems', 'Full-stack', 'Munich, DE'].map(item => (
                  <span className="pill" key={item}>{item}</span>
                ))}
              </motion.div>
            </div>
            <motion.div variants={itemVariants} className="hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 lg:block">
              <p className="font-script text-3xl leading-none text-accent">Hello, I&apos;m</p>
              <p className="mt-3 font-heading text-3xl font-bold text-text-primary">Shivang<br />Sinha</p>
              <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-text-muted"><span>SCROLL TO EXPLORE</span><ArrowDownRightIcon className="h-5 w-5 text-accent" /></div>
            </motion.div>
          </div>

          <div className="mt-12 grid max-w-3xl grid-cols-1 items-end gap-8 md:grid-cols-[1fr_auto] lg:mt-16">
            <motion.div className="text-base md:text-lg font-body text-text-secondary leading-relaxed" variants={itemVariants}>
              {description}
            </motion.div>

            <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
              {actions.map(({href, text, primary, Icon}) => (
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center gap-x-3 rounded-full px-6 py-3.5 text-sm font-semibold font-body whitespace-nowrap
                    transition-all duration-300
                    ${primary
                      ? 'bg-accent text-black shadow-glow hover:bg-accent-hover'
                      : 'bg-white/5 text-text-primary border border-white/15 hover:border-white/40 hover:bg-white/10'
                    }
                  `}
                  href={href}
                  key={text}>
                  {text}
                  {Icon && <Icon className="h-5 w-5" />}
                </motion.a>
              ))}
            </motion.div>

          </div>
          <motion.div className="mt-12 flex items-center gap-5 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.16em] text-text-muted" variants={itemVariants}><span>Find me online</span><span className="h-px w-8 bg-white/20" /><Socials /></motion.div>
        </motion.div>
      </div>
    </Section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
