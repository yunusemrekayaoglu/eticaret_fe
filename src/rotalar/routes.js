import MagazaMenuComponent from "@/bilesenler/veri/MagazaMenuComponent.vue";
import {createRouter, createWebHashHistory} from "vue-router";
import BosMenu from "@/bilesenler/ortak/BosMenu.vue";
import MagazaEklemeComponent from "@/bilesenler/veri/MagazaEklemeComponent.vue";


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
    ]
})