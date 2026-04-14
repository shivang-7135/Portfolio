import {motion} from 'framer-motion';
import {FC, memo} from 'react';

import {certifications, devTools, education, experience, SectionId} from '../../../data/data';
import Section from '../../Layout/Section';
import {SkillsSection} from './Skills';
import TimelineItem from './TimelineItem';

const Resume: FC = memo(() => {
  return (
    <Section sectionId={SectionId.Resume}>
      <div className="flex flex-col gap-y-24">
        
        {/* SKILLS SECTION (Sticky Stacking Layout) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative">
          {/* Sticky Left Column */}
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <h2 className="section-label mb-4">*/ Technical Arsenal</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Core Skills & Tools
            </h3>
            <p className="text-text-secondary font-body leading-relaxed mb-8">
              A comprehensive toolkit honed over years of building resilient AI systems, full-stack platforms, and data pipelines.
            </p>
          </div>

          {/* Scrolling Right Column (Skills Grid) */}
          <div className="lg:w-2/3 w-full">
            <SkillsSection />
          </div>
        </div>

        {/* EXPERIENCE SECTION (Sticky Stacking Layout) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative">
          {/* Sticky Left Column */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 z-10 w-full">
            <h2 className="section-label mb-4">*/ Career Journey</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Experience
            </h3>
            
            {/* Elegant visual card for the sticky side */}
            <motion.div 
              className="w-full aspect-[4/5] rounded-5xl bg-text-primary p-8 flex flex-col justify-between hidden lg:flex"
              whileHover={{ rotateY: 5, rotateX: 5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="text-surface font-script text-3xl opacity-80">
                Building zero-latency intelligence.
              </div>
              <div className="h-12 w-12 rounded-full border border-surface/30 flex items-center justify-center text-surface/50">
                ✦
              </div>
            </motion.div>
          </div>

          {/* Scrolling Right Column (Stacking Cards) */}
          <div className="lg:w-2/3 w-full flex flex-col gap-y-6 lg:pb-32">
            {experience.map((item, index) => (
              <TimelineItem 
                item={item} 
                index={index}
                key={`${item.title}-${index}`} 
              />
            ))}
          </div>
        </div>

        {/* EDUCATION SECTION */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative">
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <h2 className="section-label mb-4">*/ Academic Roots</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Education
            </h3>
          </div>

          <div className="lg:w-2/3 w-full flex flex-col gap-y-6">
            {education.map((item, index) => (
              <TimelineItem 
                item={item} 
                index={index}
                key={`${item.title}-${index}`} 
              />
            ))}
          </div>
        </div>

        {/* CERTIFICATIONS & TOOLS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-float rounded-5xl p-10"
          >
            <h3 className="font-heading text-2xl font-bold text-text-primary mb-6">Certifications</h3>
            <ul className="space-y-4">
              {certifications.map((cert, i) => (
                <li key={i} className="flex items-start gap-x-4 text-text-secondary text-base font-body">
                  <span className="mt-1 flex-shrink-0 text-accent">✦</span>
                  {cert}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="card-float rounded-5xl p-10"
          >
            <h3 className="font-heading text-2xl font-bold text-text-primary mb-6">AI-Assisted Dev Tools</h3>
            <div className="flex flex-wrap gap-3">
              {devTools.map((tool, i) => (
                <motion.span 
                  key={i} 
                  whileHover={{ scale: 1.1 }}
                  className="pill text-sm cursor-pointer"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
});

Resume.displayName = 'Resume';
export default Resume;
