<script setup>

</script>

<template>
<div class="menu">
  <router-link to="/magaza">Mağaza Bilgileri</router-link>
  <a href="#">Ürün Bilgileri</a>
  <a href="#">Tedarikçiler</a>
  <a href="#">Müşteriler</a>
  <a href="#">Alış İşlemleri</a>
  <a href="#">Satış İşlemleri</a>
</div>
</template>

<style>
.menu {
  overflow: hidden;
  background-color: var(--menu-arkaplan);
  color: var(--menu-yazirengi);
}

.menu a {
  float: left;
  display: block;
  color: var(--menu-yazirengi);
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
}

.menu a:hover {
  background-color: var(--menu-arkaplan-uzerinde);
  color: var(--menu-yazirengi-uzerinde);
}


.menu a.router-link-active {
  background-color: var(--menu-arkaplan-uzerinde);
  color: var(--menu-yazirengi-uzerinde);
}
</style>