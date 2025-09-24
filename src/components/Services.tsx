'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from "lucide-react";

const services = [
  { title: 'Satellite Networking', image: '/satellite.png' },
  { title: 'Local Area Networking (LAN)', image: '/lan.png' },
  { title: 'CCTV & Security Camera System', image: '/cctv.jpg' },
  { title: 'Access Control Systems', image: '/access.png' },
  { title: 'IT Support & Maintenance', image: '/it.jpg' },
  { title: 'Customized Solutions', image: '/custom.jpg' },
];

export default function WegoServices() {
  const [showFooterText, setShowFooterText] = useState(false);

  return (
    <section className="px-4 sm:px-6 md:px-16 py-12 sm:py-16 text-white">
      {/* Hero */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 md:px-16 lg:px-32">
        {/* Left text */}
        <motion.div
          className="max-w-xl text-center md:text-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            At{' '}
            <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-clip-text text-transparent">
              Wego Connect,
            </span>
          </h1>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-xl">
            We deliver reliable networking and IT solutions designed to keep you
            connected, secure, and in control. From homes to businesses, our
            commitment is to provide fast, seamless, and future-ready technology
            with expert support to ensure performance every day.
          </p>
        </motion.div>

        {/* Right rocket image */}
        <motion.img
          src="/rocket.png"
          alt="Rocket"
          className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] object-contain drop-shadow-2xl"
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            // Bouncing animation that looks like it's trying to take off
            y: [0, -15, 0, -8, 0, -12, 0, -5, 0],
            rotate: [0, -2, 0, 2, 0, -1, 0, 1, 0],
            scale: [1, 1.02, 1, 1.01, 1, 1.015, 1, 1.005, 1]
          }}
          transition={{ 
            duration: 1, 
            ease: "easeOut",
            // Repeat the bouncing animation infinitely with a delay
            y: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              delay: 1
            },
            rotate: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              delay: 1
            },
            scale: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              delay: 1
            }
          }}
        />
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-start px-4 sm:px-6 md:px-16 lg:px-32 mb-8 sm:mb-12">
        <motion.div
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex items-start justify-center p-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mt-1" />
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-[1280px] border-t border-gray-700 mb-6"></div>

      {/* Services Heading */}
      <div className="text-center mb-8 sm:mb-12 mt-8 sm:mt-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 md:px-16 lg:px-32">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-purple-800/30 border border-purple-700 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 sm:h-56 lg:h-60 object-cover"
            />
            <div className="p-3 sm:p-4">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note with toggle */}
      <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center gap-3">
        <button
          onClick={() => setShowFooterText(!showFooterText)}
          className="flex items-center justify-center gap-2 text-gray-300 hover:text-white transition"
        >
          <span className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-white">
            <ChevronDown
              className={`text-white w-4 h-4 sm:w-6 sm:h-6 transition-transform duration-300 ${
                showFooterText ? "rotate-180" : ""
              }`}
            />
          </span>
          <span className="text-xs sm:text-sm md:text-base">Toggle More Info</span>
        </button>

        {showFooterText && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-300 max-w-2xl mx-auto text-center mt-4 px-4 text-sm sm:text-base"
          >
            Whether you need high-speed connectivity, advanced security, or a
            full IT infrastructure, we've got you covered.
          </motion.p>
        )}
      </div>
    </section>
  );
}
