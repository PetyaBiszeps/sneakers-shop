import {defineStore} from "pinia";
import {ref} from "vue";

export const usePopupMenuStore = defineStore('popupMenuId', () => {
    const popupIcon = ref(false);
    const popupMenu = ref(false);

    const togglePopupMenu = () => {
        popupIcon.value = !popupIcon.value;
        popupMenu.value = !popupMenu.value;
    };

    const closePopupMenu = () => {
        popupIcon.value = false;
        popupMenu.value = false;
    }

    return {popupMenu, popupIcon, togglePopupMenu, closePopupMenu};
});