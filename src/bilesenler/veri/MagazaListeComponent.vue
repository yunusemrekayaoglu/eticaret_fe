<script setup>
import {onMounted, ref} from "vue";
import {magazaDukkaniKullan} from "@/dukkanlar/magazaDukkani";
import {storeToRefs} from "pinia";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import ModalComponent from "@/bilesenler/ortak/ModalComponent.vue";

const magazaDukkani = magazaDukkaniKullan();

const {ara, sil, guncelle, magazaSec} = magazaDukkani;

const {magazalar, toplam_sayfa, seciliMagaza} = storeToRefs(magazaDukkani);


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
<div class="magazalar" v-if="gorunum==='liste'">
  <div class="magazalar baslik">
    <span>Tanımlı Mağazalar</span>
  </div>
  <div class="satir baslik">
    <div class="hucre sutun-0">Mağaza Adı</div>
    <div class="hucre sutun-1">Mağaza Adresi</div>
    <div class="hucre sutun-2">Mağaza Telefonu</div>
    <div class="hucre sutun-3">Mağaza Yetkili Kişi</div>
  </div>
  <div class="veriler">
    <div class="satir" v-for="magaza in magazalar">
      <div class="hucre sutun-0">{{ magaza.adi }}</div>
      <div class="hucre sutun-1">{{ magaza.adres }}</div>
      <div class="hucre sutun-2">{{ magaza.telefon }}</div>
      <div class="hucre sutun-3">{{ magaza.yetkili }}</div>
      <div class="hucre sutun-4">
        <a class="guncelle-btn btn" @click="magazaSec(magaza);duzenle_dialog_acik=true;">
          <font-awesome-icon :icon="['fas', 'pen-to-square']" />
        </a>
        <a class="sil-btn btn" @click="seciliMagaza=magaza; silme_dialog_acik=true;">
          <font-awesome-icon :icon="['fas', 'trash-can']" />
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
       {{ seciliMagaza.adi }} İsimli Mağazayı  Silmek istediğinize Emin misiniz? <br/>
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
      Mağaza Düzenleme
    </template>
    <template #sorumetni>
      <div class="data_form">
        <div class="satir">
          <div class="etiket">Mağaza Adı</div>
          <div class="bilesen">
            <font-awesome-icon icon="basket-shopping"></font-awesome-icon>
            <input class="girdi" type="text" name="adi" v-model="seciliMagaza.adi"/>
          </div>
        </div>

        <div class="satir">
          <div class="etiket">Mağaza Adresi</div>
          <div class="bilesen">
            <font-awesome-icon icon="fa-solid fa-location-pin"></font-awesome-icon>
            <textarea class="girdi" name="adres" v-model="seciliMagaza.adres">
      </textarea>
          </div>
        </div>

        <div class="satir">
          <div class="etiket">Mağaza Telefonu</div>
          <div class="bilesen">
            <font-awesome-icon icon="fa-solid fa-phone"></font-awesome-icon>
            <input class="girdi" type="text" name="telefon" placeholder="0 (5XX) XXX XX XX" v-model="seciliMagaza.telefon"/>
          </div>
        </div>

        <div class="satir">
          <div class="etiket">Mağaza Yetkili Kişi Adı</div>
          <div class="bilesen">
            <font-awesome-icon icon="fa-solid fa-person"></font-awesome-icon>
            <input class="girdi" type="text" name="yetkili" v-model="seciliMagaza.yetkili"/>
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




div.magazalar {
  width: 100%;
  padding: 20px 10px;
}
div.magazalar.baslik{
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

div.magazalar.baslik span {
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

</style>