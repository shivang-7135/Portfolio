import {motion} from 'framer-motion';
import Image from 'next/image';
import {FC, memo} from 'react';

import {aboutData, SectionId} from '../../data/data';
import Section from '../Layout/Section';

const About: FC = memo(() => {
  const {profileImageSrc, description} = aboutData;

  const codeLines = [
    { type: 'comment', text: '// about.ts' },
    { type: 'code', text: 'const shivang = {' },
    { type: 'property', key: 'location', value: '"Munich, Germany"', comma: true },
    { type: 'property', key: 'age', value: '"28"', comma: true },
    { type: 'property', key: 'nationality', value: '"Indian"', comma: true },
    { type: 'property', key: 'interests', value: '"AI, Badminton & Cricket"', comma: true },
    { type: 'property', key: 'study', value: '"M.Sc. NLP – University of Trier"', comma: true },
    { type: 'property', key: 'availability', value: '"Currently available for full-time roles"', comma: true },
    { type: 'code', text: '};' }
  ];

  return (
    <Section sectionId={SectionId.About} sectionTitle="About Me">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="card-float p-7 md:p-10 relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Profile Image with subtle heartbeat pulse float */}
          {!!profileImageSrc && (
            <motion.div 
              className="lg:col-span-4 flex justify-center lg:justify-start"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-3xl border border-white/10 shadow-card">
                <Image
                  alt="about-me-image"
                  className="h-full w-full object-cover"
                  src={profileImageSrc}
                />
              </div>
            </motion.div>
          )}

          {/* Content block */}
          <div className={`lg:col-span-${profileImageSrc ? '8' : '12'} flex flex-col gap-y-6 z-10`}>
            <div className="flex flex-col gap-y-3">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
                Engineering Intelligence
              </h2>
              <p className="text-text-secondary text-base leading-relaxed font-body">
                {description}
              </p>
            </div>

            {/* Code Editor */}
            <div className="code-editor mt-4 rounded-xl overflow-hidden border border-white/10 bg-[#1E1E1E] shadow-2xl font-mono text-sm sm:text-base">
              <div className="code-editor__titlebar flex items-center px-4 py-3 bg-[#2D2D2D] border-b border-white/5">
                <div className="flex gap-2 mr-4">
                  <div className="code-editor__dot--red w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="code-editor__dot--yellow w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="code-editor__dot--green w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="code-editor__filename text-text-muted text-xs">about.ts</div>
              </div>
              <div className="code-editor__body p-4 overflow-x-auto">
                {codeLines.map((line, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, type: 'spring' }}
                    key={idx}
                    className="code-editor__line flex gap-4 leading-relaxed whitespace-nowrap"
                  >
                    <span className="code-editor__line-number text-text-muted/50 select-none w-6 text-right">{idx + 1}</span>
                    <div>
                      {line.type === 'comment' && (
                        <span className="code-editor__comment text-text-muted italic">{line.text}</span>
                      )}
                      {line.type === 'code' && (
                        <span className="text-text-primary">{line.text}</span>
                      )}
                      {line.type === 'property' && (
                        <span className="pl-4">
                          <span className="code-editor__key text-sky-300">{line.key}</span>
                          <span className="text-text-primary">: </span>
                          <span className="code-editor__value text-emerald-300">{line.value}</span>
                          {line.comma && <span className="text-text-primary">,</span>}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/ShivangSinhaCVv3.pdf"
                className="flex items-center gap-x-2 rounded-full bg-accent text-black px-6 py-2.5 text-sm font-semibold font-body shadow-glow"
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
                className="flex items-center gap-x-2 rounded-full bg-white/5 text-text-primary border border-white/15 px-6 py-2.5 text-sm font-semibold font-body hover:border-accent hover:text-accent shadow-card transition-colors">
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
