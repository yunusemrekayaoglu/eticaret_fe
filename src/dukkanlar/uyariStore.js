import {defineStore} from "pinia";
import {ref} from "vue";

export const uyariDukkaniKullan = defineStore('uyari', () => {
    const uyarilar = ref([])

    const suresiBitenler= ref([])

    function temizle() {
        for(let i = 0; i < suresiBitenler.value.length;i++) {
            uyarilar.value.splice(0);
        }
    }

    function bilgi(msj) {
        temizle();
        uyarilar.value.push({mesaj:msj,tur:'bilgi'});
    }
    function hata(msj){
        temizle();
        uyarilar.value.push({mesaj:msj,tur:'hata'});
    }

    return {uyarilar, suresiBitenler,  bilgi, hata, temizle}

});



