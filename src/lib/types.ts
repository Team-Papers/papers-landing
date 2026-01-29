export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
  price: number;
  rating: number;
  synopsis: string;
  isFree?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Genre {
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface NavLink {
  label: string;
  href: string;
}
