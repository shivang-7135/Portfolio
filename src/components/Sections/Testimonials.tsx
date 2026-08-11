import {motion} from 'framer-motion';
import {FC, memo} from 'react';

import {SectionId, testimonial} from '../../data/data';
import {Testimonial} from '../../data/dataDef';
import QuoteIcon from '../Icon/QuoteIcon';
import Section from '../Layout/Section';

const Testimonials: FC = memo(() => {
  const {testimonials} = testimonial;

  if (!testimonials.length) {
    return null;
  }

  return (
    <Section sectionId={SectionId.Testimonials}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="flex flex-col gap-y-12"
      >
        <div>
          <h2 className="section-label mb-4">Endorsements</h2>
          <h3 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Trusted by colleagues & collaborators
          </h3>
        </div>

        <div className="marquee-container overflow-hidden w-full py-4 relative flex items-center hover:[&>div]:[animation-play-state:paused]">
          <div className="flex animate-marquee gap-x-6 w-max">
            {[...testimonials, ...testimonials].map((t, index) => (
              <TestimonialCard key={`${t.name}-${index}`} testimonial={t} />
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
});

Testimonials.displayName = 'Testimonials';

const TestimonialCard: FC<{testimonial: Testimonial}> = memo(
  ({testimonial: {text, name, image}}) => (
    <div className="glass rounded-3xl flex flex-col items-start gap-y-4 p-6 sm:p-8 w-[320px] md:w-[450px] border-l-4 border-l-accent shrink-0 whitespace-normal">
      <div className="flex w-full items-center gap-x-4 mb-2">
        {image ? (
          <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
            <QuoteIcon className="absolute -left-2 -top-2 h-4 w-4 stroke-accent text-accent/20" />
            <img className="h-full w-full rounded-full shadow-card object-cover" src={image} alt={name} />
          </div>
        ) : (
          <QuoteIcon className="h-5 w-5 shrink-0 text-accent sm:h-8 sm:w-8" />
        )}
        <p className="text-lg font-semibold text-text-primary font-body">{name}</p>
      </div>
      <p className="text-text-secondary text-base font-body leading-relaxed">"{text}"</p>
    </div>
  ),
);

TestimonialCard.displayName = 'TestimonialCard';

export default Testimonials;
