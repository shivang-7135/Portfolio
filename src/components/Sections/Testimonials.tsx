import {motion} from 'framer-motion';
import {FC, memo, useCallback, useEffect, useRef, useState, UIEventHandler} from 'react';

import {SectionId, testimonial} from '../../data/data';
import {Testimonial} from '../../data/dataDef';
import useInterval from '../../hooks/useInterval';
import useWindow from '../../hooks/useWindow';
import QuoteIcon from '../Icon/QuoteIcon';
import Section from '../Layout/Section';

const Testimonials: FC = memo(() => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollValue, setScrollValue] = useState(0);

  const itemWidth = useRef(0);
  const scrollContainer = useRef<HTMLDivElement>(null);

  const {width} = useWindow();
  const {testimonials} = testimonial;

  useEffect(() => {
    itemWidth.current = scrollContainer.current ? scrollContainer.current.offsetWidth : 0;
  }, [width]);

  useEffect(() => {
    if (scrollContainer.current) {
      const newIndex = Math.round(scrollContainer.current.scrollLeft / itemWidth.current);
      setActiveIndex(newIndex);
    }
  }, [itemWidth, scrollValue]);

  const setTestimonial = useCallback(
    (index: number) => () => {
      if (scrollContainer !== null && scrollContainer.current !== null) {
        scrollContainer.current.scrollLeft = itemWidth.current * index;
      }
    },
    [],
  );

  const next = useCallback(() => {
    if (activeIndex + 1 === testimonials.length) {
      setTestimonial(0)();
    } else {
      setTestimonial(activeIndex + 1)();
    }
  }, [activeIndex, setTestimonial, testimonials.length]);

  const handleScroll = useCallback<UIEventHandler<HTMLDivElement>>(event => {
    setScrollValue(event.currentTarget.scrollLeft);
  }, []);

  useInterval(next, 10000);

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
          <h2 className="section-label mb-4">*/ Endorsements</h2>
          <h3 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Trusted by colleagues & collaborators
          </h3>
        </div>

        <div className="card-float p-8 md:p-14 rounded-5xl border border-gray-100 bg-surface">
          <div
            className="no-scrollbar flex w-full touch-pan-x snap-x snap-mandatory gap-x-6 overflow-x-auto scroll-smooth"
            onScroll={handleScroll}
            ref={scrollContainer}>
            {testimonials.map((t, index) => {
              const isActive = index === activeIndex;
              return (
                <TestimonialCard isActive={isActive} key={`${t.name}-${index}`} testimonial={t} />
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-x-3 mt-8">
            {[...Array(testimonials.length)].map((_, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                    isActive ? 'bg-accent scale-125' : 'bg-bg-alt hover:bg-text-muted'
                  }`}
                  disabled={isActive}
                  key={`select-button-${index}`}
                  onClick={setTestimonial(index)} />
              );
            })}
          </div>
        </div>
      </motion.div>
    </Section>
  );
});

const TestimonialCard: FC<{testimonial: Testimonial; isActive: boolean}> = memo(
  ({testimonial: {text, name, image}, isActive}) => (
    <div
      className={`flex w-full shrink-0 snap-start snap-always flex-col items-start gap-y-4 p-2 transition-opacity duration-1000 sm:flex-row sm:gap-x-6 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}>
      {image ? (
        <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
          <QuoteIcon className="absolute -left-2 -top-2 h-4 w-4 stroke-accent text-accent/20" />
          <img className="h-full w-full rounded-full shadow-card" src={image} alt={name} />
        </div>
      ) : (
        <QuoteIcon className="h-5 w-5 shrink-0 text-accent sm:h-8 sm:w-8" />
      )}
      <div className="flex flex-col gap-y-3">
        <p className="text-text-secondary text-base font-body italic leading-relaxed">{text}</p>
        <p className="text-sm font-semibold text-text-primary font-body">— {name}</p>
      </div>
    </div>
  ),
);

export default Testimonials;
