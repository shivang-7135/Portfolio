import {motion} from 'framer-motion';
import {FC, memo} from 'react';

import {TimelineItem as TimelineItemType} from '../../../data/dataDef';

const TimelineItem: FC<{item: TimelineItemType, index: number}> = memo(({item, index}) => {
  const {title, date, location, content} = item;
  
  // Stacking calculation
  const topOffset = 100 + (index * 20); // Each card sticks slightly lower than the one before it

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`card-float p-8 md:p-10 w-full rounded-5xl border border-gray-100 shadow-md sticky bg-surface`}
      style={{ top: `${topOffset}px`, zIndex: index }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-y-4">
        <h4 className="font-heading text-2xl font-bold text-text-primary">{title}</h4>
        
        <div className="flex items-center gap-x-3 shrink-0 bg-bg px-4 py-2 rounded-full">
          <span className="text-xs font-semibold text-accent font-body uppercase tracking-wider">{date}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-x-2 mb-6">
        <span className="text-sm font-semibold text-text-muted uppercase tracking-widest">{location}</span>
      </div>

      <div className="font-body text-base text-text-secondary leading-relaxed prose prose-sm max-w-none">
        {content}
      </div>
    </motion.div>
  );
});

TimelineItem.displayName = 'TimelineItem';
export default TimelineItem;
