import {motion} from 'framer-motion';
import {FC, memo} from 'react';

import {skills} from '../../../data/data';

export const SkillsSection: FC = memo(() => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skills.map(({name, skills: skillItems}, catIndex) => (
        <motion.div 
          key={name} 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: catIndex * 0.1, type: 'spring' }}
          className="bg-surface/80 shadow-card rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <h4 className="font-heading text-sm font-bold text-text-primary mb-6 uppercase tracking-wider flex items-center gap-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {name}
          </h4>
          <div className="flex flex-col gap-y-4">
            {skillItems.map(({name: skillName, level}, skillIdx) => (
              <div key={skillName} className="flex flex-col gap-y-1.5">
                <span className="text-sm font-medium text-text-secondary">{skillName}</span>
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(level / 10) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: catIndex * 0.1 + skillIdx * 0.05, type: 'spring', bounce: 0.2 }}
                    className="h-full bg-accent rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
});

SkillsSection.displayName = 'SkillsSection';

// Keep default export for backward compatibility
const Skills: FC = memo(() => <SkillsSection />);
Skills.displayName = 'Skills';
export default Skills;
