import { Phone, Mail, X } from "lucide-react";
import { useState, useEffect } from "react";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(() => {
    const saved = localStorage.getItem("topBannerVisible");
    return saved !== null ? saved === "true" : true;
  });

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--banner-height",
      isVisible ? "40px" : "0px"
    );
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("topBannerVisible", "false");
    document.documentElement.style.setProperty("--banner-height", "0px");
  };

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground w-full overflow-hidden">
      <div className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-[1fr_auto] items-center gap-4 text-sm">

          {/* 🔁 Scrolling Text */}
          <div className="relative overflow-hidden whitespace-nowrap">
            <div className="animate-marquee hover:[animation-play-state:paused] text-xs md:text-sm font-medium">
              🚀 Need Starlink Internet? Text us or call us today for fast setup & support — Reliable internet anywhere. 📡
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3 md:gap-4">

            {/* Phone */}
            <a
              href="tel:0792052562"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity text-xs md:text-sm"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">+250792052562</span>
            </a>

            {/* Email – icon on mobile, full on desktop */}
            <a
              href="mailto:wegoconnect@wegotronics.com"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden md:inline">
                wegoconnect@wegotronics.com
              </span>
            </a>

            {/* Close */}
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
    </div>
  );
};

export default TopBanner;
