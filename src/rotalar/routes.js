import MagazaMenuComponent from "@/bilesenler/veri/MagazaMenuComponent.vue";
import {createRouter, createWebHashHistory} from "vue-router";
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
            path: '/urun_alis',
            component: AlisHareketleriMenuComponent,
            children:
                [
                    {
                        path: 'ekle',
                        component: AlisHareketleriEklemeComponent
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
                    }
                ]
        },



    ]
})

