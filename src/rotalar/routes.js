import MagazaMenuComponent from "@/bilesenler/veri/MagazaMenuComponent.vue";
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import BosMenu from "@/bilesenler/ortak/BosMenu.vue";
import MagazaEklemeComponent from "@/bilesenler/veri/MagazaEklemeComponent.vue";
import UrunMenuComponent from "@/bilesenler/veri/UrunMenuComponent.vue";
import UrunEklemeComponent from "@/bilesenler/veri/UrunEklemeComponent.vue";
import MusteriMenuComponent from "@/bilesenler/veri/MusteriMenuComponent.vue";
import MusteriEklemeComponent from "@/bilesenler/veri/MusteriEklemeComponent.vue";
import AlisHareketleriMenuComponent from "@/bilesenler/veri/AlisHareketleriMenuComponent.vue";
import AlisHareketleriEklemeComponent from "@/bilesenler/veri/AlisHareketleriEklemeComponent.vue";
import SatisModeliEklemeComponent from "@/bilesenler/veri/SatisModeliEklemeComponent.vue";
import SatisModeliMenuComponent from "@/bilesenler/veri/SatisModeliMenuComponent.vue";
import MagazaListeComponent from "@/bilesenler/veri/MagazaListeComponent.vue";
import UrunListeComponent from "@/bilesenler/veri/UrunListeComponent.vue";
import MusteriListeComponent from "@/bilesenler/veri/MusteriListeComponent.vue";
import AlisHareketleriListeComponent from "@/bilesenler/veri/AlisHareketleriListeComponent.vue";
import SatisModeliListeComponent from "@/bilesenler/veri/SatisModeliListeComponent.vue";


export const router = createRouter({
    history: createWebHistory(),
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
                },
                {
                    path: 'liste',
                    component: MagazaListeComponent
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
                    },
                    {
                        path: 'liste',
                        component: UrunListeComponent
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
                    },
                    {
                        path: 'liste',
                        component: MusteriListeComponent
                    }
                ]
        },

        {
            path: '/urun_alis',
            component: AlisHareketleriMenuComponent,
            children:
                [
                    {
                        path: 'ekle',
                        component: AlisHareketleriEklemeComponent
                    },
                    {
                        path: 'liste',
                        component: AlisHareketleriListeComponent
                    }
                ]
        },

        {
            path: '/urun_satis',
            component: SatisModeliMenuComponent,
            children:
                [
                    {
                        path: 'ekle',
                        component: SatisModeliEklemeComponent
                    },
                    {
                        path: 'liste',
                        component: SatisModeliListeComponent
                    },
                ]
        },



    ]
})

