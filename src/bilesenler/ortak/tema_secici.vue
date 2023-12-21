<script setup>



import {temaDukkaniKullan} from "@/dukkanlar/temaDukkani";
import {storeToRefs} from "pinia";

const temalar =  [
  {tema_adi: "Açık Renk Teması", tema_class: "acik"},
  {tema_adi: "Koyu Renk Teması", tema_class: "koyu"},
];

const tema_dukkani = temaDukkaniKullan();

const {secili_tema} = storeToRefs(tema_dukkani);



if (window.matchMedia) {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches){
    secili_tema.value = "koyu";
  } else {
    secili_tema.value = "acik";
  }
} else {
  secili_tema.value = "temel";
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  secili_tema.value = event.matches ? "koyu" : "acik";
});
</script>

<template>
  <select name="tema_secici" id="tema_secici" class="tema_secici" v-model="secili_tema">
    <option v-for="tema in temalar" :value="tema.tema_class"> {{  tema.tema_adi  }}</option>
  </select>
</template>

<style scoped>

.tema_secici {
  position: absolute;
  top: 0;
  right: 0;
}

</style>