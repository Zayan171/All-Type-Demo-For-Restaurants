export type MenuCategory = 'Starters' | 'Main Course' | 'Burgers' | 'Desserts' | 'Drinks';

export type DietaryTag = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | "Chef's Selection" | 'Organic' | 'Signature';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  dietary?: DietaryTag[];
  image?: string;
  featured?: boolean;
  pairing?: string;
}

export interface Review {
  id: string;
  author: string;
  occasion: string;
  rating: number;
  date: string;
  comment: string;
  source: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Dishes' | 'Interior' | 'Atmosphere';
  image: string;
  caption: string;
}

export interface Statistic {
  value: string;
  label: string;
  detail: string;
}

export interface OpeningHour {
  day: string;
  hours: string;
  note?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface RestaurantConfig {
  name: string;
  tagline: string;
  taglineSecondary: string;
  shortDescription: string;
  fullStory: string[];
  philosophy: string;
  chef: {
    name: string;
    role: string;
    quote: string;
    bio: string;
    image: string;
  };
  address: {
    street: string;
    cityStateZip: string;
    metroArea: string;
    mapEmbedUrl: string;
    googleMapsDirectionsUrl: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    email: string;
    pressEmail: string;
  };
  hours: OpeningHour[];
  stats: Statistic[];
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    image: string;
  };
  menuCategories: {
    id: MenuCategory | 'All';
    label: string;
    description: string;
  }[];
  menuItems: MenuItem[];
  reviews: Review[];
  gallery: GalleryItem[];
  socialLinks: SocialLink[];
  reservationSettings: {
    availableTimeSlots: string[];
    guestRange: number[];
    notice: string;
    cancellationPolicy: string;
  };
}

export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'Main Dining Room' | 'Chef\'s Counter' | 'Covered Terrace';
  specialRequest: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}
