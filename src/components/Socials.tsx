import {motion} from 'framer-motion';
import {FC, memo} from 'react';

import {socialLinks} from '../data/data';

const Socials: FC = memo(() => {
  return (
    <>
      {socialLinks.map(({label, Icon, href}) => (
        <motion.a
          aria-label={label}
          className="text-text-secondary hover:text-accent transition-colors duration-300 p-1"
          href={href}
          key={label}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{y: -3, scale: 1.15}}
          whileTap={{scale: 0.9}}
        >
          <Icon className="h-6 w-6" />
        </motion.a>
      ))}
    </>
  );
});

Socials.displayName = 'Socials';
export default Socials;
