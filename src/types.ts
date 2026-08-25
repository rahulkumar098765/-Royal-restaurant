export type DietaryType = 'veg' | 'non-veg' | 'egg' | 'vegan';

export type SpiceLevel = 0 | 1 | 2 | 3; // 0: Mild/None, 1: Low, 2: Medium, 3: High

export type CategoryId = 
  | 'all'
  | 'indian'
  | 'tandoor'
  | 'pizza'
  | 'burgers'
  | 'pasta'
  | 'chinese'
  | 'fast-food'
  | 'salads'
  | 'desserts'
  | 'beverages'
  | 'breakfast'
  | 'combos';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  price: number;
  description: string;
  dietary: DietaryType;
  spiceLevel: SpiceLevel;
  image: string;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  preparationTime?: string;
  calories?: number;
  portionSize?: string;
  ingredients?: string[];
  allergens?: string[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export type OrderType = 'delivery' | 'takeaway' | 'dine-in';

export interface OrderDetails {
  orderType: OrderType;
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
  tableNumber?: string;
  notes?: string;
  paymentMethod: 'cash' | 'upi' | 'card';
  appliedPromo?: string;
}

export interface PlacedOrder {
  orderId: string;
  items: CartItem[];
  orderDetails: OrderDetails;
  subtotal: number;
  discount: number;
  tax: number;
  deliveryFee: number;
  total: number;
  placedAt: string;
  status: 'Received' | 'Preparing' | 'Out for Delivery' | 'Ready' | 'Completed';
}

export type DiningArea = 
  | 'Royal VIP Lounge'
  | 'Family Dining Hall'
  | 'Private Candlelight Booth'
  | 'Garden Terrace'
  | 'Main AC Banquet';

export interface ReservationRequest {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  diningArea: DiningArea;
  occasion: 'Casual Dining' | 'Birthday Celebration' | 'Anniversary' | 'Business Dinner' | 'Romantic Date' | 'Family Reunion';
  specialRequests?: string;
}

export interface ConfirmedReservation extends ReservationRequest {
  bookingId: string;
  bookingTime: string;
  status: 'Confirmed' | 'Pending';
  tableAssigned?: string;
}

export interface EventInquiry {
  fullName: string;
  phone: string;
  email: string;
  eventType: 'Birthday Party' | 'Anniversary Dinner' | 'Corporate Meeting' | 'Outdoor Catering' | 'Wedding Banquet' | 'Private Feast';
  eventDate: string;
  guestCount: number;
  budgetRange: string;
  additionalServices: string[];
  notes?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
  dishRecommended?: string;
  verifiedGuest: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Ambience' | 'Signature Dishes' | 'VIP Dining' | 'Kitchen & Tandoor' | 'Events';
  image: string;
  description: string;
}

export interface FacilityItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  actionLabel?: string;
}
