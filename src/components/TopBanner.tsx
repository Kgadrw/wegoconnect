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
              This website is not affliated with , endorsed by ,  or associated with Starlink, For official starlink products , services, and support , please visit the official website at <a href="https://starlink.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-primary transition-colors">https://starlink.com</a> 
            </div>
          </div>

          {/* Right side actions */}
          
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
