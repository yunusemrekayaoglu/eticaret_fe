<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {computed} from "vue";

const props = defineProps(['acik', 'kapanmaSebebi']);
const emits = defineEmits(['update:acik', 'update:kapanmaSebebi']);

const acikProp = computed({
  get() {
    return props.acik;

  },
  set(value) {
    emits('update:acik', value);
  }
});

const kapanmaSebebiProp = computed({
  get() {
    return props.kapanmaSebebi;

  },
  set(value) {
    emits('update:kapanmaSebebi', value);
  }
});


</script>

<template>
  <Teleport to="body" v-if="acikProp">
    <div class="soru arkaplan" >
      <div class="soru tasiyici" @click="kapanmaSebebiProp='arkaplan';">
      </div>
      <div class="soru pencere">
        <div class="soru baslik">
          <div class="soru metin">
            <slot name="baslik">Onay</slot>
          </div>
          <div class="soru metin kapat" @click="kapanmaSebebiProp='buton';">X</div>
        </div>
        <div class="soru icerik">
          <div class="soru simge">
            <font-awesome-icon icon="fa-solid fa-question" />
          </div>
          <div class="soru sorumetni">
            <slot name="sorumetni"></slot>
          </div>
        </div>
        <div class="soru butonlar">
          <slot name="butonlar">
            <div class="soru buton olumlu">Evet</div>
            <div class="soru buton olumsuz">Hayır</div>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
div.soru.arkaplan {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.soru.tasiyici {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}


div.soru.simge {
  color: #7DCEA0;
  width: 50px;
  height: 50px;
}

div.soru.sorumetni{
  max-width: 20vw;
}

div.soru.simge svg {
  width: 100%;
  height: 100%;
}


div.soru.pencere {
  display: flex;
  background-color: #F7F9F9;
  border-radius: 8px;
  border: thin solid #7B7D7D;
  flex-direction: column;
  font-family: 'Montserrat','sans-serif';
  z-index: 2;
}

div.soru.baslik {
  min-width: 30vw;
  display: flex;
  padding: 5px;
  font-size: 14pt;
  font-weight: bold;
  justify-content: space-between;
}

div.soru.baslik .metin {
  font-weight: bold;
  font-size: 14pt;
}

div.soru.icerik {
  display: flex;
  padding: 5px;
  gap: 5px;
}

div.soru.butonlar {
  display: flex;
  padding: 5px;
  justify-content: space-between;
}

div.soru.butonlar div {
  padding: 10px 10px;
  cursor: pointer;
}

div.soru.metin.kapat {
  cursor: pointer;
}

div.soru.buton {
  border-radius: 5px;
}

div.soru.buton.olumlu {
  background-color: #82E0AA;
  color: white;
}

div.soru.buton.olumlu:hover {
  background-color: #27AE60;
  color: white;
}

div.soru.buton.olumsuz {
  background-color: #D98880;
  color: white;
}
div.soru.buton.olumsuz:hover {
  background-color: #C0392B;
  color: white;
}
</style>