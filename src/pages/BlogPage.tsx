import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      image: "/blog1.png",
      title: "Satellite Transformation in Remote areas",
      description: "Why Satellite Internet is Transforming Connectivity in Remote areas",
      readTime: "5 min read"
    },
    {
      id: 2,
      image: "/blog2.jpg",
      title: "5 Tips for Secure Home Network",
      description: "5 Important Tips for Guiding Your Home Network Secure.",
      readTime: "3 min read"
    },
    {
      id: 3,
      image: "/blog3.png",
      title: "Smart Door Systems for Security and Convenience",
      description: "How Smart Door Systems Improve Security and Convenience.",
      readTime: "4 min read"
    },
    {
      id: 4,
      image: "blog4.jpg",
      title: "LAN vs. Wi-Fi",
      description: "LAN vs. Wi-Fi: Which is Right for Your Business?",
      readTime: "6 min read"
    },
    {
      id: 5,
      image: "/blog5.jpg",
      title: "The Role of IT Support in Driving Business Efficiency",
      description: "The Role of IT Support in Driving Business Efficiency",
      readTime: "7 min read"
    },
    {
      id: 6,
      image: "/blog6.jpg",
      title: "Our Partnership with GIZ&ZON General Trading Co. Ltd",
      description: "Our Partnership with GIZ&ZON General Trading Co. Ltd: Connecting Communities Across Borders.",
      readTime: "8 min read"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with bg2.png and gradients */}
      <div className="absolute inset-0 bg-black">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/bg2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Top gradient */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/95 to-transparent" />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/95 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        
        {/* Header Section */}
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-6 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              {/* Left Content */}
              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                  Our <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">Blog</span>
                </h1>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                  Stay informed with the latest insights, updates, and stories from the world of networking and IT. 
                  At Wego Connect, we share expert advice, technology trends, and practical guides to help you 
                  stay connected and secure.
                </p>
              </div>

              {/* Right Decorative Element */}
              <div className="hidden md:block mt-6 sm:mt-8 lg:mt-0 lg:ml-8">
                <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 relative">
                  <img
                    src="/blog-vector.png"
                    alt="Blog decorative element"
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-12 sm:pb-16 lg:pb-20 px-6 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-800/70 transition-all duration-300 group">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    
                    {/* Read more button */}
                    <Link to={`/article/${post.id}`}>
                      <Button className="bg-gray-800 hover:bg-gray-700 px-4 sm:px-6 py-1.5 sm:py-2 border-b border-white relative group/btn text-xs sm:text-sm">
                        <span className="flex items-center gap-1 sm:gap-2">
                          Read more
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </span>
                        {/* Growing light effect on left, top, and bottom borders */}
                        <div className="absolute -left-px -top-px w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                        <div className="absolute -left-px -top-px w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                        <div className="absolute -left-px -bottom-px w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
