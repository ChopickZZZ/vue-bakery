/*eslint-disable*/
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

createApp(App)
	.component('font-awesome-icon', FontAwesomeIcon)
	.use(router)
	.use(store)
	.mount('#app')

