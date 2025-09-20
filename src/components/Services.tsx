'use client';
import React from 'react';
import { ChevronDown } from "lucide-react";
const services = [
  {
    title: 'Satellite Networking',
    image: '/satellite.png',
  },
  {
    title: 'Local Area Networking (LAN)',
    image: '/lan.png',
  },
  {
    title: 'CCTV & Security Camera System',
    image: '/cctv.jpg',
  },
  {
    title: 'Access Control Systems',
    image: '/access.png',
  },
  {
    title: 'IT Support & Maintenance',
    image: '/it.jpg',
  },
  {
    title: 'Customized Solutions',
    image: '/custom.jpg',
  },
];

export default function WegoServices() {
  return (
    <section className="px-6 md:px-16 py-16 text-white">
      {/* Hero */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20 px-32 py-0">
        {/* Left text */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-6xl md:text-4xl font-bold mb-4">
            At{' '}
            <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 text-5xl bg-clip-text text-transparent">
              Wego Connect,
            </span>
          </h1>
          <p className="text-gray-300 leading-relaxed text-xl">
            We deliver reliable networking and IT solutions designed to keep you
            connected, secure, and in control. From homes to businesses, our
            commitment is to provide fast, seamless, and future-ready technology
            with expert support to ensure performance every day.
          </p>
        </div>

        {/* Right rocket image */}
        <img
  src="/rocket.png"
  alt="Rocket"
  className="w-[500px] h-[500px] object-contain drop-shadow-2xl"
/>
 
      </div>
<div className="mx-auto w-[1280px] border-t border-gray-700 mb-6"></div>
      {/* Services Heading */}
      <div className="text-center mb-12 mt-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 px-32">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-purple-800/30 border border-purple-700 rounded-xl overflow-hidden hover:scale-105 transition-transform shadow-lg"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-sm md:text-base font-semibold">
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-12 flex items-center justify-center text-gray-300 max-w-2xl mx-auto text-sm md:text-base gap-3">
  <span className="w-10 h-10 flex items-center justify-center rounded-full border border-white">
    <ChevronDown className="text-white w-8 h-4" />
  </span>
  Whether you need high-speed connectivity, advanced security, or a full
  IT infrastructure, we’ve got you covered.
</p>
    </section>
  );
}
