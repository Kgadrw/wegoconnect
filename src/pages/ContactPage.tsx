import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FaLinkedin, FaXTwitter, FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa6";

const ContactSection = () => {
  return (
    <section className="text-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start lg:items-center">
        
        {/* Left Contact Info */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <p className="text-xs sm:text-sm uppercase text-gray-400">Email</p>
            <p className="font-medium text-sm sm:text-base">wegoconnect@wegotronics.com</p>
          </div>

          <div>
            <p className="text-xs sm:text-sm uppercase text-gray-400">Phone</p>
            <p className="font-medium text-sm sm:text-base">+250 792 052 562</p>
          </div>

          <div>
            <p className="text-xs sm:text-sm uppercase text-gray-400">Location</p>
            <p className="font-medium text-sm sm:text-base">
              CHIC Building Fl - E040 <br />
              KN 2 Ave, Kigali, Rwanda
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm uppercase text-gray-400 mb-2">Our Socials</p>
            <div className="flex gap-3 sm:gap-4 text-lg sm:text-xl">
              <a 
                href="https://linkedin.com/company/wegoconnect" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors cursor-pointer"
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://twitter.com/wegoconnect" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors cursor-pointer"
              >
                <FaXTwitter />
              </a>
              <a 
                href="https://wa.me/+250792052562" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors cursor-pointer"
              >
                <FaWhatsapp />
              </a>
              <a 
                href="https://instagram.com/wegoconnect" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors cursor-pointer"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://facebook.com/wegoconnect" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors cursor-pointer"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://tiktok.com/@wegoconnect" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors cursor-pointer"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        {/* Middle Illustration */}
        <div className="hidden md:flex justify-center mt-8 sm:mt-12 lg:mt-16 order-2 lg:order-1">
          <img
            src="/graphics.png"
            alt="3D Contact Illustration"
            className="w-64 sm:w-80 lg:w-96 xl:w-[480px] object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-white/10 max-w-3xl mx-auto mt-8 sm:mt-12 lg:mt-16 order-3 lg:order-2">
  <form className="space-y-4 sm:space-y-6">
    <input
      type="text"
      placeholder="Full name"
      className="w-full bg-transparent border-b border-white/30 p-2 sm:p-3 focus:outline-none focus:border-purple-400 text-sm sm:text-base"
    />
    <input
      type="email"
      placeholder="Email"
      className="w-full bg-transparent border-b border-white/30 p-2 sm:p-3 focus:outline-none focus:border-purple-400 text-sm sm:text-base"
    />
    <input
      type="tel"
      placeholder="Phone"
      className="w-full bg-transparent border-b border-white/30 p-2 sm:p-3 focus:outline-none focus:border-purple-400 text-sm sm:text-base"
    />
    <textarea
      placeholder="Message"
      rows="4"
      className="w-full bg-transparent border-b border-white/30 p-2 sm:p-3 focus:outline-none focus:border-purple-400 resize-none text-sm sm:text-base"
    ></textarea>
    <button
      type="submit"
      className="w-full py-2 sm:py-3 bg-white text-black rounded-lg font-semibold hover:opacity-90 transition text-sm sm:text-base"
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
