import {defineStore} from "pinia";
import {ref, reactive, watch, onMounted} from "vue";
import axios from "axios";

export const useItemStore = defineStore('itemId', () => {
    const items = ref([]);
    const filters = reactive({sortBy: 'title', searchQuery: ''});

    const fetchItems = async () => {
        try {
            const params = {sortBy: filters.sortBy};

            if (filters.searchQuery) {
                params.title = filters.searchQuery;
            }

            const {data} = await axios.get(`https://670cff85073307b4ee41e8c8.mockapi.io/API/v1/items`, {params});

            if (filters.sortBy === 'price') {
                items.value = data.sort((a, b) => a.price - b.price);
            } else if (filters.sortBy === '-price') {
                items.value = data.sort((a, b) => b.price - a.price);
            } else if (filters.sortBy === 'title') {
                items.value = data.sort((a, b) => a.title.localeCompare(b.title));
            } else {
                items.value = data;
            }
        } catch (e) {
            console.log('Error while fetching items', e);
        }
    };

    const onChangeSelect = (value) => {
        filters.sortBy = value;
    };

    const onChangeSearchInput = (query) => {
        filters.searchQuery = query;
    };

    onMounted(fetchItems);
    
    watch(filters, fetchItems);

    return {items, filters, fetchItems, onChangeSelect, onChangeSearchInput};
});