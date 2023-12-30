import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import {router} from "@/rotalar/routes";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faBasketShopping, faCalendar, faCircleUser,
    faHeading,
    faLocationPin,
    faNoteSticky,
    faPerson,
    faPhone,
    faQuestion,
    faTag,
    faTurkishLiraSign
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add([faBasketShopping,
             faLocationPin,
             faPhone,
             faPerson,
             faQuestion,
             faNoteSticky,
             faTurkishLiraSign,
             faHeading,
             faTag,
             faCircleUser,
             faCalendar])


const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');


// createApp(App).use(createPinia()).mount('#app')
