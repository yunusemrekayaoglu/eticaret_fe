import MagazaMenuComponent from "@/bilesenler/veri/MagazaMenuComponent.vue";
import {createRouter, createWebHashHistory} from "vue-router";
import BosMenu from "@/bilesenler/ortak/BosMenu.vue";
import MagazaEklemeComponent from "@/bilesenler/veri/MagazaEklemeComponent.vue";
import UrunMenuComponent from "@/bilesenler/veri/UrunMenuComponent.vue";
import UrunEklemeComponent from "@/bilesenler/veri/UrunEklemeComponent.vue";
import MusteriMenuComponent from "@/bilesenler/veri/MusteriMenuComponent.vue";
import MusteriEklemeComponent from "@/bilesenler/veri/MusteriEklemeComponent.vue";


export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', component: BosMenu},
        {
            path: '/magaza',
            component: MagazaMenuComponent,
            children:
            [
                {
                    path: 'ekle',
                    component: MagazaEklemeComponent
                }
            ]
        },
        {
            path: '/urun',
            component: UrunMenuComponent,
            children:
                [
                    {
                        path: 'ekle',
                        component: UrunEklemeComponent
                    }
                ]
        },

        {
            path: '/musteri',
            component: MusteriMenuComponent,
            children:
                [
                    {
                        path: 'ekle',
                        component: MusteriEklemeComponent
                    }
                ]
        },

        {
            path: '/alis_hareketleri',
            component: AlisHareketleriMenuComponent,
            children:
                [
                    {
                        path: 'ekle',
                        component: AlisHareketleriEklemeComponent
                    }
                ]
        },



    ]
})

