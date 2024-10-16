import create from 'zustand';

const filterStore = create((set) => (
    {
        search: '',
        setSearch: (search) => {
            set((state) => state.search = search)
        },
    }
));

export default filterStore;