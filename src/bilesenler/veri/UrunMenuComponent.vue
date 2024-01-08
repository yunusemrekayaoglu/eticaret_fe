<script setup>

</script>

<template>
  <div class="urun_menu">
    <div class="alt_menu">
      <router-link to="urun/ekle">Ürün Ekle</router-link>
      <router-link to="urun/liste">Ürün Liste</router-link>
    </div>
    <div class="icerik">
      <router-view> </router-view>
    </div>
  </div>

</template>

<style scoped>

.urun_menu {
  display: flex;
}

.alt_menu {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  width: 20vw;
}

.alt_menu a, .alt_menu a:visited {
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: var(--menu-yazirengi);
}
.alt_menu a:hover {
  background-color: var(--menu-arkaplan-uzerinde);
  color: var(--menu-yazirengi-uzerinde);
}

.icerik {
  width: 80vw;
}

.alt_menu a.router-link-active, alt_menu a:visited.router-link-active {
  background-color: var(--menu-arkaplan-uzerinde);
  color: var(--menu-yazirengi-uzerinde);
}

</style>