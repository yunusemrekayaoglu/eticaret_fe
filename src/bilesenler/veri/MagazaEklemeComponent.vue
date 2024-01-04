<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ref} from "vue";
import ModalComponent from "@/bilesenler/ortak/ModalComponent.vue";
import {magazaDukkaniKullan} from "@/dukkanlar/magazaDukkani";
import {storeToRefs} from "pinia";


const magazaDukkan = magazaDukkaniKullan();

const {yeniMagaza} = storeToRefs(magazaDukkan);

const {ekle} = magazaDukkan;

const dialog_acik = ref(false)


function magaza_bilgilerini_yazdir() {
  dialog_acik.value = true;
}

</script>

<template>
  <div class="data_form">
    <div class="satir">
      <div class="etiket">Mağaza Adı</div>
      <div class="bilesen">
        <font-awesome-icon icon="basket-shopping"></font-awesome-icon>
        <input class="girdi" type="text" name="adi" v-model="yeniMagaza.adi"/>
      </div>
    </div>

    <div class="satir">
      <div class="etiket">Mağaza Adresi</div>
      <div class="bilesen">
        <font-awesome-icon icon="fa-solid fa-location-pin"></font-awesome-icon>
        <textarea class="girdi" name="adres" v-model="yeniMagaza.adres">

      </textarea>
      </div>
    </div>

    <div class="satir">
      <div class="etiket">Mağaza Telefonu</div>
      <div class="bilesen">
        <font-awesome-icon icon="fa-solid fa-phone"></font-awesome-icon>
        <input class="girdi" type="text" name="telefon" placeholder="0 (5XX) XXX XX XX" v-model="yeniMagaza.telefon"/>
      </div>
    </div>

    <div class="satir">
      <div class="etiket">Mağaza Yetkili Kişi Adı</div>
      <div class="bilesen">
        <font-awesome-icon icon="fa-solid fa-person"></font-awesome-icon>
        <input class="girdi" type="text" name="yetkili" v-model="yeniMagaza.yetkili"/>
      </div>
    </div>
    <div class="satir">
      <div class="buttoncubugu">
        <div class="button olumlu" @click="magaza_bilgilerini_yazdir">Ekle</div>
        <div class="button olumsuz">İptal</div>
      </div>
    </div>
  </div>
  <ModalComponent v-model:acik="dialog_acik" @update:kapanma-sebebi="sebep => {
    if(sebep==='buton')
      {
        dialog_acik=false
      }
  }">
    <template #baslik>
      Kaydetme Onayı
    </template>
    <template #sorumetni>
      Değişiklikleri kaydetmek istediğinize emin misiniz? <br/>
      <span class="uyari"> işlem geri alınamaz.</span>
    </template>
    <template #butonlar>
      <div class="soru button olumlu" @click="ekle( () => { dialog_acik=false; })">Evet</div>
      <div class="soru button olumsuz">Hayır</div>
    </template>
  </ModalComponent>
</template>

<style scoped>


span.uyari {
  font-size: 9pt;
  color: orangered;
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


.satir {
  display: flex;
  flex-direction: column;
  padding: 10px 150px;
}

.bilesen {
  display: flex;
  width: 100%;
  margin-bottom: 15px;
}

.bilesen > textarea {
  height: 150px;

}

.bilesen svg {
  padding: 10px;
  background: var(--menu-arkaplan);
  color: var(--menu-yazirengi);
  min-width: 50px;
  text-align: center;
}

.girdi {
  width: 100%;
  padding: 10px;
  outline: none;
  border: none;
}


.bilesen > .girdi:focus {
  border: 2px solid var(--menu-arkaplan);
}
</style>