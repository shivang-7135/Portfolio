import {motion} from 'framer-motion';
import Image from 'next/image';
import {FC, memo} from 'react';

import {aboutData, SectionId} from '../../data/data';
import Section from '../Layout/Section';

const About: FC = memo(() => {
  const {profileImageSrc, description, aboutItems} = aboutData;
  return (
    <Section sectionId={SectionId.About} sectionTitle="About Me">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="card-float p-8 md:p-12 relative overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Profile Image with subtle heartbeat pulse float */}
          {!!profileImageSrc && (
            <motion.div 
              className="flex justify-center md:justify-start"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative h-48 w-48 md:h-56 md:w-56 overflow-hidden rounded-3xl shadow-card">
                <Image
                  alt="about-me-image"
                  className="h-full w-full object-cover"
                  src={profileImageSrc}
                />
              </div>
            </motion.div>
          )}

          {/* Content block */}
          <div className={`col-span-1 ${profileImageSrc ? 'md:col-span-2' : 'md:col-span-3'} flex flex-col gap-y-6 z-10`}>
            <div className="flex flex-col gap-y-3">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
                Engineering Intelligence
              </h2>
              <p className="text-text-secondary text-base leading-relaxed font-body">
                {description}
              </p>
            </div>

            {/* About items grid */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutItems.map(({label, text, Icon}, idx) => (
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: 'spring' }}
                  className="flex items-center gap-x-3 p-3 rounded-2xl bg-bg hover:bg-bg-alt transition-colors duration-300" 
                  key={idx}>
                  {Icon && <Icon className="h-5 w-5 text-accent flex-shrink-0" />}
                  <div>
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider font-body">{label}</span>
                    <p className="text-sm font-medium text-text-primary font-body">{text}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/ShivangSinhaCVv3.pdf"
                className="flex items-center gap-x-2 rounded-full bg-accent text-white px-6 py-2.5 text-sm font-semibold font-body shadow-glow"
                download>
                Download CV
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:shivangsinha2@gmail.com"
                className="flex items-center gap-x-2 rounded-full bg-surface text-text-primary border border-gray-200 px-6 py-2.5 text-sm font-semibold font-body hover:border-accent hover:text-accent shadow-card">
                Email Me
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
});

About.displayName = 'About';
export default About;
