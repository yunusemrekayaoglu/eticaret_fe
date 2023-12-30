<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ref} from "vue";
import ModalComponent from "@/bilesenler/ortak/ModalComponent.vue";

const urun = ref({
  urun_id: -1,
  urun_kodu:'',
  adi: '',
  fiyati: '',
  aciklama: '',
 

});

const dialog_acik = ref(false)


function urun_bilgilerini_yazdir()
{
  dialog_acik.value = true;
  console.log(urun.value)
}

</script>

<template>
  <div class="data_form">
    <div class="satir">
      <div class="etiket">Ürün Kodu</div>
      <div class="bilesen">
        <font-awesome-icon icon="tag" />
        <input class="girdi" type="text" name="urun_kodu" v-model="urun.urun_kodu"/>
      </div>
    </div>

    <div class="satir">
      <div class="etiket">Ürün Adı</div>
      <div class="bilesen">
        <font-awesome-icon icon="heading" />
        <input class="girdi" name="adi" v-model="urun.adi"/>
      </div>
    </div>

    <div class="satir">
      <div class="etiket">Ürün Fiyatı</div>
      <div class="bilesen">
        <font-awesome-icon icon="turkish-lira-sign" />
        <input class="girdi" type="text" name="fiyati" v-model="urun.fiyati"/>
      </div>
    </div>

    <div class="satir">
      <div class="etiket">Ürün Açıklaması</div>
      <div class="bilesen">
        <font-awesome-icon icon="note-sticky" />
        <textarea class="girdi" name="aciklama" v-model="urun.aciklama"></textarea>
      </div>
    </div>
    <div class="satir">
      <div class="buttoncubugu">
        <div class="button olumlu" @click="urun_bilgilerini_yazdir">Ekle</div>
        <div class="button olumsuz" >İptal</div>
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
  background-color: var(--button-olumlu-arkaplan);
  color: white;
}

div.button.olumlu:hover {
  background-color: var(--button-olumlu-arkaplan-uzerinde);
  color: white;
}

div.button.olumsuz {
  background-color: var(--button-olumsuz-arkaplan);
  color: white;
}
div.button.olumsuz:hover {
  background-color: var(--button-olumsuz-arkaplan-uzerinde);
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