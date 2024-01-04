import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {yukleniyorDukkaniKullan} from "@/dukkanlar/yukleniyorStore";
import {uyariDukkaniKullan} from "@/dukkanlar/uyariStore";

export const urunDukkaniKullan = defineStore('urun', () => {
    const seciliUrun = ref({
        id: 0,
        eklenme_tarihi: '',
        guncellenme_tarihi: '',
        urun_kodu:'',
        adi: '',
        fiyati: '',
        aciklama: '',

    });

    const yeniUrun = ref({
        urun_kodu:'',
        adi: '',
        fiyati: '',
        aciklama: '',
    });

    const urunler = ref([]);

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
        api.post('/urun', yeniUrun.value)
            .then(function (deger) {
                if (fonksiyon !== undefined) {
                    fonksiyon(deger.data);
                } else {
                    console.log(deger.data);
                }
                console.log(deger.data);
                yeniUrun.value.urun_kodu = '';
                yeniUrun.value.adi = '';
                yeniUrun.value.fiyati = '';
                yeniUrun.value.aciklama = '';
                yukleniyor.value = false;
                bilgi('Ürün Eklendi.');
            }).catch(function () {
            hata('Ürün Eklenemedi.');
        });
    };

    function guncelle() {

    };

    function sil() {

    };

    function ara() {

    };

    return {seciliUrun, yeniUrun, urunler, ekle, sil, guncelle, ara};
})