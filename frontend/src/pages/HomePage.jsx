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

  const heroVideo = siteSettings?.data?.heroVideo?.url
    ? `http://localhost:1337${siteSettings.data.heroVideo.url}`
    : null;

  const welcomeTitle = siteSettings?.data?.welcomeTitle || '';
  const welcomeText = siteSettings?.data?.welcomeText || '';
  const aboutTitle = siteSettings?.data?.aboutTitle || 'Hakkımızda';
  const aboutText = siteSettings?.data?.aboutText || '';

  return (
    <Layout>
      <VideoHero
        videoUrl={heroVideo}
        title={siteSettings?.data?.heroTitle}
        subtitle={siteSettings?.data?.heroSubtitle}
      />
      <BookingStrip />
      <IntroSection title="" text={welcomeText} />
      <AboutSection title={aboutTitle} description={aboutText} />
      <RoomsPreview />
      <RestaurantsPreview />
      <Gallery />
    </Layout>
  );
};

export default HomePage;
