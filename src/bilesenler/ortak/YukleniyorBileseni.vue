<script setup>

import {yukleniyorDukkaniKullan} from "@/dukkanlar/yukleniyorStore";
import {storeToRefs} from "pinia";

const yukleniyorDukkani = yukleniyorDukkaniKullan();

const {yukleniyor} = storeToRefs(yukleniyorDukkani);



</script>

<template>
<Teleport to="body" v-if="yukleniyor">
  <div class="yukleniyor">
    <div class="animasyon"></div>
  </div>
</Teleport>
</template>

<style scoped>

div.yukleniyor {
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  bottom: 0;
  z-index: 2;
}

div.animasyon {
  position: relative;
  width: 250px;
  height: 250px;

  left: calc(50% - 125px);
  top: calc(50% - 125px);

  border: lightgray 20px solid;
  border-top: lightgreen 20px solid;
  border-radius: 50%;

  animation: yukleme_donus 0.8s linear infinite;
}

@keyframes yukleme_donus {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>