export interface Rocket {
  id: number;
  name: string;
  description: string;
  height: number;
  diameter: number;
  mass: number;
  company_id?: number;
  company: string;
  imageUrl: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Launch {
  id: number;
  name: string;
  // Legacy date field for backward compatibility
  date?: string;
  rocket_id?: number;
  rocket?: string;
  launch_base_id?: number;
  launchBase?: string;
  status: 'scheduled' | 'successful' | 'failed' | 'cancelled';
  description?: string;
  created_at?: string;
  updated_at?: string;
  
  // New fields from API changes
  cospar_id?: string;
  sort_date?: string;
  slug?: string;
  modified?: string;
  
  // Launch window fields
  window_open?: string;
  win_open?: string; // API might use this variant
  t0?: string;
  window_close?: string;
  win_close?: string; // API might use this variant
  date_str?: string;
  
  // Provider information (nested)
  provider_id?: number;
  provider?: {
    id: number;
    name: string;
    slug: string;
  };
  
  // Vehicle information (nested)
  vehicle?: {
    id: number;
    name: string;
    company_id?: number;
    slug: string;
  };
  
  // Pad & Location (nested)
  pad?: {
    id: number;
    name: string;
    location?: {
      id: number;
      name: string;
      state: string;
      statename: string;
      country: string;
      slug: string;
    };
  };
  
  // Mission details
  mission_description?: string;
  launch_description?: string;
  missions?: Array<{
    id: number;
    name: string;
    description: string;
  }>;
  
  // Weather information
  weather_summary?: string;
  weather_temp?: number;
  weather_condition?: string;
  weather_wind_mph?: number;
  weather_icon?: string;
  weather_updated?: string;
  
  // Additional metadata
  tags?: Array<{
    id: number;
    text: string;
  }>;
  quicktext?: string;
  suborbital?: boolean;
}

export interface News {
  id: number;
  title: string;
  summary: string;
  content?: string; // Markdown content for the article
  date: string;
  url: string;
  imageUrl: string;
  created_at?: string;
  updated_at?: string;
}

export interface LaunchBase {
  id: number;
  name: string;
  location: string;
  country: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  created_at?: string;
  updated_at?: string;
}

export interface Company {
  id: number;
  name: string;
  description: string;
  founded: number;
  founder: string;
  headquarters: string;
  employees: number;
  website: string;
  imageUrl: string;
  created_at?: string;
  updated_at?: string;
}
