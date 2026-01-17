import { useState } from "react";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingCart, User, Mail, Phone, MapPin, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { api } from "@/lib/api";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const [processing, setProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
  });
  const navigate = useNavigate();

  const subtotal = getTotalPrice();
  const total = subtotal;

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // Require all fields
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address || !customerInfo.location) {
      alert("Please fill in all customer information");
      return;
    }

    try {
      setProcessing(true);

      const orderData = {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        customerAddress: customerInfo.address,
        deliveryLocation: customerInfo.location,
        items: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: subtotal,
        shipping: 0,
        total: total,
      };

      const response = await api.createOrder(orderData);

      // Clear cart and navigate to success page
      clearCart();
      navigate("/checkout/success", { 
        state: { orderId: (response as any).orderId || (response as any)._id || null } 
      });
    } catch (error: any) {
      console.error("Error creating order:", error);
      alert("Failed to place order: " + (error.message || "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onFilterClick={() => {}} />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6 flex justify-center">
                <div className="p-6">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Start adding items to your cart
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                Go Shopping
              </Link>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto animate-fade-in">
              <h1 className="text-2xl sm:text-3xl font-bold mb-8 animate-slide-in-down">Checkout</h1>
              
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column - Order Items & Customer Information */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Cart Items */}
                  <div className="border p-6 space-y-4 animate-scale-in">
                    <div className="flex items-center gap-3 mb-4">
                      <Package className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-bold">Order Items</h2>
                    </div>
                    
                    {cartItems.map((item, index) => (
                      <div
                        key={item._id}
                        className="flex gap-4 p-4 border stagger-item hover-lift"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="w-20 h-20 flex-shrink-0 bg-transparent overflow-hidden flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-foreground mb-1">{item.name}</p>
                          <p className="font-bold text-foreground mb-3">
                            {formatPrice(item.price)}
                          </p>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 border">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="p-2 hover:bg-accent transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="p-2 hover:bg-accent transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className="p-2 text-destructive hover:bg-destructive/10 transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer Information Form */}
                  <div className="border p-6 space-y-6 animate-scale-in">
                    <div className="flex items-center gap-3 mb-4">
                      <User className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-bold">Customer Information</h2>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={customerInfo.name}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, name: e.target.value })
                          }
                          required
                          className="w-full px-4 py-2 border border-gray-300 outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, email: e.target.value })
                          }
                          required
                          className="w-full px-4 py-2 border border-gray-300 outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={customerInfo.phone}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, phone: e.target.value })
                          }
                          required
                          className="w-full px-4 py-2 border border-gray-300 outline-none"
                          placeholder="+250 788 123 456"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Delivery Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={customerInfo.location}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, location: e.target.value })
                          }
                          required
                          className="w-full px-4 py-2 border border-gray-300 outline-none"
                          placeholder="City, District, Sector"
                        />
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-2">
                          Delivery Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={customerInfo.address}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, address: e.target.value })
                          }
                          required
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 outline-none resize-none"
                          placeholder="Street address, Building, Floor, etc."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Order Summary & Payment */}
                <div className="lg:col-span-1">
                  <div className="border p-6 space-y-6 sticky top-24 animate-slide-in-right">
                    {/* Order Summary */}
                    <div>
                      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="font-semibold">{formatPrice(subtotal)}</span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="border-t pt-6">
                      <h2 className="text-xl font-bold mb-4">Payment</h2>
                      
                      <div className="p-4 border space-y-4">
                        <div className="flex justify-center">
                          <img 
                            src="/momo.png" 
                            alt="MoMo Payment" 
                            className="w-24 h-24 object-contain"
                          />
                        </div>
                        
                        <div className="text-center space-y-2">
                          <p className="text-base font-semibold text-gray-800">MOMO CODE :<span className="text-yellow-600">381765</span></p>
                          <p className="text-base font-semibold text-gray-800">Wegoconnect</p>
                          <p className="text-sm font-semibold text-gray-800">Payment via Mobile Money</p>
                          <p className="text-xs text-gray-600">Use USSD code to complete payment</p>
                        </div>
                        
                        <div className="p-3 border">
                          <p className="text-xs text-gray-600 mb-2 text-center">
                            We are currently upgrading our payment system. In the meantime, please use the MOMO CODE above to complete your payment. For assistance, please contact us at:
                          </p>
                          <div className="text-center">
                            <a 
                              href="tel:0792052562"
                              className="text-base font-bold text-yellow-600 hover:text-yellow-700 hover:underline"
                            >
                              0792052562
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={handleCheckout}
                      disabled={processing}
                      className="w-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary-dark hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {processing ? "Processing..." : "Place Order"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
