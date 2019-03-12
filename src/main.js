import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
import VueAxios from "vue-axios";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

window._ = require("lodash");
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Mint);
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
