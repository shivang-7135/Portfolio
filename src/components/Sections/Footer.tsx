import {FC, memo} from 'react';

import {SectionId} from '../../data/data';
import Socials from '../Socials';

const currentYear = new Date().getFullYear();

const Footer: FC = memo(() => (
  <div className="relative px-4 pb-24 pt-12 sm:px-8 sm:pb-24 sm:pt-14">
    {/* Separator */}
    <div className="mx-auto max-w-screen-lg mb-8">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </div>

    <div className="mx-auto max-w-screen-lg flex flex-col items-center gap-y-6">
      {/* Back to top */}
      <a
        className="flex items-center gap-x-2 text-text-muted hover:text-accent transition-colors duration-300 text-sm font-body"
        href={`/#${SectionId.Hero}`}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M5 15l7-7 7 7" />
        </svg>
        Back to top
      </a>

      {/* Social links */}
      <div className="flex gap-x-5 text-text-muted">
        <Socials />
      </div>

      {/* Copyright */}
      <span className="text-xs text-text-muted font-body">
        © {currentYear} Shivang Sinha. All rights reserved.
      </span>
    </div>
  </div>
));

Footer.displayName = 'Footer';
export default Footer;
