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



    function guncelle(fonksiyon) {
        yukleniyor.value=true;
        api.put(`/musteri/${seciliMusteri.value.id}`,{
            ad: seciliMusteri.value.ad,
            soyad: seciliMusteri.value.soyad,
            telefon: seciliMusteri.value.telefon,
            adres: seciliMusteri.value.adres
        })
            .then((result) => {
                yukleniyor.value=false;
                bilgi(seciliMusteri.value.adi + " İsimli Müşteri güncellendi.");
            })
            .catch(() => {
                    yukleniyor.value=false;
                    hata("Kayıt silinemedi.");
                    fonksiyon();
                }
            );
    };


    function musteriSec(musteri) {
        seciliMusteri.value.id = musteri.id;
        seciliMusteri.value.ad = musteri.ad;
        seciliMusteri.value.soyad = musteri.soyad;
        seciliMusteri.value.telefon = musteri.telefon;
        seciliMusteri.value.adres = musteri.adres;
    }

    function ara(sayfa) {
        yukleniyor.value = true;
        api.get(`/musteri/sayfa_sayisi/${sayfadaki_kayit_sayisi.value}`)
            .then((veri) => {
                toplam_sayfa.value = veri.data.sayfa_sayisi;
                api.get(`/musteri/sayfa/${sayfa}/${sayfadaki_kayit_sayisi.value}`)
                    .then( (veri) => {
                        yukleniyor.value = false;
                        musteriler.value = veri.data;
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

    function sil(fonksiyon)  {
        yukleniyor.value=true;
        api.delete(`/musteri/${seciliMusteri.value.id}`)
            .then((result) => {
                yukleniyor.value=false
                bilgi(seciliMusteri.value.adi + " İsimli Müşteri Silindi.");
                fonksiyon();
            })
            .catch(() => {
                yukleniyor.value=false;
                hata("Kayıt Silinemedi.");
                fonksiyon();
            });
    };



    return {seciliMusteri, yeniMusteri, musteriler, ekle, sil, guncelle, ara, musteriSec};
})