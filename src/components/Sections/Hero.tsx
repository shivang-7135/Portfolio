import {PlayIcon} from '@heroicons/react/24/outline';
import {motion, Variants} from 'framer-motion';
import Image from 'next/image';
import {FC, memo} from 'react';

import {aboutData, heroData, SectionId} from '../../data/data';
import Section from '../Layout/Section';

const containerVariants: Variants = {
  hidden: {opacity: 0},
  show: {opacity: 1, transition: {staggerChildren: 0.15, delayChildren: 0.1}},
};

const itemVariants: Variants = {
  hidden: {opacity: 0, y: 30},
  show: {opacity: 1, y: 0, transition: {type: 'spring', stiffness: 80, damping: 17}},
};

const TitleWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

const Hero: FC = memo(() => {
  const {description, actions} = heroData;
  const cvAction = actions.find(action => action.primary) ?? actions[0];
  const contactAction = actions.find(action => !action.primary) ?? actions[1];

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div className="reference-hero relative">
        <motion.div 
          className="floating-code absolute top-[10%] left-[5%] font-mono text-xs text-text-muted glass px-3 py-2 rounded-md border border-white/10 hidden lg:block z-0"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-pink-500">const</span> <span className="text-accent">ai</span> = <span className="text-blue-400">await</span> <span className="text-yellow-200">train</span>(model)
        </motion.div>
        
        <motion.div 
          className="floating-code absolute top-[30%] right-[5%] font-mono text-xs text-text-muted glass px-3 py-2 rounded-md border border-white/10 hidden lg:block z-0"
          animate={{ y: [15, -15, 15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <span className="text-pink-500">import</span> {'{'} future {'}'} <span className="text-pink-500">from</span> <span className="text-green-300">'./next'</span>
        </motion.div>

        <motion.div 
          className="floating-code absolute bottom-[25%] left-[8%] font-mono text-xs text-text-muted glass px-3 py-2 rounded-md border border-white/10 hidden lg:block z-0"
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <span className="text-blue-400">async</span> <span className="text-pink-500">function</span> <span className="text-yellow-200">build</span>() {'{'}
        </motion.div>

        <motion.div 
          className="floating-code absolute bottom-[40%] right-[10%] font-mono text-xs text-text-muted glass px-3 py-2 rounded-md border border-white/10 hidden lg:block z-0"
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <span className="text-text-secondary">// TODO: change the world</span>
        </motion.div>

        <motion.div animate="show" className="reference-hero__inner relative z-10" initial="hidden" variants={containerVariants}>
          <div className="reference-hero__copy">
            <motion.div className="reference-eyebrow font-mono" variants={itemVariants}>
              <span className="text-accent font-bold mr-2">&gt;</span>
              hello_world<span className="animate-cursor-blink text-accent ml-1">█</span>
            </motion.div>
            
            <TitleWrapper>
              <motion.h1 className="reference-hero__title" variants={itemVariants}>
                An AI engineer<br />
                <span>&amp; full-stack builder.</span>
              </motion.h1>
            </TitleWrapper>
            
            <motion.div className="reference-hero__description" variants={itemVariants}>{description}</motion.div>
            <motion.div className="reference-hero__actions" variants={itemVariants}>
              {cvAction && (
                <motion.a 
                  className="reference-button reference-button--primary bg-[#0A66C2] text-white border-none hover:bg-[#084e96] shadow-glow" 
                  href={cvAction.href}
                  target="_blank"
                  rel="noopener noreferrer" 
                  whileHover={{y: -3, scale: 1.05}} 
                  whileTap={{scale: 0.97}}>
                  {cvAction.Icon && <cvAction.Icon className="h-4 w-4 fill-current" />}
                  {cvAction.text}
                </motion.a>
              )}
              {contactAction && (
                <motion.a className="reference-button reference-button--watch" href={contactAction.href} whileHover={{x: 4, scale: 1.02}}>
                  <span className="reference-button__play"><PlayIcon className="h-3 w-3 fill-current" /></span>
                  Let&apos;s talk
                </motion.a>
              )}
            </motion.div>
          </div>

          <motion.div className="reference-hero__portrait relative overflow-hidden rounded-3xl" variants={itemVariants}>
            <div className="absolute inset-0 z-20 pointer-events-none animate-scan-line" />
            
            {/* Named Inventor badge */}
            <motion.div 
              className="absolute top-4 left-4 z-30 flex items-center gap-x-2 px-3 py-1.5 rounded-full bg-black/80 border border-accent/40 shadow-glow backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-accent text-sm">⭐</span>
              <span className="text-xs font-mono font-bold text-text-primary">Named Inventor @ Carl Zeiss</span>
            </motion.div>

            <div className="reference-hero__orb reference-hero__orb--one" />
            <div className="reference-hero__orb reference-hero__orb--two" />
            <div className="reference-hero__arch" />
            <Image
              alt="Shivang Sinha"
              className="reference-hero__image relative z-10"
              height={780}
              priority
              sizes="(min-width: 1024px) 45vw, 88vw"
              src={aboutData.profileImageSrc!}
              width={620}
            />
            <motion.div 
              className="reference-hero__location relative z-30" 
              animate={{ scale: [1, 1.02, 1] }} 
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="reference-location-dot animate-pulse" /> Germany 🇩🇪
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
