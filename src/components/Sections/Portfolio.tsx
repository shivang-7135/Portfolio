import {ArrowTopRightOnSquareIcon, CodeBracketIcon, DocumentTextIcon} from '@heroicons/react/24/outline';
import {motion, useMotionValue, useSpring, useTransform} from 'framer-motion';
import Image from 'next/image';
import {FC, memo, useMemo} from 'react';

import {portfolioItems, SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
import Section from '../Layout/Section';

const Portfolio: FC = memo(() => {
  // Sort items: featured first
  const sortedItems = useMemo(() => {
    return [...portfolioItems].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, []);

  return (
    <Section sectionId={SectionId.Portfolio} sectionTitle="Portfolio Projects">
      <div className="flex flex-col gap-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <h2 className="section-label mb-4">✦ Portfolio</h2>
          <h3 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Selected Work
          </h3>
          <p className="text-text-secondary font-body text-base max-w-xl">
            A showcase of projects that highlight my commitment to building intelligent, production-grade systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-1000">
          {sortedItems.map((item, index) => (
            <PortfolioCard item={item} index={index} key={`${item.title}-${index}`} />
          ))}
        </div>
      </div>
    </Section>
  );
});

const PortfolioCard: FC<{item: PortfolioItem, index: number}> = memo(({item, index}) => {
  const {title, description, image, featured, metrics, techStack, demoUrl, reportUrl, sourceUrl} = item;
  
  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
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
    <motion.div
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
      className="group card-float bg-surface shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden p-4 md:p-6 pb-8 border border-gray-100 flex flex-col gap-y-6"
    >
      {/* Image */}
      <div 
        className="relative h-64 md:h-80 overflow-hidden rounded-4xl bg-gray-100"
        style={{ transform: "translateZ(30px)" }} // Pop out effect
      >
        {image ? (
          <Image
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            height={400}
            src={image as any}
            width={600}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-50 transition-transform duration-700 group-hover:scale-110">
            <span className="text-6xl font-heading font-bold text-accent opacity-50">
              {title.charAt(0)}
            </span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="pill bg-accent text-white px-3 py-1 text-xs font-semibold shadow-sm">
              Featured
            </span>
          </div>
        )}

      </div>

      {/* Content */}
      <div 
        className="px-4 flex flex-col flex-grow"
        style={{ transform: "translateZ(40px)" }} // Pop out text further
      >
        <h3 className="font-heading text-xl font-bold text-text-primary mb-3 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-text-secondary font-body line-clamp-3 leading-relaxed mb-4">
          {description}
        </p>

        {/* Metrics */}
        {metrics && metrics.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-4">
            {metrics.map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-heading text-lg font-bold text-text-primary leading-tight">
                  {metric.value}
                </span>
                <span className="text-xs text-text-muted">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        {techStack && techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {techStack.map((tech, i) => (
              <span key={i} className="bg-bg text-text-secondary text-xs px-2 py-1 rounded-full border border-gray-200">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex-grow" />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-auto">
          {demoUrl && (
            <a 
              href={demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="pill bg-accent hover:bg-[#CC6B13] text-white px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors duration-300"
            >
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              Live Demo
            </a>
          )}
          {reportUrl && (
            <a 
              href={reportUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="pill border border-accent text-accent hover:bg-accent hover:text-white px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors duration-300"
            >
              <DocumentTextIcon className="h-4 w-4" />
              View Report
            </a>
          )}
          {sourceUrl && (
            <a 
              href={sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="pill bg-gray-100 text-text-secondary hover:bg-gray-200 px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors duration-300"
            >
              <CodeBracketIcon className="h-4 w-4" />
              Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;
