import classNames from 'classnames';
import {FC, memo, PropsWithChildren} from 'react';

import {SectionId} from '../../data/data';

const Section: FC<
  PropsWithChildren<{sectionId: SectionId; sectionTitle?: string; className?: string; noPadding?: boolean}>
> = memo(({children, sectionId, sectionTitle, className, noPadding = false}) => {
  return (
    <section className={classNames(className, {'px-4 py-16 md:py-24 lg:px-8': !noPadding})} id={sectionId}>
      <div className={classNames({'mx-auto max-w-screen-lg': !noPadding})}>
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
