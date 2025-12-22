import { useState } from "react";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/priceFormatter";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
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

      // Create order via API
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
                // Status will be set to "Pending" by default on the server
              };

              const response = await api.createOrder(orderData);

              // Clear cart and navigate to success page
              clearCart();
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onFilterClick={() => {}} />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-muted p-6">
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
            <div className="grid gap-6 lg:gap-8 lg:grid-cols-5">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4 lg:space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center p-3 sm:p-4 rounded-lg border border-gray-200"
                  >
                    {/* Product Image */}
                    <div className="w-full sm:w-20 h-32 sm:h-20 flex-shrink-0 bg-transparent overflow-hidden rounded-lg flex items-center justify-center mx-auto sm:mx-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 w-full">
                      <p className="text-sm sm:text-base font-semibold text-foreground mb-1">{item.name}</p>
                      <p className="text-base sm:text-lg font-bold text-foreground mb-3">
                        {formatPrice(item.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-2 border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-1.5 sm:p-2 hover:bg-accent transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </button>
                          <span className="px-3 sm:px-4 py-1.5 sm:py-2 min-w-[2.5rem] sm:min-w-[3rem] text-center font-medium text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-1.5 sm:p-2 hover:bg-accent transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="p-1.5 sm:p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary & Payment */}
              <div className="lg:col-span-3">
                <div className="border rounded-lg p-4 sm:p-6 lg:sticky lg:top-24">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {/* Left Column - Order Summary */}
                    <div className="space-y-3 sm:space-y-4">
                      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Order Summary</h2>

                      <div className="space-y-2.5 sm:space-y-3">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={customerInfo.name}
                            onChange={(e) =>
                              setCustomerInfo({ ...customerInfo, name: e.target.value })
                            }
                            required
                            className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none rounded"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) =>
                              setCustomerInfo({ ...customerInfo, email: e.target.value })
                            }
                            required
                            className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none rounded"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e) =>
                              setCustomerInfo({ ...customerInfo, phone: e.target.value })
                            }
                            required
                            className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none rounded"
                            placeholder="+250 788 123 456"
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Delivery Location <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={customerInfo.location}
                            onChange={(e) =>
                              setCustomerInfo({ ...customerInfo, location: e.target.value })
                            }
                            required
                            className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none rounded"
                            placeholder="City, District, Sector"
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Delivery Address <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            value={customerInfo.address}
                            onChange={(e) =>
                              setCustomerInfo({ ...customerInfo, address: e.target.value })
                            }
                            required
                            rows={2}
                            className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none resize-none rounded"
                            placeholder="Street address, Building, Floor, etc."
                          />
                        </div>
                      </div>

                      <div className="space-y-3 border-t pt-3 sm:pt-4">
                        <div className="flex justify-between text-base sm:text-lg">
                          <span className="font-bold">Total</span>
                          <span className="font-bold">{formatPrice(total)}</span>
                        </div>
                      </div>

                      <button
                        onClick={handleCheckout}
                        disabled={processing}
                        className="w-full bg-red-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed mt-3 sm:mt-4 rounded"
                      >
                        {processing ? "Processing..." : "Proceed to Checkout"}
                      </button>
                    </div>

                    {/* Right Column - Payment */}
                    <div className="space-y-3 sm:space-y-4">
                      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Payment</h2>

                      {/* MoMo Payment Instructions */}
                      <div className="p-3 sm:p-4 border border-gray-200 rounded-lg">
                        <div className="mb-2 sm:mb-3 p-2 border border-blue-200 rounded-md">
                          <p className="text-xs text-blue-700">
                            <span className="font-semibold">Note:</span> We are currently working on integrating an online payment system. It will be available soon!
                          </p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <img 
                            src="/momo.png" 
                            alt="MoMo Payment" 
                            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                          />
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-gray-800">Payment via Mobile Money</p>
                            <p className="text-xs text-gray-600">Use USSD code to complete payment</p>
                          </div>
                        </div>
                        <div className="mb-2 sm:mb-3 space-y-2 sm:space-y-3">
                          <div className="p-2.5 sm:p-3 border border-gray-300 rounded-md">
                            <p className="text-xs text-gray-600 mb-1">Step 1: Dial this USSD code:</p>
                            <p className="text-sm sm:text-lg font-mono font-bold text-yellow-600 break-all">
                              *182*1*1*0792052562*{total.toFixed(0)}#
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Amount: {formatPrice(total)}
                            </p>
                          </div>
                          
                          <div className="p-2.5 sm:p-3 border border-gray-300 rounded-md">
                            <p className="text-xs text-gray-600 mb-1">Step 2: Enter your Mobile Money PIN</p>
                            <p className="text-xs text-gray-500">
                              After dialing, you will be prompted to enter your Mobile Money PIN on your phone
                            </p>
                          </div>
                          
                          <div className="p-2.5 sm:p-3 border border-gray-300 rounded-md">
                            <p className="text-xs text-gray-600 mb-1">Step 3: Confirm the payment</p>
                            <p className="text-xs text-gray-500">
                              Review the transaction details and confirm to complete your payment
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-xs sm:text-sm text-gray-600">Or call:</span>
                          <a 
                            href="tel:0792052562"
                            className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 hover:underline"
                          >
                            0792052562
                          </a>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Use the name and phone number you entered above for payment verification
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartPage;
