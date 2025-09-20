'use client';
import React from 'react';
import {
  ShieldCheck,
  Lightbulb,
  Users,
  Signal,
  Award,
  HeartHandshake,
} from 'lucide-react';

const differences = [
  {
    title: 'Affordability',
    description:
      'We deliver cost-effective networking and IT solutions without compromising on quality.',
    icon: ShieldCheck,
  },
  {
    title: 'Reliability',
    description:
      'Our solutions ensure uninterrupted performance, giving you peace of mind.',
    icon: Signal,
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
    icon: Users,
  },
  {
    title: 'Coverage',
    description:
      'Our solutions cover diverse industries and business sizes.',
    icon: Award,
  },
  {
    title: 'Expertise & Trust',
    description:
      'A team of skilled professionals trusted by leading institutions.',
    icon: HeartHandshake,
  },
];

export default function AboutSection() {
  return (
    <section className="px-32 md:px-16 py-20 text-white">
      {/* Who We Are + Mission + Vision in chat/flow style */}
      <div className="flex flex-col gap-6 mb-20 px-32 py-16">
        {/* Who We Are - left */}
        <div className="self-start max-w-lg bg-purple-800/30 border border-purple-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-4xl font-extrabold mb-4">Who We Are</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
           Wego Connect is a division of Wego Tronics Ltd, founded in 2022 with one clear purpose: to make reliable IT and networking solutions accessible to individuals, businesses, and institutions across Africa. Born from a passion to bridge connectivity gaps, we are here to ensure that no matter where you are, you can stay connected, secure, and in control.
          </p>
        </div>

        {/* Our Mission - right */}
        <div className="self-end max-w-lg bg-purple-800/30 border border-purple-700 rounded-xl p-6 shadow-lg text-right">
          <h2 className="text-4xl font-extrabold mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            To deliver high-quality networking and IT solutions with a focus on reliability, efficiency, and customer satisfaction — while continuously evolving with technological advancements.
          </p>
        </div>

        {/* Our Vision - left */}
        <div className="self-start max-w-lg bg-purple-800/30 border border-purple-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-4xl font-extrabold mb-4">Our Vision</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            To become a leading provider of innovative IT and networking solutions across Africa, enabling businesses and institutions to operate with seamless connectivity.
          </p>
        </div>
      </div>
 <div className="mx-auto w-full max-w-[1280px] border-t border-gray-700 mb-6"></div>
      {/* What Makes Us Different */}
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-5xl font-extrabold mb-6">
          What Makes Us Different
        </h2>
        <p className="text-gray-300 max-w-4xl mx-auto text-lg mb-12">
          At Wego Connect, we believe technology should work for people not the other way around. That’s why we bring together:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-32">
          {differences.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-purple-800/30 border border-purple-700 rounded-xl p-12 shadow-lg hover:scale-105 transition-transform"
              >
                <Icon className="w-16 h-10 text-pink-400 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-lg">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
       
     <p className="text-gray-300 max-w-4xl mx-auto text-lg mb-12">
      This combination allows us to stand out as more than a service provider, we’re your trusted technology partner.
      </p>
      <div className="mx-auto w-full max-w-[1280px] border-t border-gray-700 mb-6"></div>
      {/* Our Team */}
      <div className="grid md:grid-cols-2 gap-10 mb-20 items-center px-32">
        <div>
          <h2 className="text-5xl font-extrabold mb-2">Our Team</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Behind our success is a team of dedicated professionals passionate
            about technology. We thrive on collaboration, innovation, and
            problem-solving, ensuring our clients always receive the best.
          </p>
        </div>
        <div>
          <img
            src="/team.jpg"
            alt="Our Team"
            className="w-full h-60 object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Trusted by Leading Institutions */}
      <div className="text-center">
        <h2 className="text-4xl md:text-4xl font-extrabold mb-10">
          Trusted by Leading Institutions
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-12 text-gray-400">
          <img src="/luna.png" alt="Partner 1" className="h-16 object-contain" />
          <img src="/king.png" alt="Partner 2" className="h-16 object-contain" />
          <img src="/giz.png" alt="Partner 3" className="h-16 object-contain" />
          <img src="/partner4.png" alt="Partner 4" className="h-16 object-contain" />
          <img src="/partner5.png" alt="Partner 5" className="h-16 object-contain" />
        </div>
      </div>
    </section>
  );
}
