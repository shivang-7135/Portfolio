import {memo} from 'react';
import {motion} from 'framer-motion';
import {currentStatus, SectionId} from '../../data/data';
import Section from '../Layout/Section';

const CurrentStatus = memo(() => {
  return (
    <Section sectionId={SectionId.CurrentStatus}>
      <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.6, type: 'spring', bounce: 0.4}}
        className="relative rounded-[64px] p-[2px] overflow-hidden"
      >
        {/* Animated gradient border background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#E77C19]/30 via-[#E77C19]/80 to-[#E77C19]/30 animate-pulse rounded-[64px]" />
        
        {/* Main card content */}
        <div className="card-float relative h-full w-full bg-white/95 backdrop-blur-xl p-8 md:p-12">
          {/* Top Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="relative flex h-4 w-4 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl text-text-primary font-bold">
                {currentStatus.statusText}
              </h2>
            </div>
            
            <div className="pill bg-gray-50 flex items-center gap-2 px-5 py-2.5 shadow-sm border border-gray-100 transition-colors hover:text-[#E77C19] hover:border-[#E77C19]/30 whitespace-nowrap">
              <span className="text-xl">{currentStatus.statusEmoji}</span>
              <span className="font-body text-sm font-medium text-gray-700">
                {currentStatus.availabilityText}
              </span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {currentStatus.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{opacity: 0, scale: 0.8, y: 20}}
                whileInView={{opacity: 1, scale: 1, y: 0}}
                viewport={{once: true}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + 0.2,
                  type: 'spring',
                  bounce: 0.5
                }}
                className="flex flex-col items-center text-center space-y-2 group"
              >
                <span className="font-heading text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#E77C19] to-[#CC6B13] group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </span>
                <span className="font-body text-sm md:text-base text-gray-500 font-semibold uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
});

CurrentStatus.displayName = 'CurrentStatus';
export default CurrentStatus;
