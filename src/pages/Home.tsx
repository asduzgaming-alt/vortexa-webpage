import { useState } from 'react';
import { Hero } from '../components/Hero';
import { VibeSlider } from '../components/VibeSlider';
import { EventGrid } from '../components/EventGrid';

export const Home = () => {
  const [activeVibeIndex, setActiveVibeIndex] = useState(1);

  return (
    <>
      <Hero />
      <VibeSlider activeVibeIndex={activeVibeIndex} setActiveVibeIndex={setActiveVibeIndex} />
      <EventGrid activeVibeIndex={activeVibeIndex} />
    </>
  );
};
