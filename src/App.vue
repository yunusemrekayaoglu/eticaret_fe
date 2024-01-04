<script setup>
import BaslikBileseni from "@/bilesenler/BaslikBileseni.vue";
import MenuBileseni from "@/bilesenler/MenuBileseni.vue";
import IcerikBileseni from "@/bilesenler/IcerikBileseni.vue";
import AltBilgiBileseni from "@/bilesenler/AltBilgiBileseni.vue";
import {temaDukkaniKullan} from "@/dukkanlar/temaDukkani";
import {storeToRefs} from "pinia";
import Tema_secici from "@/bilesenler/ortak/tema_secici.vue";
import YukleniyorBileseni from "@/bilesenler/ortak/YukleniyorBileseni.vue";
import UyariBileseni from "@/bilesenler/ortak/UyariBileseni.vue";



const tema_dukkani = temaDukkaniKullan();
const {secili_tema} = storeToRefs(tema_dukkani);




</script>

<template>
  <div class ="kapsayici" :class="secili_tema">
    <BaslikBileseni />
    <MenuBileseni />
    <IcerikBileseni />
    <AltBilgiBileseni />
    <Tema_secici />
    <YukleniyorBileseni />
    <UyariBileseni />

  </div>

</template>

<style scoped>



.kapsayici {
  display: flex;
  flex-direction: column;
}



</style>
