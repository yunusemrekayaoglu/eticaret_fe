<script setup>


import {temaDukkaniKullan} from "@/dukkanlar/temaDukkani";
import {storeToRefs} from "pinia";

const tema_dukkani = temaDukkaniKullan();
const {secili_tema} = storeToRefs(tema_dukkani);

</script>

<template>
<div class="alt_bilgi">
  Seçili Tema {{ secili_tema }}
</div>
</template>

<style scoped>

.alt_bilgi {
  flex-grow: 2;
  background-color: var(--alt-bilgi-arkaplan);
  color: var(--alt-bilgi-yazirengi);
}
</style>