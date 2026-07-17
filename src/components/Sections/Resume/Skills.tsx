import {motion} from 'framer-motion';
import {FC, memo} from 'react';

import {skills} from '../../../data/data';

export const SkillsSection: FC = memo(() => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map(({name, skills: skillItems}, catIndex) => (
        <motion.div 
          key={name} 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: catIndex * 0.1, type: 'spring' }}
          className="bg-white shadow-card rounded-3xl p-6 border border-gray-100/50 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
        >
          <h4 className="font-heading text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">
            {name}
          </h4>
          <div className="flex flex-wrap gap-2">
            {skillItems.map(({name: skillName}) => (
              <motion.span 
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                key={skillName} 
                className="pill text-xs cursor-pointer bg-gray-50 border-gray-100"
              >
                {skillName}
              </motion.span>
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
