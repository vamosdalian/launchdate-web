import { apiFetch } from '../lib/api';
import type { Rocket } from '../types';

export async function fetchRockets(): Promise<Rocket[]> {
  return apiFetch<Rocket[]>('/api/v1/rockets');
}

export async function fetchRocket(id: string): Promise<Rocket> {
  return apiFetch<Rocket>(`/api/v1/rockets/${id}`);
}
