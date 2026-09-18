'use client'
import { useState, useEffect } from 'react';
import Header from './componets/Header';
import InitialSection from './componets/InitialSection';
import ChatWidget from './componets/ChatWidget';
import Services from './componets/Services'
import Brands from './componets/Brands';
import Information from './componets/Information'
import Contact from './componets/Contact'
import Carousel from './componets/WebsiteCarousel'

export default function Home() {
  return (
    <>
      <Header/>
      <InitialSection/>
      <Carousel/>

      <ChatWidget />
      <Brands/>
      <Services/>
      <Information/>
      <Contact/>
    </>
  );
}