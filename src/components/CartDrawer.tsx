import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Truck, 
  Clock, 
  Check, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Tag, 
  Sparkles, 
  MapPin, 
  User, 
  Phone,
  Utensils,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, OrderDetails, OrderType, PlacedOrder } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  // Customer Details Form
  const [customerDetails, setCustomerDetails] = useState<OrderDetails>({
    orderType: 'delivery',
    customerName: '',
    phone: '',
    address: '',
    tableNumber: 'Table 4',
    notes: '',
    paymentMethod: 'upi'
  });

  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);

  // Financial Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const discount = Math.round((subtotal * discountPercent) / 100);
  const tax = Math.round((subtotal - discount) * 0.05); // 5% GST
  const deliveryFee = orderType === 'delivery' ? (subtotal > 600 ? 0 : 40) : 0;
  const total = Math.max(0, subtotal - discount + tax + deliveryFee);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'ROYAL10' || code === 'ROYAL') {
      setDiscountPercent(10);
      setPromoMessage({ text: '10% Royal Discount Applied!' });
    } else if (code === 'WELCOME50' || code === 'SPICE15') {
      setDiscountPercent(15);
      setPromoMessage({ text: '15% Feast Discount Applied!' });
    } else {
      setPromoMessage({ text: 'Invalid voucher code. Try "ROYAL10"', isError: true });
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerDetails.customerName || !customerDetails.phone) return;
    if (orderType === 'delivery' && !customerDetails.address) return;

    setIsPlacing(true);

    setTimeout(() => {
      const order: PlacedOrder = {
        orderId: 'RSO-' + Math.floor(100000 + Math.random() * 900000),
        items: [...cartItems],
        orderDetails: { ...customerDetails, orderType },
        subtotal,
        discount,
        tax,
        deliveryFee,
        total,
        placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Preparing'
      };

      setPlacedOrder(order);
      setIsPlacing(false);
      onClearCart();

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#d4af37', '#f5e6a8', '#ffffff', '#22c55e']
        });
      } catch (err) {}
    }, 700);
  };

  return (
    <div 
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in flex justify-end"
      onClick={onClose}
    >
      <div 
        id="cart-drawer-panel"
        className="w-full max-w-lg bg-[#111116] border-l border-[#d4af37]/30 h-full flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#d4af37]/20 bg-[#16161f] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gold-gradient text-black flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Your <span className="text-gold-gradient">Royal Order</span>
              </h3>
              <span className="text-xs text-[#a09c91]">
                {cartItems.reduce((total, i) => total + i.quantity, 0)} items selected
              </span>
            </div>
          </div>

          <button
            id="close-cart-drawer"
            onClick={onClose}
            className="p-2 text-[#8c887d] hover:text-white rounded-full bg-black/40 border border-white/5 hover:border-[#d4af37] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-5 flex-1 space-y-6">

          {/* STATE 1: ORDER CONFIRMED SCREEN */}
          {placedOrder ? (
            <div className="py-8 space-y-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  Order Successfully Placed
                </span>
                <h4 className="font-display text-2xl font-bold text-white mt-1">
                  Thank You, {placedOrder.orderDetails.customerName}!
                </h4>
                <p className="text-xs text-[#8c887d] mt-1">
                  Our royal kitchen has received your order and started preparing it with love.
                </p>
              </div>

              {/* Order Status Tracker */}
              <div className="bg-[#181822] p-4 rounded-2xl border border-[#d4af37]/30 text-left space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8c887d]">Order ID:</span>
                  <span className="font-mono font-bold text-gold-gradient">{placedOrder.orderId}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8c887d]">Order Type:</span>
                  <span className="font-semibold text-white capitalize">{placedOrder.orderDetails.orderType}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8c887d]">Estimated Time:</span>
                  <span className="font-semibold text-emerald-400">30 - 45 Minutes</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8c887d]">Total Amount:</span>
                  <span className="font-bold text-white text-sm">₹{placedOrder.total}</span>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <span className="text-[11px] text-[#8c887d] block mb-1">Items Ordered:</span>
                  <div className="space-y-1">
                    {placedOrder.items.map((it) => (
                      <div key={it.menuItem.id} className="text-xs text-[#cfcac0] flex justify-between">
                        <span>{it.quantity}x {it.menuItem.name}</span>
                        <span>₹{it.menuItem.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setPlacedOrder(null);
                    onClose();
                  }}
                  className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-[#0b0b0e] bg-gold-gradient rounded-xl shadow-lg"
                >
                  Continue Browsing Menu
                </button>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            /* STATE 2: EMPTY CART */
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#181822] text-[#d4af37] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-white">Your Royal Bag is Empty</h4>
              <p className="text-xs text-[#8c887d] max-w-xs mx-auto">
                Explore our rich culinary selection of Awadhi biryanis, tandoor specials, and desserts to add items.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0b0b0e] bg-gold-gradient rounded-xl"
              >
                Browse Royal Menu
              </button>
            </div>
          ) : (
            /* STATE 3: ACTIVE CART ITEMS & CHECKOUT */
            <div className="space-y-6">
              
              {/* Order Mode Switcher */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#181824] rounded-xl border border-white/5">
                {[
                  { type: 'delivery', label: 'Delivery', icon: Truck },
                  { type: 'takeaway', label: 'Takeaway', icon: Clock },
                  { type: 'dine-in', label: 'Table Dine-In', icon: Utensils }
                ].map((mode) => (
                  <button
                    key={mode.type}
                    onClick={() => {
                      setOrderType(mode.type as OrderType);
                      setCustomerDetails({ ...customerDetails, orderType: mode.type as OrderType });
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                      orderType === mode.type
                        ? 'bg-[#d4af37] text-black shadow-md'
                        : 'text-[#8c887d] hover:text-white'
                    }`}
                  >
                    <mode.icon className="w-3.5 h-3.5" />
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>

              {/* Cart Items List */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold block">
                  Items in Bag ({cartItems.length})
                </span>
                {cartItems.map((item) => (
                  <div
                    key={item.menuItem.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#161620] border border-white/5"
                  >
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-14 h-14 rounded-xl object-cover border border-[#d4af37]/20"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs sm:text-sm font-bold text-white truncate">
                        {item.menuItem.name}
                      </h5>
                      <span className="text-xs text-gold-gradient font-semibold">
                        ₹{item.menuItem.price} × {item.quantity} = ₹{item.menuItem.price * item.quantity}
                      </span>
                    </div>

                    {/* Quantity Modifier */}
                    <div className="flex items-center bg-[#1c1c28] rounded-xl p-1 border border-white/5">
                      <button
                        onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                        className="p-1 text-[#8c887d] hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                        className="p-1 text-[#d4af37] hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => onRemoveItem(item.menuItem.id)}
                      className="text-[#8c887d] hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="bg-[#161620] p-3 rounded-xl border border-white/5 space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#d4af37]" />
                    <input
                      type="text"
                      placeholder="Enter promo (e.g. ROYAL10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#111116] border border-[#d4af37]/30 rounded-lg text-white uppercase focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#d4af37]/20 text-[#f5e6a8] border border-[#d4af37]/40 rounded-lg hover:bg-[#d4af37] hover:text-black transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[11px] font-medium ${promoMessage.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Delivery Details Form */}
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold block">
                  Customer & Delivery Info
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    required
                    value={customerDetails.customerName}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, customerName: e.target.value })}
                    className="px-3 py-2 text-xs bg-[#161620] border border-[#d4af37]/30 rounded-xl text-white placeholder:text-[#6e6a60] focus:outline-none focus:border-[#d4af37]"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number *"
                    required
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                    className="px-3 py-2 text-xs bg-[#161620] border border-[#d4af37]/30 rounded-xl text-white placeholder:text-[#6e6a60] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                {orderType === 'delivery' && (
                  <input
                    type="text"
                    placeholder="Complete Delivery Address & Landmark *"
                    required
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#161620] border border-[#d4af37]/30 rounded-xl text-white placeholder:text-[#6e6a60] focus:outline-none focus:border-[#d4af37]"
                  />
                )}

                {orderType === 'dine-in' && (
                  <input
                    type="text"
                    placeholder="Table Number (e.g. Table 5 / VIP Lounge)"
                    value={customerDetails.tableNumber}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, tableNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#161620] border border-[#d4af37]/30 rounded-xl text-white placeholder:text-[#6e6a60] focus:outline-none focus:border-[#d4af37]"
                  />
                )}

                {/* Payment Option Selector */}
                <div>
                  <span className="text-[11px] text-[#8c887d] uppercase tracking-wider block mb-1.5">
                    Payment Method
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'upi', label: 'UPI / GPay', icon: Smartphone },
                      { id: 'card', label: 'Card', icon: CreditCard },
                      { id: 'cash', label: 'Cash', icon: Banknote },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setCustomerDetails({ ...customerDetails, paymentMethod: p.id as any })}
                        className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-[11px] font-semibold border transition-all ${
                          customerDetails.paymentMethod === p.id
                            ? 'bg-[#252014] border-[#d4af37] text-white'
                            : 'bg-[#161620] border-white/5 text-[#8c887d]'
                        }`}
                      >
                        <p.icon className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown Summary */}
                <div className="bg-[#181824] p-4 rounded-2xl border border-white/5 space-y-2 text-xs text-[#a09c91]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-white font-medium">₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount ({discountPercent}%):</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST (5%):</span>
                    <span className="text-white">₹{tax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges:</span>
                    <span className="text-white">
                      {deliveryFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                    <span>Total Bill:</span>
                    <span className="text-gold-gradient font-display text-base">₹{total}</span>
                  </div>
                </div>

                {/* Checkout Submit CTA */}
                <button
                  id="cart-checkout-submit-btn"
                  type="submit"
                  disabled={isPlacing}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0b0b0e] bg-gold-gradient rounded-xl shadow-xl shadow-[#d4af37]/20 hover:scale-102 active:scale-98 transition-all disabled:opacity-75"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isPlacing ? 'Placing Royal Order...' : `Confirm & Pay ₹${total}`}</span>
                </button>
              </form>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
