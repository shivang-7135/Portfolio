import {AnimatePresence, motion} from 'framer-motion';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {memo, PropsWithChildren, useEffect, useState} from 'react';

import {homePageMeta} from '../../data/data';

const ParticleBackground = dynamic(() => import('../ParticleBackground'), {ssr: false});
const CustomCursor = dynamic(() => import('../CustomCursor'), {ssr: false});

const Page: React.FC<PropsWithChildren<{title: string; description: string}>> = memo(
  ({children, title, description}) => {
    const {asPath} = useRouter();
    const {ogImageUrl, twitterCardType, twitterTitle, twitterSite, twitterCreator, twitterDomain, twitterUrl, twitterDescription, twitterImageUrl} = homePageMeta;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 1800);
      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta content={description} name="description" />

          {/* Open Graph */}
          <meta content={title} property="og:title" />
          <meta content={description} property="og:description" />
          <meta content={`https://shivangsinha.website${asPath}`} property="og:url" />

          {ogImageUrl && <meta content={ogImageUrl} property="og:image" />}
          {/* Twitter */}
          {twitterCardType && <meta content={twitterCardType} name="twitter:card" />}
          {twitterTitle && <meta content={twitterTitle} name="twitter:title" />}
          {twitterSite && <meta content={twitterSite} name="twitter:site" />}
          {twitterCreator && <meta content={twitterCreator} name="twitter:creator" />}
          {twitterDomain && <meta content={twitterDomain} property="twitter:domain" />}
          {twitterUrl && <meta content={twitterUrl} property="twitter:url" />}
          {twitterDescription && <meta content={twitterDescription} name="twitter:description" />}
          {twitterImageUrl && <meta content={twitterImageUrl} name="twitter:image" />}

          <link href="https://shivangsinha.website" rel="canonical" />
        </Head>

        {/* Loading Screen */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="loading-screen"
              exit={{opacity: 0, scale: 0.95}}
              transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
            >
              <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, ease: 'easeOut'}}
                className="flex flex-col items-center gap-4"
              >
                <div className="loading-screen__logo">
                  <span className="loading-screen__tag">&lt;</span>
                  Shivang
                  <span className="loading-screen__tag"> /&gt;</span>
                </div>
                <motion.div
                  className="h-0.5 bg-accent rounded-full"
                  initial={{width: 0}}
                  animate={{width: 120}}
                  transition={{duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2}}
                />
                <span className="text-xs font-mono text-text-muted tracking-wider">
                  initializing...
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Particle Background */}
        <ParticleBackground />

        {/* Hexagonal 3D Background */}
        <div className="hex-bg" aria-hidden="true" />

        <motion.div
          className="relative z-10"
          initial={{opacity: 0}}
          animate={{opacity: isLoading ? 0 : 1}}
          transition={{duration: 0.6, delay: 0.1}}
        >
          {children}
        </motion.div>
      </>
    );
  },
);

Page.displayName = 'Page';
export default Page;
