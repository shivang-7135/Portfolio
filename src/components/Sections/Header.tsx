import {Dialog, Transition} from '@headlessui/react';
import {Bars3BottomRightIcon, XMarkIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import Link from 'next/link';
import {FC, Fragment, memo, useCallback, useMemo, useState} from 'react';

import {SectionId} from '../../data/data';
import {useNavObserver} from '../../hooks/useNavObserver';

export const headerID = 'headerNav';

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
        className="fixed top-5 inset-x-0 mx-auto w-[calc(100%-2rem)] max-w-5xl z-50 hidden sm:block"
        id={headerID}>
        <nav className="glass rounded-full px-3 py-2.5 shadow-dock flex justify-between items-center gap-x-2">
          <a className="px-3 font-heading text-sm font-bold tracking-tight text-text-primary" href="#hero">SS<span className="text-accent">.</span></a>
          <div className="flex items-center gap-x-1">
          {navSections.map(section => {
            const isActive = section === currentSection;
            const isContact = section === SectionId.Contact;
            
            if (isContact) {
              return (
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} key={section} className="pl-2">
                  <Link
                    href={`/#${section}`}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold font-body bg-accent text-black hover:bg-accent-hover transition-colors duration-300 shadow-glow">
                    <span className="first-letter:uppercase">{section}</span>
                  </Link>
                </motion.div>
              );
            }

            return (
              <Link
                className={classNames(
                  'relative px-5 py-2 rounded-full text-sm font-medium font-body transition-colors duration-300',
                  isActive ? 'text-text-primary bg-white/10' : 'text-text-secondary hover:text-text-primary',
                )}
                href={`/#${section}`}
                key={section}>
                <span className="first-letter:uppercase">{section}</span>
              </Link>
            );
          })}
          </div>
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
          className="fixed right-5 top-5 z-50 rounded-full glass p-4 shadow-xl hover:bg-white/10 transition-colors duration-300 sm:hidden"
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
                  {navSections.map(section => {
                    const isActive = section === currentSection;
                    const isContact = section === SectionId.Contact;
                    return (
                      <Link
                        className={classNames(
                          'px-5 py-4 rounded-3xl text-lg font-medium font-body transition-all duration-300 first-letter:uppercase relative',
                          isContact
                            ? 'bg-accent text-black text-center font-bold mt-4 shadow-glow'
                            : isActive
                              ? 'bg-white/10 text-text-primary'
                              : 'text-text-secondary hover:bg-white/10 hover:text-text-primary',
                        )}
                        href={`/#${section}`}
                        key={section}
                        onClick={toggleOpen}>
                        {section}
                        {isActive && !isContact && (
                           <div className="absolute left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent" />
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
