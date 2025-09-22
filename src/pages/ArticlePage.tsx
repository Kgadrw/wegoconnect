import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ArticlePage = () => {
  const { id } = useParams();
  
  // Blog articles data
  const articles = {
    "1": {
      id: 1,
      image: "/blog1.png",
      title: "Satellite Transformation in Remote areas",
      description: "Why Satellite Internet is Transforming Connectivity in Remote areas",
      readTime: "5 min read",
      author: "Wego Connect Team",
      date: "September 15, 2024",
      content: `
        <p class="mb-6 text-gray-300 leading-relaxed">
          In today's digital age, reliable internet connectivity is no longer a luxury but a necessity. However, 
          for millions of people living in remote and rural areas, traditional broadband infrastructure remains 
          out of reach. This is where satellite internet technology is revolutionizing connectivity, bridging 
          the digital divide and transforming lives.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">The Challenge of Remote Connectivity</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Traditional internet infrastructure relies on fiber optic cables and cellular towers, which are 
          expensive to deploy in sparsely populated areas. This has left many remote communities without 
          access to high-speed internet, limiting their ability to participate in the digital economy, 
          access online education, and receive telemedicine services.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">How Satellite Internet Works</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Satellite internet uses geostationary or low-earth orbit satellites to provide internet access 
          directly to users' homes and businesses. A small satellite dish installed at the user's location 
          communicates with satellites in space, which then relay the signal to ground stations connected 
          to the internet backbone.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Key Benefits for Remote Areas</h2>
        <ul class="list-disc list-inside mb-6 text-gray-300 space-y-2">
          <li><strong class="text-white">Universal Coverage:</strong> Can reach any location with a clear view of the sky</li>
          <li><strong class="text-white">Rapid Deployment:</strong> No need for extensive ground infrastructure</li>
          <li><strong class="text-white">Reliable Service:</strong> Less susceptible to weather-related outages than traditional methods</li>
          <li><strong class="text-white">Scalable Solutions:</strong> Easy to expand coverage as demand grows</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Real-World Impact</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          In Rwanda, satellite internet has enabled remote schools to access online learning resources, 
          allowed farmers to use precision agriculture tools, and connected rural healthcare facilities 
          to telemedicine services. This technology is not just about internet access—it's about 
          empowering communities and creating opportunities for economic growth.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">The Future of Satellite Connectivity</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          With the advent of low-earth orbit (LEO) satellite constellations and improved ground equipment, 
          satellite internet is becoming faster, more affordable, and more reliable. Companies like SpaceX's 
          Starlink and others are working to provide global high-speed internet coverage, promising to 
          connect even the most remote corners of the world.
        </p>
        
        <p class="mb-6 text-gray-300 leading-relaxed">
          At Wego Connect, we're proud to be part of this transformation, bringing reliable satellite 
          internet solutions to communities across Rwanda and beyond. Our commitment is to ensure that 
          no one is left behind in the digital revolution.
        </p>
      `
    },
    "2": {
      id: 2,
      image: "/blog2.jpg",
      title: "5 Tips for Secure Home Network",
      description: "5 Important Tips for Guiding Your Home Network Secure.",
      readTime: "3 min read",
      author: "Wego Connect Team",
      date: "September 12, 2024",
      content: `
        <p class="mb-6 text-gray-300 leading-relaxed">
          With the increasing number of connected devices in our homes, securing your home network has 
          become more critical than ever. From smart TVs and security cameras to laptops and smartphones, 
          every device connected to your network is a potential entry point for cybercriminals.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">1. Change Default Router Credentials</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          The first and most important step is to change the default username and password for your router. 
          Default credentials are easily found online and are often the first thing attackers try. Create 
          a strong, unique password that combines letters, numbers, and special characters.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">2. Enable WPA3 Encryption</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Make sure your Wi-Fi network uses WPA3 encryption, the latest and most secure wireless security 
          protocol. If your router doesn't support WPA3, use WPA2 as a minimum. Avoid WEP encryption as 
          it's easily compromised.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">3. Create a Guest Network</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Set up a separate guest network for visitors. This keeps your main network isolated from devices 
          you don't control, preventing potential security breaches from guest devices that might be 
          compromised or infected with malware.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">4. Keep Firmware Updated</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Regularly update your router's firmware to patch security vulnerabilities. Many routers have 
          automatic update features, but it's good practice to check manually every few months. Outdated 
          firmware is one of the most common ways attackers gain access to home networks.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">5. Use a VPN for Sensitive Activities</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          For sensitive activities like online banking or handling confidential information, consider using 
          a VPN (Virtual Private Network). A VPN encrypts your internet traffic, making it much harder for 
          attackers to intercept your data, even if they somehow gain access to your network.
        </p>
        
        <p class="mb-6 text-gray-300 leading-relaxed">
          Implementing these security measures will significantly improve your home network's security. 
          Remember, cybersecurity is an ongoing process, not a one-time setup. Stay vigilant and keep 
          your security practices up to date.
        </p>
      `
    },
    "3": {
      id: 3,
      image: "/blog3.png",
      title: "Smart Door Systems for Security and Convenience",
      description: "How Smart Door Systems Improve Security and Convenience.",
      readTime: "4 min read",
      author: "Wego Connect Team",
      date: "September 10, 2024",
      content: `
        <p class="mb-6 text-gray-300 leading-relaxed">
          Smart door systems represent the perfect fusion of security and convenience, offering homeowners 
          and businesses advanced access control solutions that adapt to modern lifestyles. These systems 
          combine traditional security features with cutting-edge technology to provide comprehensive 
          protection and seamless user experience.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Key Features of Smart Door Systems</h2>
        <ul class="list-disc list-inside mb-6 text-gray-300 space-y-2">
          <li><strong class="text-white">Keyless Entry:</strong> Access via smartphone, key fob, or biometric authentication</li>
          <li><strong class="text-white">Remote Monitoring:</strong> Real-time notifications and video surveillance</li>
          <li><strong class="text-white">Access Logs:</strong> Detailed records of who enters and when</li>
          <li><strong class="text-white">Integration:</strong> Works with home automation systems and security networks</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Enhanced Security Benefits</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Smart door systems provide multiple layers of security that traditional locks simply cannot match. 
          Biometric authentication ensures that only authorized individuals can gain access, while digital 
          access logs provide a complete audit trail of all entry attempts.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Convenience and Accessibility</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Gone are the days of fumbling with keys or worrying about lost access cards. Smart door systems 
          allow you to grant temporary access to guests, service providers, or family members remotely, 
          and you can revoke access just as easily when it's no longer needed.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Integration with Smart Home Systems</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Modern smart door systems integrate seamlessly with other smart home devices, creating a 
          comprehensive security ecosystem. When someone enters your home, the system can automatically 
          adjust lighting, temperature, and even notify other family members.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Choosing the Right System</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          When selecting a smart door system, consider factors such as power backup options, weather 
          resistance, and compatibility with your existing security infrastructure. At Wego Connect, 
          we help you choose and install the perfect smart door solution for your specific needs and 
          security requirements.
        </p>
      `
    },
    "4": {
      id: 4,
      image: "/blog4.jpg",
      title: "LAN vs. Wi-Fi",
      description: "LAN vs. Wi-Fi: Which is Right for Your Business?",
      readTime: "6 min read",
      author: "Wego Connect Team",
      date: "September 8, 2024",
      content: `
        <p class="mb-6 text-gray-300 leading-relaxed">
          Choosing between Local Area Network (LAN) and Wi-Fi for your business can significantly impact 
          your network performance, security, and operational efficiency. Both technologies have their 
          advantages and are often used together in modern business environments.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Understanding LAN (Wired Networks)</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          LAN refers to wired network connections using Ethernet cables. These connections provide direct, 
          dedicated pathways for data transmission between devices and network infrastructure.
        </p>
        
        <h3 class="text-xl font-semibold text-white mb-3 mt-6">LAN Advantages:</h3>
        <ul class="list-disc list-inside mb-6 text-gray-300 space-y-2">
          <li><strong class="text-white">Speed:</strong> Consistently faster speeds with lower latency</li>
          <li><strong class="text-white">Reliability:</strong> Not affected by interference or signal degradation</li>
          <li><strong class="text-white">Security:</strong> More secure as physical access is required</li>
          <li><strong class="text-white">Stability:</strong> Consistent performance without signal drops</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Understanding Wi-Fi (Wireless Networks)</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Wi-Fi provides wireless connectivity using radio waves, allowing devices to connect to the network 
          without physical cables.
        </p>
        
        <h3 class="text-xl font-semibold text-white mb-3 mt-6">Wi-Fi Advantages:</h3>
        <ul class="list-disc list-inside mb-6 text-gray-300 space-y-2">
          <li><strong class="text-white">Mobility:</strong> Freedom to move around while connected</li>
          <li><strong class="text-white">Flexibility:</strong> Easy to add new devices without cabling</li>
          <li><strong class="text-white">Cost:</strong> Lower installation costs for large areas</li>
          <li><strong class="text-white">Scalability:</strong> Easy to expand coverage with additional access points</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">When to Choose LAN</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Choose LAN for critical business operations that require maximum speed and reliability, such as 
          servers, workstations, and network infrastructure equipment. LAN is ideal for fixed workstations 
          and high-bandwidth applications.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">When to Choose Wi-Fi</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Choose Wi-Fi for mobile devices, temporary workstations, and areas where running cables is 
          impractical or expensive. Wi-Fi is perfect for meeting rooms, lobbies, and employee devices 
          that need mobility.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">The Hybrid Approach</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Most modern businesses benefit from a hybrid approach, using LAN for critical infrastructure 
          and Wi-Fi for mobile devices and flexible workspaces. This provides the best of both worlds, 
          ensuring reliability where needed and flexibility where desired.
        </p>
      `
    },
    "5": {
      id: 5,
      image: "/blog5.jpg",
      title: "The Role of IT Support in Driving Business Efficiency",
      description: "The Role of IT Support in Driving Business Efficiency",
      readTime: "7 min read",
      author: "Wego Connect Team",
      date: "September 5, 2024",
      content: `
        <p class="mb-6 text-gray-300 leading-relaxed">
          In today's digital-first business environment, IT support has evolved from a reactive service 
          to a strategic driver of business efficiency and growth. Effective IT support doesn't just fix 
          problems—it prevents them, optimizes systems, and enables businesses to operate at peak performance.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Proactive Problem Prevention</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Modern IT support focuses on preventing issues before they impact business operations. Through 
          continuous monitoring, regular maintenance, and predictive analytics, IT support teams can 
          identify potential problems and address them before they cause downtime or data loss.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">System Optimization and Performance</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          IT support teams continuously optimize systems to ensure maximum performance. This includes 
          updating software, managing system resources, and implementing best practices that keep 
          business applications running smoothly and efficiently.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Security and Compliance</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          With cyber threats constantly evolving, IT support plays a crucial role in maintaining robust 
          security measures. This includes implementing security updates, monitoring for threats, and 
          ensuring compliance with industry regulations and data protection standards.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Employee Productivity Enhancement</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          By providing reliable technology and quick resolution of technical issues, IT support directly 
          impacts employee productivity. When employees can focus on their core responsibilities without 
          technical interruptions, overall business efficiency increases significantly.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Scalability and Growth Support</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          As businesses grow, their IT needs evolve. Professional IT support helps businesses scale their 
          technology infrastructure efficiently, ensuring that systems can handle increased demand without 
          compromising performance or security.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Cost Optimization</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Effective IT support helps businesses optimize their technology investments, reducing unnecessary 
          costs while maximizing the value of their IT infrastructure. This includes identifying 
          underutilized resources and recommending cost-effective solutions.
        </p>
        
        <p class="mb-6 text-gray-300 leading-relaxed">
          At Wego Connect, we understand that IT support is more than just technical assistance—it's a 
          strategic partnership that drives business success. Our comprehensive IT support services are 
          designed to keep your business running efficiently while enabling growth and innovation.
        </p>
      `
    },
    "6": {
      id: 6,
      image: "/blog6.jpg",
      title: "Our Partnership with GIZ&ZON General Trading Co. Ltd",
      description: "Our Partnership with GIZ&ZON General Trading Co. Ltd: Connecting Communities Across Borders.",
      readTime: "8 min read",
      author: "Wego Connect Team",
      date: "September 1, 2024",
      content: `
        <p class="mb-6 text-gray-300 leading-relaxed">
          We are excited to announce our strategic partnership with GIZ&ZON General Trading Co. Ltd, 
          a collaboration that represents a significant milestone in our mission to connect communities 
          across borders and bring reliable technology solutions to underserved regions.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">About GIZ&ZON General Trading Co. Ltd</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          GIZ&ZON General Trading Co. Ltd is a leading trading company with extensive experience in 
          international commerce and technology distribution. Their commitment to quality and innovation 
          aligns perfectly with our vision of providing cutting-edge networking and IT solutions to 
          communities that need them most.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Partnership Objectives</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          This partnership aims to expand our reach and impact by combining our technical expertise 
          with GIZ&ZON's extensive distribution network and market knowledge. Together, we will work 
          to bring reliable internet connectivity and IT solutions to remote and underserved communities 
          across the region.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Key Areas of Collaboration</h2>
        <ul class="list-disc list-inside mb-6 text-gray-300 space-y-2">
          <li><strong class="text-white">Technology Distribution:</strong> Expanding access to quality networking equipment</li>
          <li><strong class="text-white">Infrastructure Development:</strong> Building robust IT infrastructure in remote areas</li>
          <li><strong class="text-white">Training and Support:</strong> Providing technical training and ongoing support</li>
          <li><strong class="text-white">Community Outreach:</strong> Connecting with local communities to understand their needs</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Impact on Local Communities</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Through this partnership, we will be able to reach more communities and provide them with 
          the technology solutions they need to thrive in the digital age. This includes schools, 
          healthcare facilities, small businesses, and individual households that have been left behind 
          by traditional internet infrastructure.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Future Plans and Expansion</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          This partnership is just the beginning of our expanded efforts to connect communities across 
          borders. We plan to establish regional offices, training centers, and support facilities that 
          will serve as hubs for technology education and implementation throughout the region.
        </p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Commitment to Excellence</h2>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Both Wego Connect and GIZ&ZON General Trading Co. Ltd are committed to maintaining the highest 
          standards of quality and service. This partnership represents our shared dedication to making 
          technology accessible, reliable, and beneficial for all communities, regardless of their 
          location or economic status.
        </p>
        
        <p class="mb-6 text-gray-300 leading-relaxed">
          We look forward to the positive impact this partnership will have on communities across the 
          region and are excited to continue our mission of connecting the world, one community at a time.
        </p>
      `
    }
  };

  const article = articles[id as keyof typeof articles];

  if (!article) {
    return (
      <div className="min-h-screen relative overflow-hidden">
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
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
            <Link to="/blog">
              <Button className="bg-gray-800 hover:bg-gray-700 px-6 py-2 border-b border-white">
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        
        {/* Article Header */}
        <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/blog" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Article Meta */}
            <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Article Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Article Description */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {article.description}
            </p>

            {/* Article Image */}
            <div className="aspect-video overflow-hidden rounded-lg mb-12">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <article 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default ArticlePage;
