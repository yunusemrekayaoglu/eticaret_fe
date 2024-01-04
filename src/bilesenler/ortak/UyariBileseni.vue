<script setup>

import {ref} from "vue";
import UyariMesajiBileseni from "@/bilesenler/ortak/UyariMesajiBileseni.vue";
import {uyariDukkaniKullan} from "@/dukkanlar/uyariStore";
import {storeToRefs} from "pinia";

const uyariDukkani = uyariDukkaniKullan();

const {uyarilar, suresiBitenler} = storeToRefs(uyariDukkani);

const {temizle} = uyariDukkani;

</script>

<template>
<Teleport to="body" v-if="uyarilar.length>0">
  <div class="uyari_listesi">
    <UyariMesajiBileseni :metin="uyari.mesaj"
                         :tur="uyari.tur"
                         :zaman="3000"
                         :key="index"
                         @sure-bitti="()=>{suresiBitenler.push(index);temizle();}"
                         v-for="uyari in uyarilar"/>
  </div>
</Teleport>
</template>

<style scoped>

div.uyari_listesi {
  width: 25vw;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
}


</style>