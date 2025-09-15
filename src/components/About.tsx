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
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            We are a dedicated team of IT experts passionate about delivering
            reliable networking and IT solutions. Our mission is to bridge the
            gap between people, businesses, and technology through innovation,
            affordability, and trust.
          </p>
        </div>

        {/* Our Mission - right */}
        <div className="self-end max-w-lg bg-purple-800/30 border border-purple-700 rounded-xl p-6 shadow-lg text-right">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            To deliver high-performance IT and networking solutions that empower
            businesses and individuals to stay connected, secure, and efficient.
          </p>
        </div>

        {/* Our Vision - left */}
        <div className="self-start max-w-lg bg-purple-800/30 border border-purple-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            To become the leading provider of networking and IT solutions,
            driving innovation and enabling seamless digital transformation
            across industries.
          </p>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          What Makes Us Different
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-32">
          {differences.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-purple-800/30 border border-purple-700 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform"
              >
                <Icon className="w-10 h-10 text-pink-400 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Our Team */}
      <div className="grid md:grid-cols-2 gap-10 mb-20 items-center px-32">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Behind our success is a team of dedicated professionals passionate
            about technology. We thrive on collaboration, innovation, and
            problem-solving, ensuring our clients always receive the best.
          </p>
        </div>
        <div>
          <img
            src="/team.jpg"
            alt="Our Team"
            className="w-full h-60 object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Trusted by Leading Institutions */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          Trusted by Leading Institutions
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
          <img src="/luna.png" alt="Partner 1" className="h-8 object-contain" />
          <img src="/king.png" alt="Partner 2" className="h-8 object-contain" />
          <img src="/giz.png" alt="Partner 3" className="h-8 object-contain" />
          <img src="/partner4.png" alt="Partner 4" className="h-8 object-contain" />
          <img src="/partner5.png" alt="Partner 5" className="h-8 object-contain" />
        </div>
      </div>
    </section>
  );
}
