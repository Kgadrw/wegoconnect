import { Facebook, Twitter, Instagram, Phone, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background animate-fade-in">
      <div className="container mx-auto px-4 py-6">
        {/* Contact Information - All on same line */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-4">
          {/* Social Media */}
          <a
            href="https://facebook.com/wegoconnect"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
          
          <a
            href="https://x.com/wegoconnect"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            aria-label="X (Twitter)"
          >
            <Twitter className="h-5 w-5" />
          </a>
          
          <a
            href="https://instagram.com/wego_connect"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>

          {/* Phone */}
          <a
            href="tel:0792052562"
            className="flex items-center text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            aria-label="Phone"
          >
            <Phone className="h-5 w-5" />
          </a>

          {/* Email */}
          <a
            href="mailto:info@wegoconnect.com"
            className="flex items-center text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground animate-fade-in">
          <p>&copy; {currentYear} Wegoconnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
