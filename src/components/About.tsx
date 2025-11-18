'use client';

import { motion } from "framer-motion";
import { 
  DollarSign, 
  Shield, 
  Lightbulb, 
  Heart, 
  Globe, 
  Award,
  Users,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const differences = [
  {
    title: 'Affordability',
    description:
      'We deliver cost-effective networking and IT solutions without compromising on quality.',
    icon: DollarSign,
  },
  {
    title: 'Reliability',
    description:
      'Our solutions ensure uninterrupted performance, giving you peace of mind.',
    icon: Shield,
  },
  {
    title: 'Innovation',
    description:
      'We embrace the latest technologies to provide future-ready IT solutions.',
    icon: Lightbulb,
  },
  {
    title: 'Customer Care',
    description:
      'We are dedicated to supporting our clients with exceptional service.',
    icon: Heart,
  },
  {
    title: 'Coverage',
    description:
      'Our solutions cover diverse industries and business sizes.',
    icon: Globe,
  },
  {
    title: 'Expertise & Trust',
    description:
      'A team of skilled professionals trusted by leading institutions.',
    icon: Award,
  },
];

export default function AboutSection() {
  return (
    <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 text-white overflow-hidden">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Professional Header Section */}
          <motion.div
            className="text-left mb-12 sm:mb-16 md:mb-20 lg:mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
              About{' '}
              <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Wego Connect
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl leading-relaxed">
              Empowering businesses and institutions across Africa with reliable IT and networking solutions since 2022.
            </p>
          </motion.div>

          {/* Who We Are + Mission + Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            {/* Who We Are */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Who We Are
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                Wego Connect is a division of Wego Tronics Ltd, founded in 2022 with one clear purpose: to make reliable IT and networking solutions accessible to individuals, businesses, and institutions across Africa. Born from a passion to bridge connectivity gaps, we are here to ensure that no matter where you are, you can stay connected, secure, and in control.
              </p>
            </motion.div>

            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                To deliver high-quality networking and IT solutions with a focus on reliability, efficiency, and customer satisfaction — while continuously evolving with technological advancements.
              </p>
            </motion.div>

            {/* Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Our Vision
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                To become a leading provider of innovative IT and networking solutions across Africa, enabling businesses and institutions to operate with seamless connectivity.
              </p>
            </motion.div>
          </div>

          {/* What Makes Us Different */}
          <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <motion.div
              className="text-center mb-8 sm:mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                What Makes Us Different
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-12">
                At Wego Connect, we believe technology should work for people, not the other way around. That's why we bring together:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {differences.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <div className="bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-xl p-3 sm:p-4 w-fit mb-3 sm:mb-4 group-hover:from-pink-500/30 group-hover:to-orange-500/30 transition-all">
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-pink-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <motion.p
              className="text-gray-300 max-w-3xl mx-auto text-center text-base sm:text-lg mt-12 sm:mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              This combination allows us to stand out as more than a service provider — we're your trusted technology partner.
            </motion.p>
          </div>

          {/* Our Team */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-12 sm:mb-16 md:mb-20 lg:mb-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                  Our Team
                </h2>
              </div>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                Behind our success is a team of dedicated professionals passionate about technology. We thrive on collaboration, innovation, and problem-solving, ensuring our clients always receive the best.
              </p>
              <div className="space-y-2 sm:space-y-3">
                {['Expert Technicians', '24/7 Support', 'Certified Professionals'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 flex-shrink-0" />
                    <span className="text-gray-300 text-xs sm:text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Image with professional styling */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <img
                  src="/team.jpg"
                  alt="Our Team"
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>

          {/* Trusted by Leading Institutions */}
          <div className="text-center mb-16 sm:mb-20">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Trusted by Leading Institutions
            </motion.h2>
            {/* Table with internal borders but no outer edges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div className="grid grid-rows-2 gap-6 sm:gap-8">
                {/* Upper Row - Slides from Left */}
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 6
                  }}
                  className="grid grid-cols-5 gap-4 sm:gap-6 lg:gap-8 text-gray-400"
                >
                  <motion.div 
                    className="flex items-center justify-center h-16 w-full p-4"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <img 
                      src="/kivu.png" 
                      alt="Partner 6" 
                      className="h-12 w-auto object-contain"
                    />
                  </motion.div>
                  <motion.div 
                    className="flex items-center justify-center h-16 w-full p-4"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <img 
                      src="/m.png" 
                      alt="Partner 7" 
                      className="h-12 w-auto object-contain"
                    />
                  </motion.div>
                  <motion.div 
                    className="flex items-center justify-center h-16 w-full p-4"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <img 
                      src="/pacis.png" 
                      alt="Partner 8" 
                      className="h-12 w-auto object-contain"
                    />
                  </motion.div>
                  <motion.div 
                    className="flex items-center justify-center h-16 w-full p-4"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <img 
                      src="/fastrack.png" 
                      alt="Partner 9" 
                      className="h-12 w-auto object-contain"
                    />
                  </motion.div>
                  <motion.div 
                    className="flex items-center justify-center h-16 w-full p-4"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <img 
                      src="/ruhondo.png" 
                      alt="Partner 10" 
                      className="h-12 w-auto object-contain"
                    />
                  </motion.div>
                </motion.div>

                {/* Lower Row - Slides from Right */}
                <motion.div 
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: "easeOut", 
                    delay: 0.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 6
                  }}
                  className="grid grid-cols-5 gap-4 sm:gap-6 lg:gap-8 text-gray-400"
                >
                  <motion.div 
                    className="flex items-center justify-center h-16 w-full p-4"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <img 
                      src="/luna.png" 
                      alt="Partner 1" 
                      className="h-12 w-auto object-contain"
                    />
                  </motion.div>
                  <motion.div 
                    className="flex items-center justify-center h-16 w-full p-4"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <img 
                      src="/king.png" 
                      alt="Partner 2" 
                      className="h-12 w-auto object-contain"
                    />
                  </motion.div>
                  <motion.div 
                    className="flex items-center justify-center h-16 w-full p-4"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <img 
                      src="/giz.png" 
                      alt="Partner 3" 
                      className="h-12 w-auto object-contain"
                    />
                  </motion.div>
                  <motion.div 
                    className="flex items-center justify-center h-16 w-full p-4"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <img 
                      src="/canada.png" 
                      alt="Partner 4" 
                      className="h-12 w-auto object-contain"
                    />
                  </motion.div>
                  <motion.div 
                    className="flex items-center justify-center h-16 w-full p-4"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <img 
                      src="/gasmeth.png" 
                      alt="Partner 5" 
                      className="h-12 w-auto object-contain"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
