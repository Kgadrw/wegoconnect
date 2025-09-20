'use client'
import { Mail, Phone, MapPin } from "lucide-react";
import { FaLinkedin, FaXTwitter, FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa6";


export default function Contact() {
  return (
    <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-black text-white px-6 md:px-16 py-20">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        
        {/* Left Contact Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase text-gray-400">Email</p>
            <p className="font-medium">wegoconnect@wegotronics.com</p>
          </div>

          <div>
            <p className="text-sm uppercase text-gray-400">Phone</p>
            <p className="font-medium">+250 792 052 562</p>
          </div>

          <div>
            <p className="text-sm uppercase text-gray-400">Location</p>
            <p className="font-medium">
              CHIC Building Fl - E040 <br />
              KN 2 Ave, Kigali, Rwanda
            </p>
          </div>

          <div>
            <p className="text-sm uppercase text-gray-400 mb-2">Our Socials</p>
            <div className="flex gap-4 text-xl">
              <FaLinkedin />
              <FaXTwitter />
              <FaWhatsapp />
              <FaInstagram />
              <FaFacebook />
              <FaTiktok />
            </div>
          </div>
        </div>

        {/* Middle Illustration */}
        <div className="flex justify-center">
          <img
            src="/contact-illustration.png"
            alt="3D Contact Illustration"
            className="w-64 md:w-80 object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message!</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              className="w-full p-3 rounded-lg bg-transparent border border-white/20 focus:outline-none focus:border-purple-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-transparent border border-white/20 focus:outline-none focus:border-purple-400"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-3 rounded-lg bg-transparent border border-white/20 focus:outline-none focus:border-purple-400"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full p-3 rounded-lg bg-transparent border border-white/20 focus:outline-none focus:border-purple-400"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
