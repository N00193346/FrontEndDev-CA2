import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VuePaginate from "vue-paginate";

import 'material-design-icons-iconfont/dist/material-design-icons.css'

import { BootstrapVue } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import vuetify from './plugins/vuetify'
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.use(VuePaginate);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
