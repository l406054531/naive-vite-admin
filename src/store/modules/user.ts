import { defineStore } from 'pinia';
import { store } from '../index';
export const useUserStore = defineStore('user',{
    state: () => ({
        name: 'Eduardo',
    }),
});
export function useUserStoreWidthOut() {
    return useUserStore(store);
}
