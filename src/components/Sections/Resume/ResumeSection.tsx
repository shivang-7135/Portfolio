import {motion} from 'framer-motion';
import {FC, memo, PropsWithChildren} from 'react';

const ResumeSection: FC<PropsWithChildren<{title: string}>> = memo(({title, children}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="card-float p-6 md:p-8"
    >
      <h3 className="font-heading text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
        <span className="h-8 w-1 rounded-full bg-accent" />
        {title}
      </h3>
      <div className="timeline-line pl-6 space-y-6">
        {children}
      </div>
    </motion.div>
  );
});

ResumeSection.displayName = 'ResumeSection';
export default ResumeSection;
