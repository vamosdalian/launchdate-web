import { apiFetch } from '../lib/api';
import type { Launch } from '../types';

export async function fetchRocketLaunches(): Promise<Launch[]> {
  return apiFetch<Launch[]>('/api/v1/rocket-launches');
}

export async function fetchRocketLaunch(id: string): Promise<Launch> {
  return apiFetch<Launch>(`/api/v1/rocket-launches/${id}`);
}
