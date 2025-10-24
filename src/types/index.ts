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
  date: string;
  rocket_id?: number;
  rocket: string;
  launch_base_id?: number;
  launchBase: string;
  status: 'scheduled' | 'successful' | 'failed' | 'cancelled';
  description: string;
  created_at?: string;
  updated_at?: string;
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
