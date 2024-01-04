<template>
  <div class="uyari" :class="tur" v-if="gorunur">
    <div> {{metin}}</div>
  </div>
</template>
<script setup>


import {ref} from "vue";

const props = defineProps([
   'metin', 'tur', 'zaman'
]);

const emits = defineEmits(['sureBitti'])

const gorunur = ref(true)

setTimeout(function () {
  gorunur.value = false;
  emits('sureBitti');
}, props.zaman);

</script>
<style scoped>

div.uyari {
  width: 100%;
  height: 50px;
  background-color: lightcoral;
  margin: 5px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', 'sans-serif';
  font-size: 11px;
  box-shadow: 4px 4px 5px lightblue;
}

div.uyari.hata {
  background-color: lightcoral;
}

div.uyari.bilgi {
  background-color: lightblue;
}

</style>