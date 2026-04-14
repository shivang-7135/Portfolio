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
      <div className="relative flex flex-col justify-center min-h-screen w-full px-4 overflow-hidden pt-32 pb-24">
        
        {/* Ambient Floating Orbs tied to mouse position */}
        <motion.div 
          className="pointer-events-none absolute w-[40rem] h-[40rem] rounded-full bg-accent/20 blur-[100px] mix-blend-multiply top-0 left-0"
          animate={{
            x: mousePosition.x / 4,
            y: mousePosition.y / 4,
          }}
          transition={{ type: 'spring', damping: 40, stiffness: 40 }}
        />
        <motion.div 
          className="pointer-events-none absolute w-[50rem] h-[50rem] rounded-full bg-yellow/10 blur-[120px] mix-blend-multiply bottom-10 right-10"
          animate={{
            x: mousePosition.x / -6,
            y: mousePosition.y / -6,
          }}
          transition={{ type: 'spring', damping: 50, stiffness: 30 }}
        />

        <motion.div 
          className="relative mx-auto w-full max-w-screen-2xl perspective-1000 z-10 flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Main Massive Typography Stack */}
          <div className="flex flex-col items-center justify-center min-w-full gap-y-0 relative text-center">
            
            <motion.div variants={itemVariants} className="w-full relative z-20">
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-text-muted font-script text-3xl whitespace-nowrap">
                */ AI engineer
              </span>
              <h1 className="font-heading font-black tracking-tighter text-[16vw] sm:text-[14vw] lg:text-[13rem] text-text-primary leading-[0.8] m-0 drop-shadow-sm">
                SHIVANG
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full relative z-20 mt-2 lg:mt-6">
              <span className="absolute -bottom-12 right-1/2 translate-x-1/2 text-text-muted font-script text-3xl whitespace-nowrap">
                */ Full Stack engineer
              </span>
              <h1 className="font-heading font-black tracking-tighter text-[16vw] sm:text-[14vw] lg:text-[13rem] text-text-primary leading-[0.8] m-0 drop-shadow-sm">
                SINHA
              </h1>
            </motion.div>
          </div>

          {/* Sub Content - Below the Massive Hero */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mt-28 lg:mt-36">
            <motion.div className="mb-10 text-lg md:text-xl font-body text-text-secondary leading-relaxed bg-white/40 backdrop-blur-sm p-4 rounded-3xl" variants={itemVariants}>
              {description}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-wrap justify-center gap-6 mb-12" variants={itemVariants}>
              {actions.map(({href, text, primary, Icon}) => (
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center gap-x-3 rounded-full px-10 py-5 text-base font-semibold font-body
                    transition-all duration-300
                    ${primary
                      ? 'bg-text-primary text-white shadow-card hover:shadow-card-hover hover:bg-accent'
                      : 'bg-surface/80 backdrop-blur-md text-text-primary border border-gray-100 hover:border-gray-300 shadow-sm hover:shadow-md'
                    }
                  `}
                  href={href}
                  key={text}>
                  {text}
                  {Icon && <Icon className="h-5 w-5" />}
                </motion.a>
              ))}
            </motion.div>

            {/* Social Icons */}
            <motion.div className="flex gap-x-8 opacity-80 bg-white/60 backdrop-blur-lg px-8 py-4 rounded-full shadow-sm" variants={itemVariants}>
              <Socials />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
