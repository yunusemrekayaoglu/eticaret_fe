import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {yukleniyorDukkaniKullan} from "@/dukkanlar/yukleniyorStore";
import {uyariDukkaniKullan} from "@/dukkanlar/uyariStore";

export const satisModeliDukkaniKullan = defineStore('urun_satis', () => {
    const seciliSatisModeli = ref({
        id: 0,
        eklenme_tarihi: '',
        guncellenme_tarihi: '',
        miktar:'',
        birim_fiyat: '',
        tarih: '',
    });

    const yeniSatisModeli = ref({
        urun_id: 1,
        miktar:'',
        birim_fiyat: '',
        tarih: '',
    });

    const satis_modelleri = ref([]);

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
        api.post('/urun_satis', yeniSatisModeli.value)
            .then(function (deger) {
                if (fonksiyon !== undefined) {
                    fonksiyon(deger.data);
                } else {
                    console.log(deger.data);
                }
                console.log(deger.data);
                yeniSatisModeli.value.miktar = '';
                yeniSatisModeli.value.birim_fiyat = '';
                yeniSatisModeli.value.tarih = '';
                yukleniyor.value = false;
                bilgi('Satış Hareketleri Eklendi.');
            }).catch(function () {
            hata('Satış Hareketleri Eklenemedi.');
        });
    };

    function guncelle() {

    };

    function sil() {

    };

    function ara() {

    };

    return {seciliSatisModeli, yeniSatisModeli, satis_modelleri, ekle, sil, guncelle, ara};
})