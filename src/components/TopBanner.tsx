import { useEffect, useRef } from "react";

const TopBanner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.removeItem("topBannerVisible");

    const updateBannerHeight = () => {
      const height = bannerRef.current?.offsetHeight ?? 40;
      document.documentElement.style.setProperty("--banner-height", `${height}px`);
    };

    updateBannerHeight();
    window.addEventListener("resize", updateBannerHeight);
    return () => window.removeEventListener("resize", updateBannerHeight);
  }, []);

  return (
    <div
      ref={bannerRef}
      id="top-banner"
      className="bg-primary text-primary-foreground w-full"
    >
      <div className="container mx-auto px-4 py-2">
        <p className="text-center text-xs md:text-sm font-medium leading-relaxed">
          This website is not affliated with , endorsed by , or associated with Starlink, For official starlink products , services, and support , please visit the official website at{" "}
          <a
            href="https://starlink.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity"
          >
            https://starlink.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default TopBanner;
