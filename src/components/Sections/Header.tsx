import {Dialog, Transition} from '@headlessui/react';
import {Bars3BottomRightIcon, XMarkIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import Link from 'next/link';
import {FC, Fragment, memo, useCallback, useMemo, useState} from 'react';

import {SectionId} from '../../data/data';
import {useNavObserver} from '../../hooks/useNavObserver';

export const headerID = 'headerNav';

const getSectionName = (section: string) => {
  if (section === 'resume') return 'experience';
  if (section === 'portfolio') return 'work';
  return section;
};

const Header: FC = memo(() => {
  const [currentSection, setCurrentSection] = useState<SectionId | null>(null);
  const navSections = useMemo(
    () => [SectionId.About, SectionId.Resume, SectionId.Portfolio, SectionId.Testimonials, SectionId.Contact],
    [],
  );

  const intersectionHandler = useCallback((section: SectionId | null) => {
    section && setCurrentSection(section);
  }, []);

  useNavObserver(navSections.map(section => `#${section}`).join(','), intersectionHandler);

  return (
    <>
      <div className="fixed top-5 left-5 z-50 sm:top-7 sm:left-7">
        <a className="font-mono text-xl font-bold tracking-tight text-text-primary transition-colors hover:text-accent" href="#hero">
          <span className="text-accent">&lt;</span>Shivang <span className="text-accent">/&gt;</span>
        </a>
      </div>
      <MobileNav currentSection={currentSection} navSections={navSections} />
      <DesktopNav currentSection={currentSection} navSections={navSections} />
    </>
  );
});

const DesktopNav: FC<{navSections: SectionId[]; currentSection: SectionId | null}> = memo(
  ({navSections, currentSection}) => {
    return (
      <motion.header
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
        className="fixed bottom-8 inset-x-0 z-50 hidden sm:flex sm:justify-center"
        id={headerID}>
        <nav className="dock-nav">
          <motion.div whileHover={{ y: -3 }}>
            <Link className={classNames('dock-nav__item font-mono', (currentSection === null || currentSection === SectionId.Hero) && 'dock-nav__item--active')} href="/#hero">
              <span className="dock-nav__prefix">//</span> home
            </Link>
          </motion.div>
          {navSections.map(section => {
            const isActive = section === currentSection;
            const isContact = section === SectionId.Contact;
            
            return (
              <motion.div whileHover={{ y: -3 }} key={section}>
                <Link
                  className={classNames(
                    'dock-nav__item font-mono',
                    isActive && 'dock-nav__item--active',
                    isContact && 'dock-nav__item--cta'
                  )}
                  href={`/#${section}`}>
                  <span className="dock-nav__prefix">//</span> {getSectionName(section)}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </motion.header>
    );
  },
);

const MobileNav: FC<{navSections: SectionId[]; currentSection: SectionId | null}> = memo(
  ({navSections, currentSection}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = useCallback(() => {
      setIsOpen(!isOpen);
    }, [isOpen]);

    return (
      <>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
          aria-label="Menu Button"
          className="fixed right-5 top-5 z-50 rounded-full border border-white/15 bg-black/70 p-4 shadow-xl backdrop-blur-lg hover:bg-white/10 transition-colors duration-300 sm:hidden"
          onClick={toggleOpen}>
          <Bars3BottomRightIcon className="h-6 w-6 text-text-primary" />
          <span className="sr-only">Open menu</span>
        </motion.button>
        <Transition.Root as={Fragment} show={isOpen}>
          <Dialog as="div" className="fixed inset-0 z-50 flex sm:hidden" onClose={toggleOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-md" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full">
              <div className="fixed bottom-0 inset-x-0 bg-surface rounded-t-[40px] p-8 pb-12 shadow-2xl border-t border-white/10">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-heading font-bold text-xl text-text-primary">Menu</span>
                  <button onClick={toggleOpen} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <XMarkIcon className="h-6 w-6 text-text-secondary" />
                  </button>
                </div>
                <nav className="flex flex-col gap-y-3">
                  <Link
                    className={classNames(
                      'px-5 py-4 rounded-3xl text-lg font-mono font-medium transition-all duration-300 relative',
                      (currentSection === null || currentSection === SectionId.Hero)
                        ? 'bg-white/10 text-text-primary'
                        : 'text-text-secondary hover:bg-white/10 hover:text-text-primary',
                    )}
                    href="/#hero"
                    onClick={toggleOpen}>
                    <span className="text-accent/50 mr-2">//</span> home
                    {(currentSection === null || currentSection === SectionId.Hero) && (
                       <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent" />
                    )}
                  </Link>
                  {navSections.map(section => {
                    const isActive = section === currentSection;
                    const isContact = section === SectionId.Contact;
                    return (
                      <Link
                        className={classNames(
                          'px-5 py-4 rounded-3xl text-lg font-mono font-medium transition-all duration-300 relative',
                          isContact
                            ? 'bg-accent text-black text-center font-bold mt-4 shadow-glow'
                            : isActive
                              ? 'bg-white/10 text-text-primary'
                              : 'text-text-secondary hover:bg-white/10 hover:text-text-primary',
                        )}
                        href={`/#${section}`}
                        key={section}
                        onClick={toggleOpen}>
                        <span className={classNames(isContact ? 'text-black/50' : 'text-accent/50', 'mr-2')}>//</span> {getSectionName(section)}
                        {isActive && !isContact && (
                           <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      </>
    );
  },
);

Header.displayName = 'Header';
export default Header;
