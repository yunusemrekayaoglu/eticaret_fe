import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {yukleniyorDukkaniKullan} from "@/dukkanlar/yukleniyorStore";
import {uyariDukkaniKullan} from "@/dukkanlar/uyariStore";

export const magazaDukkaniKullan = defineStore('magaza', () => {
    const seciliMagaza = ref({
        id: 0,
        eklenme_tarihi: '',
        guncellenme_tarihi: '',
        adi: '',
        adres: '',
        telefon: '',
        yetkili: '',
    });

    const yeniMagaza = ref({
        adi: '',
        adres: '',
        telefon: '',
        yetkili: '',
    });

    const magazalar = ref([]);

    const toplam_sayfa = ref(0);

    const sayfadaki_kayit_sayisi = ref(10);


    const api = axios.create({
        baseURL: 'http://127.0.0.1:5000/api/v1'
    });

    const yukleniyorDukkan = yukleniyorDukkaniKullan();

    const {yukleniyor} = storeToRefs(yukleniyorDukkan);

    function guncelle(fonksiyon) {
        yukleniyor.value=true;
        api.put(`/magaza/${seciliMagaza.value.id}`,{
            adi: seciliMagaza.value.adi,
            adres: seciliMagaza.value.adres,
            telefon: seciliMagaza.value.telefon,
            yetkili: seciliMagaza.value.yetkili
        })
            .then((result) => {
                yukleniyor.value=false;
                bilgi(seciliMagaza.value.adi + " İsimli Mağaza güncellendi.");
            })
            .catch(() => {
                yukleniyor.value=false;
                hata("Kayıt silinemedi.");
                fonksiyon();
            }
    );
    };

    const uyariDukkani = uyariDukkaniKullan();



    const {bilgi, hata} = uyariDukkani;


    function magazaSec(magaza) {
        seciliMagaza.value.id = magaza.id;
        seciliMagaza.value.adi = magaza.adi;
        seciliMagaza.value.adres = magaza.adres;
        seciliMagaza.value.telefon = magaza.telefon;
        seciliMagaza.value.yetkili = magaza.yetkili;
    }

    function ekle(fonksiyon) {
            yukleniyor.value = true;
            api.post('/magaza', yeniMagaza.value)
                .then(function (deger) {
                    if (fonksiyon !== undefined) {
                        fonksiyon(deger.data);
                    } else {
                        console.log(deger.data);
                    }
                    yeniMagaza.value.adi = '';
                    yeniMagaza.value.adres = '';
                    yeniMagaza.value.telefon = '';
                    yeniMagaza.value.yetkili = '';
                    yukleniyor.value = false;
                    bilgi('Mağaza Eklendi.');
                }).catch(function () {
                    hata('Mağaza Eklenemedi.');
            });

        };

    function sil(fonksiyon) {
        yukleniyor.value=true;
        api.delete(`/magaza/${seciliMagaza.value.id}`)
            .then((result) => {
               yukleniyor.value=false
                bilgi(seciliMagaza.value.adi + " İsimli Mağaza Silindi.");
               fonksiyon();
            })
            .catch(() => {
                yukleniyor.value=false;
                hata("Kayıt Silinemedi.");
                fonksiyon();
            });
    };

    function ara(sayfa=1) {
        yukleniyor.value = true;
        api.get(`/magaza/sayfa_sayisi/${sayfadaki_kayit_sayisi.value}`)
            .then((veri) => {
                toplam_sayfa.value = veri.data.sayfa_sayisi;
                sayfa = Math.min(sayfa, toplam_sayfa.value);
                api.get(`/magaza/sayfa/${sayfa}/${sayfadaki_kayit_sayisi.value}`)
                    .then( (veri) => {
                        yukleniyor.value = false;
                        magazalar.value = veri.data;
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

    return {seciliMagaza, yeniMagaza, magazalar, toplam_sayfa, ekle, sil, guncelle, ara, magazaSec};
})