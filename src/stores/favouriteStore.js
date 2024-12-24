import {defineStore} from "pinia";
import {ref, onMounted, watch} from "vue";
import axios from "axios";

export const useFavouriteStore = defineStore('favouriteId', () => {
    const favourites = ref([]);

    const fetchFavourites = async () => {
        try {
            const {data} = await axios.get(`https://670cff85073307b4ee41e8c8.mockapi.io/API/v1/favourites`);

            favourites.value = data.map((obj) => obj.item);
        } catch (e) {
            console.log('Error while running favourite items', e);
        }
    };

    const toggleFavourites = async (item) => {
        if (item.isPending) {
            return;
        }
        item.isPending = true;

        try {
            if (item.isFavourite) {
                item.isFavourite = false;
                favourites.value = favourites.value.filter((favourite) => favourite.id !== item.id);

                await axios.delete(`https://670cff85073307b4ee41e8c8.mockapi.io/API/v1/favourites/${item.favouriteId}`);
                item.favouriteId = null;
            } else {
                item.isFavourite = true;
                const {data} = await axios.post('https://670cff85073307b4ee41e8c8.mockapi.io/API/v1/favourites', item);

                item.favouriteId = data.id;
                favourites.value.push(item);
            }
        } catch (e) {
            console.log('Error while toggling favourites', e);
        } finally {
            item.isPending = false;
        }
    };

    onMounted(() => {
        const localFavourites = localStorage.getItem('favourites');
        favourites.value = localFavourites ? JSON.parse(localFavourites) : [];
    });

    watch(favourites, () => {
        localStorage.setItem('favourites', JSON.stringify(favourites.value));
    }, {deep: true});

    return {favourites, fetchFavourites, toggleFavourites};
});