import {defineStore} from "pinia";
import {ref} from "vue";

export const temaDukkaniKullan = defineStore('tema', () => {
    const secili_tema = ref("acik");
    return {secili_tema}
})