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
                yeniAlisHareketi.value.urun_id = '';
                yeniAlisHareketi.value.miktar = '';
                yeniAlisHareketi.value.birim_fiyat = '';
                yeniAlisHareketi.value.tarih = '';
                yukleniyor.value = false;
                bilgi('Alış Hareketleri Eklendi.');
            }).catch(function () {
            hata('Alış Hareketleri Eklenemedi.');
        });
    };

    function guncelle(fonksiyon) {
        yukleniyor.value=true;
        api.put(`/urun_alis/${seciliAlisHareketi.value.id}`,{
            adi: seciliAlisHareketi.value.miktar,
            adres: seciliAlisHareketi.value.birim_fiyat,
            telefon: seciliMagaza.value.tarih,
        })
            .then((result) => {
                yukleniyor.value=false;
                bilgi(seciliAlisHareketi.value.adi + " İsimli Alış Hareketi güncellendi.");
            })
            .catch(() => {
                    yukleniyor.value=false;
                    hata("Kayıt silinemedi.");
                    fonksiyon();
                }
            );
    };


    function sil(fonksiyon) {
        yukleniyor.value=true;
        api.delete(`/urun_alis/${seciliAlisHareketi.value.id}`)
            .then((result) => {
                yukleniyor.value=false
                bilgi(seciliAlisHareketi.value.adi + " İsimli Alış Hareketi Silindi.");
                fonksiyon();
            })
            .catch(() => {
                yukleniyor.value=false;
                hata("Kayıt Silinemedi.");
                fonksiyon();
            });
    };

    function alisHareketiSec(alis_hareketi) {
        seciliAlisHareketi.value.id = alis_hareketi.id;
        seciliAlisHareketi.value.adi = alis_hareketi.miktar;
        seciliAlisHareketi.value.adres = magaza.birim_fiyat;
        seciliAlisHareketi.value.telefon = magaza.tarih;
    }

    function ara(sayfa) {
        yukleniyor.value = true;
        api.get(`/urun_alis/sayfa_sayisi/${sayfadaki_kayit_sayisi.value}`)
            .then((veri) => {
                toplam_sayfa.value = veri.data.sayfa_sayisi;
                api.get(`/urun_alis/sayfa/${sayfa}/${sayfadaki_kayit_sayisi.value}`)
                    .then( (veri) => {
                        yukleniyor.value = false;
                        alis_hareketleri.value = veri.data;
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

    return {seciliAlisHareketi, yeniAlisHareketi, alis_hareketleri, ekle, sil, guncelle, ara, alisHareketiSec};
})