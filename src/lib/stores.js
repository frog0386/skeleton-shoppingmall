import { writable } from 'svelte/store';

export const user = writable(null);
export const profile = writable(null);
export const modal = writable(null);
export const toastMessage = writable(null);
export const loading = writable(false);
