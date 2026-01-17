import { useLocation } from "react-router-dom";
import { CheckCircle, Download, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { api } from "@/lib/api";

const CheckoutSuccessPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || null;
  const { formatPrice } = useCurrency();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      api.getOrder(orderId)
        .then((orderData) => {
          setOrder(orderData);
        })
        .catch((error) => {
          console.error('Error fetching order:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [orderId]);

  const handleDownloadInvoice = async () => {
    if (!orderId) return;
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://wego-backend-taw5.onrender.com/api';
      const invoiceUrl = `${API_BASE_URL}/invoices/${orderId}/pdf`;
      
      // Fetch the PDF as a blob
      const response = await fetch(invoiceUrl);
      if (!response.ok) {
        throw new Error('Failed to download invoice');
      }
      
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onFilterClick={() => {}} />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Thank you for your purchase
            </p>
            {orderId && (
              <>
                <p className="text-sm text-muted-foreground mb-2">
                  Order ID: <span className="font-semibold text-foreground">{orderId}</span>
                </p>
                
                {/* Payment Information */}
                <div className="mt-6 mb-4 p-4 border border-gray-200 rounded-lg text-left max-w-md mx-auto">
                  <div className="mb-3 p-2 border border-blue-200 rounded-md">
                    <p className="text-xs text-blue-700">
                      <span className="font-semibold">Note:</span> We are currently working on integrating an online payment system. It will be available soon!
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src="/momo.png" 
                      alt="MoMo Payment" 
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Complete Payment via Mobile Money</p>
                      <p className="text-xs text-gray-600">Use USSD code to complete your payment</p>
                    </div>
                  </div>
                  {order && (
                    <>
                      <div className="mb-3 space-y-3">
                        <div className="p-3 border border-gray-300 rounded-md">
                          <p className="text-xs text-gray-600 mb-1">Step 1: Dial this USSD code:</p>
                          <p className="text-lg font-mono font-bold text-yellow-600 break-all">
                            *182*1*1*0792052562*{order.total.toFixed(0)}#
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Amount: {formatPrice(order.total)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Phone className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Or call:</span>
                        <a 
                          href="tel:0792052562"
                          className="text-sm font-bold text-red-600 hover:text-red-700 hover:underline"
                        >
                          0792052562
                        </a>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Use this information for payment:</p>
                        <p className="text-sm font-medium text-gray-800">
                          Name: <span className="font-semibold">{order.customerName}</span>
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          Phone: <span className="font-semibold">{order.customerPhone}</span>
                        </p>
                      </div>
                    </>
                  )}
                  {!order && (
                    <div className="mb-3 space-y-3">
                      <div className="p-3 border border-gray-300 rounded-md">
                        <p className="text-xs text-gray-600 mb-1">Step 1: Dial this USSD code:</p>
                        <p className="text-lg font-mono font-bold text-yellow-600 break-all">
                          *182*1*1*0792052562*Amount#
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Enter the total amount from your order
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleDownloadInvoice}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors mt-4"
                >
                  <Download className="h-5 w-5" />
                  Download Invoice
                </button>
              </>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSuccessPage;

