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


    const toplam_sayfa = ref(0);

    const sayfadaki_kayit_sayisi = ref(10);

    const api = axios.create({
        baseURL: 'http://127.0.0.1:5000/api/v1'
    });

    const yukleniyorDukkan = yukleniyorDukkaniKullan();

    const {yukleniyor} = storeToRefs(yukleniyorDukkan);

    const uyariDukkani = uyariDukkaniKullan();

    const {bilgi, hata} = uyariDukkani;

    function ekle(fonksiyon) {
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

    function guncelle(fonksiyon) {
        yukleniyor.value=true;
        api.put(`/urun/${seciliUrun.value.id}`,{
            urun_kodu: seciliUrun.value.urun_kodu,
            adi: seciliUrun.value.adi,
            fiyati: seciliUrun.value.fiyati,
            aciklama: seciliUrun.value.aciklama
        })
            .then((result) => {
                yukleniyor.value=false;
                bilgi(seciliUrun.value.adi + " İsimli Ürün güncellendi.");
            })
            .catch(() => {
                    yukleniyor.value=false;
                    hata("Kayıt silinemedi.");
                    fonksiyon();
                }
            );
    };
    function urunSec(urun) {
        seciliUrun.value.urun_kodu = urun.id;
        seciliUrun.value.adi = urun.adi;
        seciliUrun.value.fiyati = urun.fiyati;
        seciliUrun.value.aciklama = urun.aciklama;
    }
    function sil(fonksiyon) {
        yukleniyor.value=true;
        api.delete(`/urun/${seciliUrun.value.id}`)
            .then((result) => {
                yukleniyor.value=false
                bilgi(seciliUrun.value.adi + " İsimli Ürün Silindi.");
                fonksiyon();
            })
            .catch(() => {
                yukleniyor.value=false;
                hata("Kayıt Silinemedi.");
                fonksiyon();
            });
    };

    function ara(sayfa) {
        yukleniyor.value = true;
        api.get(`/urun/sayfa_sayisi/${sayfadaki_kayit_sayisi.value}`)
            .then((veri) => {
                toplam_sayfa.value = veri.data.sayfa_sayisi;
                api.get(`/urun/sayfa/${sayfa}/${sayfadaki_kayit_sayisi.value}`)
                    .then( (veri) => {
                        yukleniyor.value = false;
                        urunler.value = veri.data;
                        bilgi("Veri Yüklendi");
                    })
                    .catch( () => {
                        yukleniyor.value = false;
                        hata("Veri Yüklenemedi.");
                    });

            })
            .catch(() => {
                yukleniyor.value = false;
                hata('Sayfa Sayısı Öğrenilemedi.')
            });
    };

    return {seciliUrun, yeniUrun, urunler, ekle, sil, guncelle, ara, urunSec};
})