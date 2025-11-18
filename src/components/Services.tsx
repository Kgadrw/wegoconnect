'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Satellite, 
  Network, 
  Camera, 
  Shield, 
  Wrench, 
  Settings,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  { 
    title: 'Satellite Networking', 
    icon: Satellite,
    image: '/satellite.png',
    description: 'Stay connected anywhere with our satellite internet solutions. We install and maintain high-speed satellite networks that provide reliable coverage even in remote areas, ensuring you\'re always online.',
    features: ['High-speed connectivity', 'Remote area coverage', '24/7 monitoring', 'Professional installation']
  },
  { 
    title: 'Local Area Networking (LAN)', 
    icon: Network,
    image: '/lan.png',
    description: 'We design and set up robust LAN systems that keep your office, home, or institution running smoothly. Our LAN services guarantee fast, stable, and secure connections for all your devices.',
    features: ['Network design & planning', 'Cable installation', 'Router configuration', 'Performance optimization']
  },
  { 
    title: 'CCTV & Security Camera System', 
    icon: Camera,
    image: '/cctv.jpg',
    description: 'Protect what matters most with our advanced camera installations. From indoor monitoring to outdoor surveillance, we provide smart security systems with remote access and crystal-clear video quality.',
    features: ['HD video quality', 'Remote monitoring', 'Motion detection', 'Cloud storage options']
  },
  { 
    title: 'Access Control Systems', 
    icon: Shield,
    image: '/access.png',
    description: 'Upgrade your security with intelligent door systems. We integrate biometric access, smart locks, and card entry solutions to give you complete control and peace of mind.',
    features: ['Biometric access', 'Smart card systems', 'Mobile app control', 'Audit trail logging']
  },
  { 
    title: 'IT Support & Maintenance', 
    icon: Wrench,
    image: '/it.jpg',
    description: 'Our team offers end-to-end IT support — from troubleshooting and repairs to ongoing maintenance. We ensure your systems run efficiently, so you can focus on what matters most.',
    features: ['24/7 support', 'Preventive maintenance', 'System updates', 'Technical troubleshooting']
  },
  { 
    title: 'Customized Solutions', 
    icon: Settings,
    image: '/custom.jpg',
    description: 'Every business and home is unique. That\'s why we tailor networking and IT services to your specific needs, combining innovation and reliability to deliver solutions that fit perfectly.',
    features: ['Needs assessment', 'Custom architecture', 'Scalable solutions', 'Ongoing consultation']
  },
];

export default function WegoServices() {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header Section */}
        <motion.div
          className="mb-12 sm:mb-16 md:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left text */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                Enterprise-Grade
                <br />
                <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                  IT Solutions
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto md:mx-0 leading-relaxed">
                Comprehensive networking and IT services designed to keep your business connected, secure, and operating at peak performance.
              </p>
            </div>

            {/* Right rocket image */}
            <motion.img
              src="/rocket.png"
              alt="Rocket"
              className="hidden md:block w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] object-contain drop-shadow-2xl flex-shrink-0"
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={{ 
                opacity: 1,
                y: [0, -15, 0, -8, 0, -12, 0, -5, 0],
                rotate: [0, -2, 0, 2, 0, -1, 0, 1, 0],
                scale: [1, 1.02, 1, 1.01, 1, 1.015, 1, 1.005, 1]
              }}
              transition={{ 
                duration: 1, 
                ease: "easeOut",
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
        </motion.div>

        {/* Services Grid - Professional Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-2xl">
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-pink-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 flex-1">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                          <CheckCircle2 className="w-4 h-4 text-pink-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link to="/contact">
                      <Button 
                        variant="outline" 
                        className="w-full border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white group/btn"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Learn More
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Professional CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-pink-500/20 via-orange-500/20 to-yellow-400/20 border border-pink-500/30 rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
            Ready to Transform Your IT Infrastructure?
          </h2>
          <p className="text-gray-200 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Let our expert team design and implement a solution tailored to your business needs. 
            Get in touch today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600 px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                Schedule Consultation
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="outline" 
                className="border-pink-500/50 bg-transparent hover:bg-pink-500/10 text-white hover:text-pink-300 px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base md:text-lg font-semibold"
              >
                Learn About Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
