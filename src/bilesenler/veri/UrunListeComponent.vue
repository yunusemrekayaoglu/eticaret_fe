<script setup>
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {urunDukkaniKullan} from "@/dukkanlar/urunDukkani";
import ModalComponent from "@/bilesenler/ortak/ModalComponent.vue";

const urunDukkani = urunDukkaniKullan();

const {ara, sil, guncelle, urunSec} = urunDukkaniKullan();

const {urunler, toplam_sayfa, seciliUrun} = storeToRefs(urunDukkani);


const sayfa_no = ref(1);



onMounted( () => {
  ara(sayfa_no.value);
});

function sayfayaGit(sayfa) {
  sayfa_no.value=sayfa;
  ara(sayfa_no.value)
}

function oncekiSayfa() {
  if(sayfa_no.value > 1) {
    sayfayaGit(sayfa_no.value-1);
  }
}

function ilkSayfa() {

  if(sayfa_no.value > 1) {
    sayfayaGit(1);
  }
}

function sonrakiSayfa() {
  if(sayfa_no.value < toplam_sayfa.value) {
    sayfayaGit(sayfa_no.value + 1);
  }
}

function sonSayfa() {
  if(sayfa_no.value < toplam_sayfa.value) {
    sayfayaGit(toplam_sayfa.value);
  }

}

const gorunum = ref('liste');


const silme_dialog_acik = ref(false);
const duzenle_dialog_acik = ref(false);

</script>

<template>
  <div class="urunler" v-if="gorunum==='liste'">
    <div class="urunler baslik">
      <span>Tanımlı Ürünler</span>
    </div>
    <div class="satir baslik">
      <div class="hucre sutun-0">Ürün Kodu</div>
      <div class="hucre sutun-1">Ürün Adı</div>
      <div class="hucre sutun-2">Fiyatı</div>
      <div class="hucre sutun-3">Açıklama</div>
    </div>
    <div class="veriler">
      <div class="satir" v-for="urun in urunler">
        <div class="hucre sutun-0">{{ urun.urun_kodu }}</div>
        <div class="hucre sutun-1">{{ urun.adi }}</div>
        <div class="hucre sutun-2">{{ urun.fiyati }}</div>
        <div class="hucre sutun-3">{{ urun.aciklama }}</div>
        <div class="hucre sutun-4">
          <a class="guncelle-btn btn" @click="urunSec(urun);duzenle_dialog_acik=true;">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
          </a>
          <a class="sil-btn btn">
            <font-awesome-icon :icon="['fas', 'trash-can']" @click="seciliUrun=urun; silme_dialog_acik=true;"/>
          </a>
        </div>
      </div>
      <div class="sayfalar">
        <a class="sayfa" :class="sayfa_no===1? 'pasif':''" @click="ilkSayfa">|&lt </a>
        <a class="sayfa" :class="sayfa_no===1? 'pasif':''" @click="oncekiSayfa">&lt </a>
        <a class="sayfa" :class="syf==sayfa_no?'aktif':''" @click="sayfayaGit(syf)" v-for="syf in toplam_sayfa">{{ syf }}</a>
        <a class="sayfa" :class="sayfa_no===toplam_sayfa?'pasif':''" @click="sonrakiSayfa">&gt </a>
        <a class="sayfa" :class="sayfa_no===toplam_sayfa?'pasif':''" @click="sonSayfa">&gt| </a>
      </div>
    </div>
  </div>

  <ModalComponent v-model:acik="silme_dialog_acik" @update:kapanma-sebebi="sebep => {
    if(sebep==='buton')
      {
        silme_dialog_acik=false
      }
  }">
    <template #baslik>
      Silme Onayı
    </template>
    <template #sorumetni>
      {{ seciliUrun.adi }} İsimli Ürünü  Silmek istediğinize Emin misiniz? <br/>
      <span class="uyari"> işlem geri alınamaz.</span>
    </template>
    <template #butonlar>
      <div class="soru button olumsuz" @click="sil( () => { silme_dialog_acik=false; sayfayaGit(sayfa_no); })">Evet</div>
      <div class="soru button olumlu" @click="silme_dialog_acik=false">Hayır</div>
    </template>
  </ModalComponent>

  <ModalComponent v-model:acik="duzenle_dialog_acik" @update:kapanma-sebebi="sebep => {
    if(sebep==='buton')
      {
        duzenle_dialog_acik=false
      }
  }">
    <template #baslik>
      Ürün Düzenleme
    </template>
    <template #sorumetni>
      <div class="data_form">
        <div class="satir">
          <div class="etiket">Ürün Kodu</div>
          <div class="bilesen">
            <font-awesome-icon icon="tag" />
            <input class="girdi" type="text" name="urun_kodu" v-model="seciliUrun.urun_kodu"/>
          </div>
        </div>

        <div class="satir">
          <div class="etiket">Ürün Adı</div>
          <div class="bilesen">
            <font-awesome-icon icon="heading" />
            <input class="girdi" name="adi" v-model="seciliUrun.adi"/>
          </div>
        </div>

        <div class="satir">
          <div class="etiket">Ürün Fiyatı</div>
          <div class="bilesen">
            <font-awesome-icon icon="turkish-lira-sign" />
            <input class="girdi" type="text" name="fiyati" v-model="seciliUrun.fiyati"/>
          </div>
        </div>

        <div class="satir">
          <div class="etiket">Ürün Açıklaması</div>
          <div class="bilesen">
            <font-awesome-icon icon="note-sticky" />
            <textarea class="girdi" name="aciklama" v-model="seciliUrun.aciklama"></textarea>
          </div>
        </div>
        </div>
    </template>
    <template #butonlar>
      <div class="soru button olumsuz" @click="guncelle( () => { duzenle_dialog_acik=false; sayfayaGit(sayfa_no); })">Evet</div>
      <div class="soru button olumlu" @click="duzenle_dialog_acik=false">Hayır</div>
    </template>
  </ModalComponent>




