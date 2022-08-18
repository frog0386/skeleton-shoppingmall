import { writable } from 'svelte/store';

export const user = writable(null);
export const profile = writable(null);
export const modal = writable(null);
export const toastMessage = writable(null);
export const loading = writable(false);
export const itemData = writable(null);
export const cartData = writable([]);
export const rankData = writable([]);
export const indexItemData = writable([]);
