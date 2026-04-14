import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';
import {motion, useMotionValue, useSpring, useTransform} from 'framer-motion';
import Image from 'next/image';
import {FC, memo} from 'react';

import {portfolioItems, SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
import Section from '../Layout/Section';

const Portfolio: FC = memo(() => {
  return (
    <Section sectionId={SectionId.Portfolio} sectionTitle="Portfolio Projects">
      <div className="flex flex-col gap-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <h2 className="section-label mb-4">*/ Portfolio</h2>
          <h3 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Selected Work
          </h3>
          <p className="text-text-secondary font-body text-base max-w-xl">
            A showcase of projects that highlight my commitment to building intelligent, production-grade systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-1000">
          {portfolioItems.map((item, index) => (
            <PortfolioCard item={item} index={index} key={`${item.title}-${index}`} />
          ))}
        </div>
      </div>
    </Section>
  );
});

const PortfolioCard: FC<{item: PortfolioItem, index: number}> = memo(({item, index}) => {
  const {title, description, image, url} = item;
  
  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group bg-surface rounded-5xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden cursor-pointer p-4 md:p-6 pb-8 border border-gray-100 flex flex-col gap-y-6"
    >
      {/* Image */}
      <div 
        className="relative h-64 md:h-80 overflow-hidden rounded-4xl"
        style={{ transform: "translateZ(30px)" }} // Pop out effect
      >
        <Image
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          height={400}
          src={image}
          width={600}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-sm">
          <ArrowTopRightOnSquareIcon className="h-4 w-4 text-text-primary" />
        </div>
      </div>

      {/* Content */}
      <div 
        className="px-4"
        style={{ transform: "translateZ(40px)" }} // Pop out text further
      >
        <h3 className="font-heading text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-text-secondary font-body line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.a>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;
