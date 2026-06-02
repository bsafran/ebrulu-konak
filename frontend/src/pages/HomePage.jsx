import React from 'react';
import Layout from '../components/common/Layout';
import VideoHero from '../components/home/VideoHero';
import BookingStrip from '../components/home/BookingStrip';
import IntroSection from '../components/home/IntroSection';
import AboutSection from '../components/home/AboutSection';
import RoomsPreview from '../components/home/RoomsPreview';
import RestaurantsPreview from '../components/home/RestaurantsPreview';
import Gallery from '../components/home/Gallery';
import useApi from '../hooks/useApi';
import { getSiteSettings, getMediaUrl } from '../services/strapiService';

const HomePage = () => {
  const { data: siteSettings } = useApi(() => getSiteSettings());

  const heroVideo = siteSettings?.data?.attributes?.heroVideo?.data?.attributes
    ? getMediaUrl(siteSettings.data.attributes.heroVideo.data.attributes)
    : null;

  const welcomeTitle = siteSettings?.data?.attributes?.welcomeTitle || 'Hoş Geldiniz';
  const welcomeText = siteSettings?.data?.attributes?.welcomeText || '';
  const aboutTitle = siteSettings?.data?.attributes?.aboutTitle || 'Hakkımızda';
  const aboutText = siteSettings?.data?.attributes?.aboutText || '';

  return (
    <Layout>
      <VideoHero
        videoUrl={heroVideo}
        title={siteSettings?.data?.attributes?.heroTitle}
        subtitle={siteSettings?.data?.attributes?.heroSubtitle}
      />
      <BookingStrip />
      <IntroSection title={welcomeTitle} text={welcomeText} />
      <AboutSection title={aboutTitle} description={aboutText} />
      <RoomsPreview />
      <RestaurantsPreview />
      <Gallery />
    </Layout>
  );
};

export default HomePage;
