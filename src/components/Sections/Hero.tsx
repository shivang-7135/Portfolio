import {ArrowRightIcon, PlayIcon} from '@heroicons/react/24/outline';
import {motion, Variants} from 'framer-motion';
import Image from 'next/image';
import {FC, memo} from 'react';

import {aboutData, heroData, SectionId} from '../../data/data';
import Section from '../Layout/Section';

const containerVariants: Variants = {
  hidden: {opacity: 0},
  show: {opacity: 1, transition: {staggerChildren: 0.15, delayChildren: 0.1}},
};

const itemVariants: Variants = {
  hidden: {opacity: 0, y: 30},
  show: {opacity: 1, y: 0, transition: {type: 'spring', stiffness: 80, damping: 17}},
};

const Hero: FC = memo(() => {
  const {description, actions} = heroData;
  const cvAction = actions.find(action => action.primary) ?? actions[0];
  const contactAction = actions.find(action => !action.primary) ?? actions[1];

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div className="reference-hero">
        <motion.div animate="show" className="reference-hero__inner" initial="hidden" variants={containerVariants}>
          <div className="reference-hero__copy">
            <motion.div className="reference-eyebrow" variants={itemVariants}>
              <span className="reference-eyebrow__spark">✦</span>
              Hi, I&apos;m Shivang.
            </motion.div>
            <motion.h1 className="reference-hero__title" variants={itemVariants}>
              An AI engineer<br />
              <span>&amp; full-stack builder.</span>
            </motion.h1>
            <motion.div className="reference-hero__description" variants={itemVariants}>{description}</motion.div>
            <motion.div className="reference-hero__actions" variants={itemVariants}>
              {cvAction && (
                <motion.a className="reference-button reference-button--primary" href={cvAction.href} whileHover={{y: -3}} whileTap={{scale: 0.97}}>
                  {cvAction.text}
                  <ArrowRightIcon className="h-4 w-4" />
                </motion.a>
              )}
              {contactAction && (
                <motion.a className="reference-button reference-button--watch" href={contactAction.href} whileHover={{x: 4}}>
                  <span className="reference-button__play"><PlayIcon className="h-3 w-3 fill-current" /></span>
                  Let&apos;s talk
                </motion.a>
              )}
            </motion.div>
          </div>

          <motion.div className="reference-hero__portrait" variants={itemVariants}>
            <div className="reference-hero__orb reference-hero__orb--one" />
            <div className="reference-hero__orb reference-hero__orb--two" />
            <div className="reference-hero__arch" />
            <span className="reference-hero__mark">✱</span>
            <Image
              alt="Shivang Sinha"
              className="reference-hero__image"
              height={780}
              priority
              sizes="(min-width: 1024px) 45vw, 88vw"
              src={aboutData.profileImageSrc!}
              width={620}
            />
            <div className="reference-hero__location"><span className="reference-location-dot" /> Munich, Germany</div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
