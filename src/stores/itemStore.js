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
            items.value = data;
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