import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  title: 'Initiate Agency',
  description:
    'Initiate Agency is a digital agency based in Boulder, Colorado. We specialize in web design, web development, and digital marketing.',
  canonical: 'https://initiate.agency/',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://initiate.agency/',
    siteName: 'Initiate Agency'
  },
  twitter: {
    handle: '@initiateagency',
    site: '@initiateagency',
    cardType: 'summary_large_image'
  }
}

export default config
