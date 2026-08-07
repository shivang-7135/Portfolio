import classNames from 'classnames';
import {FC, memo, PropsWithChildren} from 'react';

import {SectionId} from '../../data/data';

const Section: FC<
  PropsWithChildren<{sectionId: SectionId; sectionTitle?: string; className?: string; noPadding?: boolean}>
> = memo(({children, sectionId, sectionTitle, className, noPadding = false}) => {
  return (
    <section className={classNames(className, {'px-5 py-20 md:py-28 lg:px-8': !noPadding})} id={sectionId}>
      <div className={classNames({'mx-auto max-w-6xl': !noPadding})}>
        {sectionTitle && (
          <div className="section-label mb-8">{sectionTitle}</div>
        )}
        {children}
      </div>
    </section>
  );
});

Section.displayName = 'Section';
export default Section;
