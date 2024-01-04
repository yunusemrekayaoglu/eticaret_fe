import {defineStore} from "pinia";
import {ref} from "vue";


export const yukleniyorDukkaniKullan = defineStore('yukleniyor', () => {
    const yukleniyor = ref(false);
    return {yukleniyor};
});