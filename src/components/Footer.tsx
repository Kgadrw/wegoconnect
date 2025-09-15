import { Facebook, Twitter, Instagram, Linkedin, MessageCircle, Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Side */}
        <div className="text-sm text-white/80">@2025 Wego Connect</div>

        {/* Right Side - Social Icons */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <a href="#" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 text-white/70 hover:text-blue-500 transition-colors" />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter className="w-5 h-5 text-white/70 hover:text-sky-400 transition-colors" />
          </a>
          <a href="#" aria-label="WhatsApp">
            <MessageCircle className="w-5 h-5 text-white/70 hover:text-green-500 transition-colors" />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram className="w-5 h-5 text-white/70 hover:text-pink-500 transition-colors" />
          </a>
          <a href="#" aria-label="Facebook">
            <Facebook className="w-5 h-5 text-white/70 hover:text-blue-600 transition-colors" />
          </a>
          <a href="#" aria-label="TikTok">
            <Music className="w-5 h-5 text-white/70 hover:text-gray-300 transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