</template>

<style scoped>

a.btn {
  margin: 10px 10px;
  cursor: pointer;
}

a.guncelle-btn {
  color: lightskyblue;
}

a.sil-btn {
  color: darkred;
}


div.sayfalar {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
}

a.sayfa.pasif {
  background-color: lightgray;
  cursor: not-allowed;
}

a.sayfa {
  display: block;
  width: 25px;
  height: 25px;
  text-align: center;
  margin: 2px 2px;
  padding-top: 3px;
  background-color: white;
  border: 1px solid black;
  color: black;
  cursor: pointer;
}

a.sayfa.aktif {
  background-color: lightpink;

}




div.urunler {
  width: 100%;
  padding: 20px 10px;
}
div.urunler.baslik{
  display: flex;
  align-items: center;
  justify-content: center;
  color: yellow;

}
div.satir.baslik {
  background-color: rgba(1, 1, 1, 0%);
  color: yellow;
  font-weight: bold;
  font-size: 15pt;
}

div.urunler.baslik span {
  font-weight: bold;
  font-size: 20pt;
}


div.satir {
  display: flex;
  flex-direction: row;
  width: 100%;
}

div.satir.baslik div.hucre{
  border-top: 1px solid black;
}

div.hucre {
  display: block;
  padding: 2px 2px;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
}

div.hucre.sutun-0 {
  order: 0;
  flex: 0 0 20%;
  border-left: 1px solid black;
}
div.hucre.sutun-1 {
  order: 1;
  flex: 0 0 35%;
}
div.hucre.sutun-2 {
  order: 2;
  flex: 0 0 20%;
}
div.hucre.sutun-3 {
  order: 3;
  flex: 0 0 15%;
}
div.hucre.sutun-4 {
  order: 4;
  flex: 0 0 10%;
  border: none;
}
div.buttoncubugu {
  display: flex;
  gap: 5px;
}

div.button {
  display: block;
  padding: 10px 10px;
  border-radius: 5px;
  cursor: pointer;
}

div.button.olumlu {
  background-color: #52BE80;
  color: white;
}

div.button.olumlu:hover {
  background-color: #27AE60;
  color: white;
}

div.button.olumsuz {
  background-color: #D98880;
  color: white;
}

div.button.olumsuz:hover {
  background-color: #C0392B;
  color: white;
}
</style>