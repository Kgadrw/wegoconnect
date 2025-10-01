'use client';

import { motion } from "framer-motion";

const differences = [
  {
    title: 'Affordability',
    description:
      'We deliver cost-effective networking and IT solutions without compromising on quality.',
    icon: '/Group.svg',
  },
  {
    title: 'Reliability',
    description:
      'Our solutions ensure uninterrupted performance, giving you peace of mind.',
    icon: '/group2.svg',
  },
  {
    title: 'Innovation',
    description:
      'We embrace the latest technologies to provide future-ready IT solutions.',
    icon: '/Vector.svg',
  },
  {
    title: 'Customer Care',
    description:
      'We are dedicated to supporting our clients with exceptional service.',
    icon: '/service-line.svg',
  },
  {
    title: 'Coverage',
    description:
      'Our solutions cover diverse industries and business sizes.',
    icon: '/Group4.svg',
  },
  {
    title: 'Expertise & Trust',
    description:
      'A team of skilled professionals trusted by leading institutions.',
    icon: '/Group6.png',
  },
];

export default function AboutSection() {
  return (
    <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 lg:py-20 text-white overflow-hidden">
      {/* Who We Are + Mission + Vision */}
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-16 lg:mb-20 px-2 sm:px-4 md:px-16 lg:px-32 py-6 sm:py-8 lg:py-16">
        {/* Who We Are - left */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="self-start max-w-lg bg-gradient-to-br from-purple-800/40 to-purple-900/30 border border-purple-500/30 rounded-xl p-4 sm:p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-2 sm:mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-white">Who We Are</h2>
          <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            Wego Connect is a division of Wego Tronics Ltd, founded in 2022 with one clear purpose: to make reliable IT and networking solutions accessible to individuals, businesses, and institutions across Africa. Born from a passion to bridge connectivity gaps, we are here to ensure that no matter where you are, you can stay connected, secure, and in control.
          </p>
        </motion.div>

        {/* Our Mission - right */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="self-start sm:self-end max-w-lg bg-gradient-to-br from-purple-800/40 to-purple-900/30 border border-purple-500/30 rounded-xl p-4 sm:p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm text-left sm:text-right"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-2 sm:mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-white">Our Mission</h2>
          <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            To deliver high-quality networking and IT solutions with a focus on reliability, efficiency, and customer satisfaction — while continuously evolving with technological advancements.
          </p>
        </motion.div>

        {/* Our Vision - left */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="self-start max-w-lg bg-gradient-to-br from-purple-800/40 to-purple-900/30 border border-purple-500/30 rounded-xl p-4 sm:p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-2 sm:mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-white">Our Vision</h2>
          <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            To become a leading provider of innovative IT and networking solutions across Africa, enabling businesses and institutions to operate with seamless connectivity.
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1280px] border-t border-gray-700 mb-6"></div>

      {/* What Makes Us Different */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
          What Makes Us Different
        </h2>
        <p className="text-gray-300 max-w-4xl mx-auto text-sm sm:text-base lg:text-lg mb-8 sm:mb-12 px-4">
          At Wego Connect, we believe technology should work for people not the other way around. That's why we bring together:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 md:px-16 lg:px-32">
          {differences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-800/30 to-purple-900/20 border border-purple-500/30 rounded-xl p-3 sm:p-4 lg:p-8 shadow-lg hover:shadow-xl hover:scale-105 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="bg-purple-500/10 rounded-full p-2 sm:p-3 w-fit mx-auto mb-3 sm:mb-4">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1.5 sm:mb-2 text-white">{item.title}</h3>
              <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="text-gray-300 max-w-4xl mx-auto text-sm sm:text-base lg:text-lg mb-8 sm:mb-12 px-4">
        This combination allows us to stand out as more than a service provider, we're your trusted technology partner.
      </p>

      <div className="mx-auto w-full max-w-[1280px] border-t border-gray-700 mb-6"></div>

      {/* Our Team */}
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16 lg:mb-20 items-center px-4 sm:px-6 md:px-16 lg:px-32">
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2">Our Team</h2>
    <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
      Behind our success is a team of dedicated professionals passionate
      about technology. We thrive on collaboration, innovation, and
      problem-solving, ensuring our clients always receive the best.
    </p>
  </motion.div>

  {/* Image with glowing border effect */}
  <motion.div
  initial={{ x: 100, opacity: 0 }}
  whileInView={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative inline-block"
>
  {/* Image */}
  <img
    src="/team.jpg"
    alt="Our Team"
    className="w-full h-48 sm:h-56 lg:h-60 object-cover rounded-xl relative z-10"
  />

  {/* Glowing border */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none"
    style={{
      boxShadow: "0 0 30px 10px rgba(255,255,255,0.8)",
    }}
  />
</motion.div>

</div>


      {/* Trusted by Leading Institutions */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 lg:mb-10">
          Trusted by Leading Institutions
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12 text-gray-400">
          <img src="/luna.png" alt="Partner 1" className="h-10 sm:h-12 lg:h-16 object-contain" />
          <img src="/king.png" alt="Partner 2" className="h-10 sm:h-12 lg:h-16 object-contain" />
          <img src="/giz.png" alt="Partner 3" className="h-10 sm:h-12 lg:h-16 object-contain" />
          <img src="/canada.png" alt="Partner 4" className="h-10 sm:h-12 lg:h-16 object-contain" />
          <img src="/gasmeth.png" alt="Partner 5" className="h-10 sm:h-12 lg:h-16 object-contain" />
        </div>
      </div>
    </section>
  );
}
