import { FaLinkedin, FaXTwitter, FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left Side */}
        <div className="text-sm sm:text-base lg:text-lg text-white/80">@2025 Wego Connect</div>

        {/* Right Side - Social Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <FaLinkedin className="text-lg sm:text-xl hover:text-pink-500 transition-colors cursor-pointer" />
          <FaXTwitter className="text-lg sm:text-xl hover:text-pink-500 transition-colors cursor-pointer" />
          <FaWhatsapp className="text-lg sm:text-xl hover:text-pink-500 transition-colors cursor-pointer" />
          <FaInstagram className="text-lg sm:text-xl hover:text-pink-500 transition-colors cursor-pointer" />
          <FaFacebook className="text-lg sm:text-xl hover:text-pink-500 transition-colors cursor-pointer" />
          <FaTiktok className="text-lg sm:text-xl hover:text-pink-500 transition-colors cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
