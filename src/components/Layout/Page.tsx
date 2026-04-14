import Head from 'next/head';
import {useRouter} from 'next/router';
import {memo, PropsWithChildren} from 'react';

import {homePageMeta} from '../../data/data';

const Page: React.FC<PropsWithChildren<{title: string; description: string}>> = memo(
  ({children, title, description}) => {
    const {asPath} = useRouter();
    const {ogImageUrl, twitterCardType, twitterTitle, twitterSite, twitterCreator, twitterDomain, twitterUrl, twitterDescription, twitterImageUrl} = homePageMeta;

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
        {/* Hexagonal 3D Background */}
        <div className="hex-bg" aria-hidden="true" />
        <div className="relative z-10">
          {children}
        </div>
      </>
    );
  },
);

Page.displayName = 'Page';
export default Page;
