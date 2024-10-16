import create from 'zustand';
import { persist } from 'zustand/middleware'

const basketStore = (set) => ({
    basket: [],
    addItems: (items) => {
        set((state) => state.basket = [...state.basket, items])
    },
    removeItem: (item) => {
        set((state) => state.basket = [...state.basket.filter((entry) => (entry.product.key !== item))])
    },

    updateQuantity: (item, quantity) => {
        if (quantity == 0) {
            set((state) => state.basket = [...state.basket.filter((entry) => (entry.product.key !== item))])
            return;
        }
        set((state) => state.basket = [...state.basket.map((entry) => {
            if (entry.product.key == item) {
                entry.count = quantity;
            }

            return entry;
        })])
    }

});


const useBasketStore = create(persist(
    basketStore,
    {
        name: 'basket'
    }
));

export default useBasketStore;
