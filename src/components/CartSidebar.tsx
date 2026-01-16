import { useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/priceFormatter";

const CartSidebar = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice, 
    clearCart,
    isSidebarOpen,
    closeSidebar 
  } = useCart();
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
      closeSidebar();
      navigate("/checkout/success", { 
        state: { orderId: response.orderId || response._id || null } 
      });
    } catch (error: any) {
      console.error("Error creating order:", error);
      alert("Failed to place order: " + (error.message || "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeSidebar}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-xl z-50 flex flex-col overflow-hidden transform transition-transform duration-300 ease-in-out animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b animate-fade-in">
          <h2 className="text-lg font-bold">Cart</h2>
          <button
            onClick={closeSidebar}
            className="p-2 hover:bg-accent transition-all duration-300 hover:scale-110"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 animate-fade-in">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={item._id}
                className="flex gap-3 p-3 border rounded-lg stagger-item hover-lift"
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
                  <p className="text-sm text-foreground mb-1 truncate">{item.name}</p>
                  <p className="text-sm font-bold text-foreground mb-2">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 border rounded">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-1 hover:bg-accent transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 py-1 min-w-[2rem] text-center text-xs font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-1 hover:bg-accent transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-1 text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Form & Summary */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4 overflow-y-auto max-h-[60vh]">
            <h3 className="font-bold text-sm">Customer Information</h3>
            <div className="space-y-2">
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                placeholder="Full Name *"
                className="w-full px-3 py-2 text-sm border border-gray-300 outline-none"
              />
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                placeholder="Email *"
                className="w-full px-3 py-2 text-sm border border-gray-300 outline-none"
              />
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                placeholder="Phone Number *"
                className="w-full px-3 py-2 text-sm border border-gray-300 outline-none"
              />
              <input
                type="text"
                value={customerInfo.location}
                onChange={(e) => setCustomerInfo({ ...customerInfo, location: e.target.value })}
                placeholder="Delivery Location *"
                className="w-full px-3 py-2 text-sm border border-gray-300 outline-none"
              />
              <textarea
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                placeholder="Delivery Address *"
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 outline-none resize-none"
              />
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-sm">Total</span>
                <span className="font-bold text-sm">{formatPrice(total)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={processing}
                className="w-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {processing ? "Processing..." : "Proceed to Checkout"}
                {!processing && <ArrowRight className="h-4 w-4" />}
              </button>
              <Link
                to="/cart"
                onClick={closeSidebar}
                className="block text-center text-sm text-muted-foreground hover:text-foreground mt-2"
              >
                View full cart page
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
