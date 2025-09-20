import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FaLinkedin, FaXTwitter, FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa6";

const ContactSection = () => {
  return (
    <section className="text-white px-6 md:px-16 py-20">
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
        <div className="flex justify-center mt-16">
  <img
    src="/graphics.png"
    alt="3D Contact Illustration"
    className="w-90 md:w-120 object-contain"
  />
</div>


        {/* Right Form */}
<div className="bg-white/5 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10 max-w-2xl mx-auto mt-16">
  <form className="space-y-6">
    <input
      type="text"
      placeholder="Full name"
      className="w-full bg-transparent border-b border-white/30 p-2 focus:outline-none focus:border-purple-400"
    />
    <input
      type="email"
      placeholder="Email"
      className="w-full bg-transparent border-b border-white/30 p-2 focus:outline-none focus:border-purple-400"
    />
    <input
      type="tel"
      placeholder="Phone"
      className="w-full bg-transparent border-b border-white/30 p-2 focus:outline-none focus:border-purple-400"
    />
    <textarea
      placeholder="Message"
      rows="4"
      className="w-full bg-transparent border-b border-white/30 p-2 focus:outline-none focus:border-purple-400 resize-none"
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
};

const ContactPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with bg2.png and gradients */}
      <div className="absolute inset-0 bg-black">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/bg2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Top gradient */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/95 to-transparent" />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/95 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
