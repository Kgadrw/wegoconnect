import { Phone, Mail, X } from "lucide-react";
import { useState, useEffect } from "react";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('topBannerVisible');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    // Update CSS variable for banner height when visible
    if (isVisible) {
      // Banner height is approximately 40px (py-2 = 8px top + 8px bottom + ~24px content)
      document.documentElement.style.setProperty('--banner-height', '40px');
    } else {
      document.documentElement.style.setProperty('--banner-height', '0px');
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('topBannerVisible', 'false');
    document.documentElement.style.setProperty('--banner-height', '0px');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground w-full">
      <div className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-[1fr_auto] items-center text-sm">
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {/* Phone */}
            <a
              href="tel:0792052562"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="Call 0792052562"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">0792052562</span>
            </a>

            {/* Email */}
            <a
              href="mailto:info@wegoconnect.com"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="Email info@wegoconnect.com"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">info@wegoconnect.com</span>
            </a>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="p-1 hover:opacity-80 transition-opacity"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
