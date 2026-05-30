import { useEffect } from "react";

const TopBanner = () => {
  useEffect(() => {
    document.documentElement.style.setProperty("--banner-height", "40px");
  }, []);

  return (
    <div className="bg-primary text-primary-foreground w-full overflow-hidden">
      <div className="container mx-auto px-4 py-2">
        <div className="relative overflow-hidden whitespace-nowrap text-xs md:text-sm font-medium">
          <div className="animate-marquee hover:[animation-play-state:paused]">
            This website is not affliated with , endorsed by , or associated with Starlink, For official starlink products , services, and support , please visit the official website at{" "}
            <a
              href="https://starlink.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground hover:text-primary transition-colors"
            >
              https://starlink.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
