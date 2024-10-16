import create from 'zustand';

const adminStore = create((set) => (
    {
        items: [],
        setItems: (items) => {
            set((state) => state.items = items)
        },
        addItem: (item) => set((state) => state.items = [...state.items, item]),
        removeItem: (item) => set((state) => state.items = state.items.filter((entry) => (entry.id !== item.id))),
        updateItem: (item) => set((state) => state.items = state.items.map(entry => item.id == entry.id ? item : entry))
    }
));

export default adminStore;