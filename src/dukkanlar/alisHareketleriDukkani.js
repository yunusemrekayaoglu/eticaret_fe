import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {yukleniyorDukkaniKullan} from "@/dukkanlar/yukleniyorStore";
import {uyariDukkaniKullan} from "@/dukkanlar/uyariStore";

export const alisHareketiDukkaniKullan = defineStore('alis_hareketi', () => {
    const seciliAlisHareketi = ref({
        id: 0,
        eklenme_tarihi: '',
        guncellenme_tarihi: '',
        urun_id: '',
        miktar: '',
        birim_fiyat: '',
        tarih: '',
    });

    const yeniAlisHareketi = ref({
        urun_id: 1,
        miktar: '',
        birim_fiyat: '',
        tarih: '',

    });

    const alis_hareketleri = ref([]);

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
        api.post('/urun_alis', yeniAlisHareketi.value)
            .then(function (deger) {
                if (fonksiyon !== undefined) {
                    fonksiyon(deger.data);
                } else {
                    console.log(deger.data);
                }
                console.log(deger.data);
                yeniAlisHareketi.value.adi = '';
                yeniAlisHareketi.value.adres = '';
                yeniAlisHareketi.value.telefon = '';
                yeniAlisHareketi.value.yetkili = '';
                yukleniyor.value = false;
                bilgi('Alış Hareketleri Eklendi.');
            }).catch(function () {
            hata('Alış Hareketleri Eklenemedi.');
        });
    };

    function guncelle() {

    };

    function sil() {

    };

    function ara() {

    };

    return {seciliAlisHareketi, yeniAlisHareketi, alis_hareketleri, ekle, sil, guncelle, ara};
})