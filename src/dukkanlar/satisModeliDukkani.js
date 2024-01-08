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

    function guncelle(fonksiyon) {
        yukleniyor.value=true;
        api.put(`/urun_satis/${seciliSatisModeli.value.id}`,{
            miktar: seciliSatisModeli.value.miktar,
            birim_fiyat: seciliSatisModeli.value.birim_fiyat,
            tarih: seciliSatisModeli.value.tarih
        })
            .then((result) => {
                yukleniyor.value=false;
                bilgi(seciliSatisModeli.value.adi + " İsimli Satış Modeli güncellendi.");
            })
            .catch(() => {
                    yukleniyor.value=false;
                    hata("Kayıt silinemedi.");
                    fonksiyon();
                }
            );
    };




    function satisModeliSec(satis_modeli) {
        seciliSatisModeli.value.id = satis_modeli.id;
        seciliSatisModeli.value.adi = satis_modeli.miktar;
        seciliSatisModeli.value.adres = satis_modeli.birim_fiyat
        seciliSatisModeli.value.telefon = satis_modeli.tarih;
    }

    function sil(fonksiyon) {
        yukleniyor.value=true;
        api.delete(`/urun_satis/${seciliSatisModeli.value.id}`)
            .then((result) => {
                yukleniyor.value=false
                bilgi(seciliSatisModeli.value.adi + " İsimli Satış Modeli Silindi.");
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
        api.get(`/urun_satis/sayfa_sayisi/${sayfadaki_kayit_sayisi.value}`)
            .then((veri) => {
                toplam_sayfa.value = veri.data.sayfa_sayisi;
                api.get(`/urun_satis/sayfa/${sayfa}/${sayfadaki_kayit_sayisi.value}`)
                    .then( (veri) => {
                        yukleniyor.value = false;
                        satis_modelleri.value = veri.data;
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

    return {seciliSatisModeli, yeniSatisModeli, satis_modelleri, ekle, sil, guncelle, ara, satisModeliSec};
})