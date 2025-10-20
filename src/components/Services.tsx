'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from "lucide-react";

const services = [
  { 
    title: 'Satellite Networking', 
    image: '/satellite.png',
    description: 'Stay connected anywhere with our satellite internet solutions. We install and maintain high-speed satellite networks that provide reliable coverage even in remote areas, ensuring you\'re always online.'
  },
  { 
    title: 'Local Area Networking (LAN)', 
    image: '/lan.png',
    description: 'We design and set up robust LAN systems that keep your office, home, or institution running smoothly. Our LAN services guarantee fast, stable, and secure connections for all your devices.'
  },
  { 
    title: 'CCTV & Security Camera System', 
    image: '/cctv.jpg',
    description: 'Protect what matters most with our advanced camera installations. From indoor monitoring to outdoor surveillance, we provide smart security systems with remote access and crystal-clear video quality.'
  },
  { 
    title: 'Access Control Systems', 
    image: '/access.png',
    description: 'Upgrade your security with intelligent door systems. We integrate biometric access, smart locks, and card entry solutions to give you complete control and peace of mind.'
  },
  { 
    title: 'IT Support & Maintenance', 
    image: '/it.jpg',
    description: 'Our team offers end-to-end IT support — from troubleshooting and repairs to ongoing maintenance. We ensure your systems run efficiently, so you can focus on what matters most.'
  },
  { 
    title: 'Customized Solutions', 
    image: '/custom.jpg',
    description: 'Every business and home is unique. That\'s why we tailor networking and IT services to your specific needs, combining innovation and reliability to deliver solutions that fit perfectly.'
  },
];

export default function WegoServices() {
  const [showFooterText, setShowFooterText] = useState(false);

  return (
    <section className="px-6 sm:px-6 md:px-16 pt-28 sm:pt-20 lg:pt-16 pb-12 sm:pb-16 text-white">
      {/* Hero */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16 lg:mb-20 max-w-7xl mx-auto w-full">
        {/* Left text */}
        <motion.div
          className="max-w-5xl text-center md:text-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
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
          className="hidden md:block w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] object-contain drop-shadow-2xl"
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ 
            opacity: 1,
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

      {/* Scroll indicator - Hidden */}
        <div className="hidden flex justify-start max-w-7xl mx-auto w-full mb-8 sm:mb-12">
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
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">Our Services</h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto w-full">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-purple-800/40 to-purple-900/30 border border-purple-500/30 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm group cursor-pointer"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative overflow-hidden h-40 sm:h-48 lg:h-56">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Service description overlay */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="text-white font-semibold text-sm sm:text-base mb-2 group-hover:text-pink-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed line-clamp-4">
                  {service.description}
                </p>
              </div>
            </div>
            
            {/* Title shown when not hovering */}
            <div className="p-3 sm:p-4 md:p-5 group-hover:hidden">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                {service.title}
              </h3>
            </div>
          </motion.div>
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
