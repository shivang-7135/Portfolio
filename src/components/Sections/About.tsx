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
    { type: 'property', key: 'location', value: '"Germany"' },
    { type: 'property', key: 'languages', value: '"English (C1), German (B1)"' },
    { type: 'property', key: 'nationality', value: '"Indian"' },
    { type: 'property', key: 'interests', value: '"AI, Badminton & Cricket"' },
    { type: 'property', key: 'study', value: '"M.Sc. NLP – University of Trier"' },
    { type: 'property', key: 'workPermit', value: '"Eligible across Germany & EU"' },
    { type: 'property', key: 'status', value: '"Available immediately"' },
    { type: 'code', text: '};' }
  ];

  return (
    <Section sectionId={SectionId.About} sectionTitle="About Me">
      <div className="flex flex-col gap-y-8">

        {/* Top Row: Image + Description */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="card-float p-7 md:p-10 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            {/* Profile Image */}
            {!!profileImageSrc && (
              <motion.div
                className="flex-shrink-0 flex justify-center w-full md:w-auto"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="relative h-56 w-56 md:h-64 md:w-64 overflow-hidden rounded-3xl border border-white/10 shadow-card">
                  <Image
                    alt="about-me-image"
                    className="h-full w-full object-cover"
                    src={profileImageSrc}
                  />
                </div>
              </motion.div>
            )}

            {/* Description */}
            <div className="flex flex-col gap-y-5 flex-1 min-w-0">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
                AI Engineer with Full-Stack Experience
              </h2>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed font-body">
                {description}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:shivangsinha2@gmail.com"
                  className="flex items-center gap-x-2 rounded-full bg-accent text-black px-6 py-2.5 text-sm font-semibold font-body shadow-glow hover:bg-accent/90 transition-colors">
                  Email Me
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Row: Code Editor Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, type: 'spring' }}
          className="code-editor rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl"
        >
          <div className="code-editor__titlebar flex items-center px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
            <div className="flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
            </div>
            <div className="font-mono text-text-muted text-xs">about.ts</div>
          </div>
          <div className="p-4 md:p-5 overflow-x-auto">
            {codeLines.map((line, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07, type: 'spring' }}
                key={idx}
                className="flex gap-4 py-0.5 font-mono text-xs sm:text-sm leading-7 hover:bg-white/[0.02] rounded px-2 -mx-2 transition-colors"
              >
                <span className="text-text-muted/30 select-none w-5 text-right flex-shrink-0">{idx + 1}</span>
                <div className="whitespace-nowrap">
                  {line.type === 'comment' && (
                    <span className="text-text-muted/60 italic">{line.text}</span>
                  )}
                  {line.type === 'code' && (
                    <span className="text-text-primary">{line.text}</span>
                  )}
                  {line.type === 'property' && (
                    <span className="pl-4">
                      <span className="text-sky-300">{line.key}</span>
                      <span className="text-text-primary">: </span>
                      <span className="text-emerald-300">{line.value}</span>
                      <span className="text-text-primary">,</span>
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </Section>
  );
});

About.displayName = 'About';
export default About;
