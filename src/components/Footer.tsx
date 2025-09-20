import { FaLinkedin, FaXTwitter, FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Side */}
        <div className="text-lg text-white/80">@2025 Wego Connect</div>

        {/* Right Side - Social Icons */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
         <FaLinkedin />
                       <FaXTwitter />
                       <FaWhatsapp />
                       <FaInstagram />
                       <FaFacebook />
                       <FaTiktok />
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
