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
import ContactForm from './ContactForm';

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
        <div className="relative z-10 flex flex-col gap-y-12">
          {/* Header */}
          <div>
            <h2 className="section-label mb-4 font-mono">Let&apos;s connect</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-6">
              {headerText}
            </h3>
            <p className="text-text-secondary font-body text-lg max-w-lg">{description}</p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Form */}
            <div className="order-2 md:order-1">
              <ContactForm />
            </div>

            {/* Contact details */}
            <div className="order-1 md:order-2 flex flex-col gap-y-4">
              <h3 className="font-heading text-lg font-bold text-text-primary">Contact Details</h3>
              <dl className="flex flex-col space-y-4 mt-2">
                {items.map(({type, text, href}) => {
                  const {Icon, srLabel} = ContactValueMap[type];
                  return (
                    <div key={srLabel}>
                      <dt className="sr-only">{srLabel}</dt>
                      <dd>
                        <motion.a
                          whileHover={{ scale: 1.03 }}
                          className="flex items-center gap-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 hover:shadow-glow-sm transition-all duration-300 text-text-secondary hover:text-accent group"
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer">
                          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-surface/50 group-hover:bg-accent/20 transition-colors duration-300">
                            <Icon aria-hidden="true" className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <span className="text-xs text-text-muted font-mono uppercase tracking-wider">{srLabel}</span>
                            <p className="text-sm md:text-base font-medium text-text-primary font-body">{text}</p>
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
      </div>
    </Section>
  );
});

Contact.displayName = 'Contact';
export default Contact;
