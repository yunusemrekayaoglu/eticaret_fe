import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {yukleniyorDukkaniKullan} from "@/dukkanlar/yukleniyorStore";
import {uyariDukkaniKullan} from "@/dukkanlar/uyariStore";

export const musteriDukkaniKullan = defineStore('musteri', () => {
    const seciliMusteri = ref({
        id: 0, eklenme_tarihi: '', guncellenme_tarihi: '', ad: '', soyad: '', telefon: '', adres: '',

    });

    const yeniMusteri = ref({
        ad: '', soyad: '', telefon: '', adres: '',
    });

    const musteriler = ref([]);

    const api = axios.create({
        baseURL: 'http://127.0.0.1:5000/api/v1'
    });

    const yukleniyorDukkan = yukleniyorDukkaniKullan();

    const {yukleniyor} = storeToRefs(yukleniyorDukkan);

    const uyariDukkani = uyariDukkaniKullan();

    const {bilgi, hata} = uyariDukkani;


    function ekle(fonksiyon) {
        console.log("Ekleniyor...");
        yukleniyor.value = true;
        api.post('/musteri', yeniMusteri.value)
            .then(function (deger) {
                if (fonksiyon !== undefined) {
                    fonksiyon(deger.data);
                } else {
                    console.log(deger.data);
                }
                console.log(deger.data);
                yeniMusteri.value.ad = '';
                yeniMusteri.value.soyad = '';
                yeniMusteri.value.telefon = '';
                yeniMusteri.value.adres = '';
                yukleniyor.value = false;
                bilgi('Müşteri Eklendi.');
            }).catch(function () {
            hata('Müşteri Eklenemedi.')
        });
    };

    function guncelle() {

    };

    function sil() {

    };

    function ara() {

    };

    return {seciliMusteri, yeniMusteri, musteriler, ekle, sil, guncelle, ara};
})