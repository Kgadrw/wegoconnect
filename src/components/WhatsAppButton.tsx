import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  // Phone number from TopBanner - format for WhatsApp (Rwanda: +250)
  const phoneNumber = "250792052562"; // Remove leading 0 and add country code
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const message = encodeURIComponent("Hello! I'd like to know more about your services.");

  return (
    <a
      href={`${whatsappUrl}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-fade-in"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
