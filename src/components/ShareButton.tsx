import { Share2, Facebook, Twitter, Copy, Mail, Link2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  productName: string;
  productUrl: string;
  productPrice?: string;
}

const ShareButton = ({ productName, productUrl, productPrice }: ShareButtonProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${productUrl}` : productUrl;
  const shareText = productPrice 
    ? `Check out ${productName} for ${productPrice}!`
    : `Check out ${productName}!`;

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: shareText,
          url: fullUrl,
        });
        setShowShareMenu(false);
      } catch (error) {
        // User cancelled or error occurred
        console.log('Error sharing:', error);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Check out ${productName}`);
    const body = encodeURIComponent(`${shareText}\n\n${fullUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShowShareMenu(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowShareMenu(false);
      }, 2000);
    } catch (error) {
      console.log('Error copying:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleWebShare}
        className="flex items-center gap-2 border border-gray-300 bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>

      {showShareMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowShareMenu(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-lg border bg-card shadow-lg p-2">
            <button
              onClick={shareToFacebook}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors text-left"
            >
              <Facebook className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Facebook</span>
            </button>
            <button
              onClick={shareToTwitter}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors text-left"
            >
              <Twitter className="h-4 w-4 text-blue-400" />
              <span className="text-sm">Twitter</span>
            </button>
            <button
              onClick={shareViaEmail}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors text-left"
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm">Email</span>
            </button>
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors text-left"
            >
              {copied ? (
                <>
                  <Link2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span className="text-sm">Copy Link</span>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;

