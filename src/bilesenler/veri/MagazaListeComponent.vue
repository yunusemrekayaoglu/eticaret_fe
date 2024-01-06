<script setup>
import {onMounted, ref} from "vue";
import {magazaDukkaniKullan} from "@/dukkanlar/magazaDukkani";
import {storeToRefs} from "pinia";

const magazaDukkani = magazaDukkaniKullan();

const {ara} = magazaDukkani;

const {magazalar} = storeToRefs(magazaDukkani);



onMounted( () => {
  ara();
});

const gorunum = ref('liste');



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
    </div>
  </div>
</div>
</template>

<style scoped>

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
  flex: 0 0 25%;
}

</style>