import {ArrowUpRightIcon, SparklesIcon} from '@heroicons/react/24/outline';
import {motion, Variants} from 'framer-motion';
import Image from 'next/image';
import {FC, memo} from 'react';

import {aboutData, heroData, SectionId} from '../../data/data';
import Section from '../Layout/Section';
import Socials from '../Socials';

const containerVariants: Variants = {
  hidden: {opacity: 0},
  show: {opacity: 1, transition: {staggerChildren: 0.12, delayChildren: 0.08}},
};

const itemVariants: Variants = {
  hidden: {opacity: 0, y: 24},
  show: {opacity: 1, y: 0, transition: {type: 'spring', stiffness: 90, damping: 18}},
};

const Hero: FC = memo(() => {
  const {description, actions} = heroData;

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div className="relative isolate overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:min-h-screen lg:pb-20 lg:pt-32">
        <div className="pointer-events-none absolute -left-56 top-0 -z-10 h-[36rem] w-[36rem] rounded-full bg-violet-600/20 blur-[130px]" />
        <div className="pointer-events-none absolute -right-44 bottom-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-[130px]" />

        <motion.div
          animate="show"
          className="mx-auto w-full max-w-6xl"
          initial="hidden"
          variants={containerVariants}>
          <div className="grid items-stretch gap-5 lg:grid-cols-[1.14fr_0.86fr]">
            <div className="flex min-h-[32rem] flex-col justify-between rounded-[2rem] border border-white/10 bg-surface/70 p-7 shadow-card backdrop-blur-xl sm:p-10 lg:min-h-[39rem] lg:p-12">
              <div>
                <motion.div className="mb-9 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-accent" variants={itemVariants}>
                  <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-accent" /></span>
                  Open to full-time roles
                </motion.div>
                <motion.h1 className="max-w-3xl font-heading text-[3.8rem] font-black leading-[0.88] tracking-[-0.075em] text-text-primary sm:text-[5.8rem] lg:text-[6.8rem]" variants={itemVariants}>
                  AI that feels<br />
                  <span className="text-accent">effortless.</span>
                </motion.h1>
              </div>

              <motion.div className="mt-10 max-w-xl" variants={itemVariants}>
                <div className="text-base leading-relaxed text-text-secondary sm:text-lg">{description}</div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {actions.map(({href, text, primary, Icon}) => (
                    <motion.a
                      className={primary ? 'hero-button hero-button--primary' : 'hero-button hero-button--secondary'}
                      href={href}
                      key={text}
                      whileHover={{y: -3}}
                      whileTap={{scale: 0.98}}>
                      {text}
                      {Icon ? <Icon className="h-4 w-4" /> : <ArrowUpRightIcon className="h-4 w-4" />}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div className="relative min-h-[30rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[#171721] shadow-card lg:min-h-0" variants={itemVariants}>
              <Image alt="Shivang Sinha" className="h-full w-full object-cover object-center opacity-90 transition-transform duration-700 hover:scale-105" fill priority sizes="(min-width: 1024px) 40vw, 100vw" src={aboutData.profileImageSrc!} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-transparent to-violet-950/20" />
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-2 text-xs font-medium text-white backdrop-blur-md">
                <SparklesIcon className="h-4 w-4 text-accent" />
                Based in Munich, Germany
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="font-script text-3xl text-accent">Hi, I&apos;m Shivang</p>
                <p className="mt-2 max-w-xs font-heading text-2xl font-semibold leading-tight text-white">Designing useful systems for complex work.</p>
                <div className="mt-7 flex items-center gap-4 border-t border-white/15 pt-5 text-xs uppercase tracking-[0.16em] text-white/55">
                  <span>Connect</span><span className="h-px flex-1 bg-white/15" /><Socials />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div className="mt-5 grid gap-5 md:grid-cols-3" variants={itemVariants}>
            {[
              ['05+', 'years shipping production software'],
              ['09+', 'AI & full-stack projects delivered'],
              ['01', 'focus: AI systems that solve real work'],
            ].map(([value, label]) => (
              <div className="hero-stat" key={label}>
                <span className="font-heading text-3xl font-bold tracking-tight text-text-primary">{value}</span>
                <span className="max-w-[11rem] text-sm leading-snug text-text-secondary">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
