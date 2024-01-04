<script setup>

</script>

<template>
<div class="menu">
  <a href="#">Anasayfa</a>
  <router-link to="/magaza">Mağaza Bilgileri</router-link>
  <router-link to="/urun">Ürün Bilgileri</router-link>
  <router-link to="/siparis">Siparişler</router-link>
  <router-link to="/musteri">Müşteriler</router-link>
  <router-link to="/urun_alis">Alış İşlemleri</router-link>
  <router-link to="/urun_satis">Satış İşlemleri</router-link>
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