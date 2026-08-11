import {DevicePhoneMobileIcon, EnvelopeIcon, MapPinIcon} from '@heroicons/react/24/outline';
import {motion} from 'framer-motion';
import {FC, memo} from 'react';

import {contact, SectionId} from '../../../data/data';
import {ContactType, ContactValue} from '../../../data/dataDef';
import FacebookIcon from '../../Icon/FacebookIcon';
import GithubIcon from '../../Icon/GithubIcon';
import InstagramIcon from '../../Icon/InstagramIcon';
import LinkedInIcon from '../../Icon/LinkedInIcon';
import TwitterIcon from '../../Icon/TwitterIcon';
import Section from '../../Layout/Section';

const ContactValueMap: Record<ContactType, ContactValue> = {
  [ContactType.Email]: {Icon: EnvelopeIcon, srLabel: 'Email'},
  [ContactType.Phone]: {Icon: DevicePhoneMobileIcon, srLabel: 'Phone'},
  [ContactType.Location]: {Icon: MapPinIcon, srLabel: 'Location'},
  [ContactType.Github]: {Icon: GithubIcon, srLabel: 'Github'},
  [ContactType.LinkedIn]: {Icon: LinkedInIcon, srLabel: 'LinkedIn'},
  [ContactType.Facebook]: {Icon: FacebookIcon, srLabel: 'Facebook'},
  [ContactType.Twitter]: {Icon: TwitterIcon, srLabel: 'Twitter'},
  [ContactType.Instagram]: {Icon: InstagramIcon, srLabel: 'Instagram'},
};

const Contact: FC = memo(() => {
  const {headerText, description, items} = contact;
  return (
    <Section sectionId={SectionId.Contact}>
      <div className="card-float p-8 md:p-14 rounded-5xl bg-surface grid-bg relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center gap-y-12 text-center">
          {/* Header */}
          <div className="max-w-2xl flex flex-col items-center">
            <span className="section-label mb-4 font-mono inline-flex items-center">Let&apos;s connect</span>
            <h3 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-6">
              {headerText}
            </h3>
            <p className="text-text-secondary font-body text-lg">{description}</p>
          </div>

          {/* Contact details Grid */}
          <div className="w-full max-w-5xl">
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map(({type, text, href}) => {
                const {Icon, srLabel} = ContactValueMap[type];
                return (
                  <div key={srLabel}>
                    <dt className="sr-only">{srLabel}</dt>
                    <dd className="h-full">
                      <motion.a
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center text-center gap-y-5 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-white/10 hover:shadow-glow-sm transition-all duration-300 text-text-secondary hover:text-accent group h-full justify-center"
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer">
                        <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-surface/50 shadow-inner group-hover:bg-accent/20 transition-colors duration-300">
                          <Icon aria-hidden="true" className="h-8 w-8 text-accent" />
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-text-muted font-mono uppercase tracking-wider mb-2">{srLabel}</span>
                          <p className="text-sm md:text-base font-medium text-text-primary font-body break-all">{text}</p>
                        </div>
                      </motion.a>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
});

Contact.displayName = 'Contact';
export default Contact;
