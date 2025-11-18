import { FaLinkedin, FaXTwitter, FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left Side */}
        <div className="text-sm sm:text-base lg:text-lg text-white/80">@2025 Wego Connect</div>

        {/* Right Side - Social Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a 
            href="https://linkedin.com/company/wegoconnect" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg sm:text-xl hover:text-pink-500 transition-colors cursor-pointer"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://twitter.com/wegoconnect" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg sm:text-xl hover:text-pink-500 transition-colors cursor-pointer"
          >
            <FaXTwitter />
          </a>
          <a 
            href="https://wa.me/+250792052562" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg sm:text-xl hover:text-pink-500 transition-colors cursor-pointer"
          >
            <FaWhatsapp />
          </a>
          <a 
            href="https://instagram.com/wegoconnect" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg sm:text-xl hover:text-pink-500 transition-colors cursor-pointer"
          >
            <FaInstagram />
          </a>
          <a 
            href="https://facebook.com/wegoconnect" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg sm:text-xl hover:text-pink-500 transition-colors cursor-pointer"
          >
            <FaFacebook />
          </a>
          <a 
            href="https://tiktok.com/@wegoconnect" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg sm:text-xl hover:text-pink-500 transition-colors cursor-pointer"
          >
            <FaTiktok />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
