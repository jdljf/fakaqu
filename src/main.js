import Vue from "vue";
import App from "./App.vue";
import { router } from "./router/index";
import store from "./store/store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/icon/iconfont.css";
import "./assets/icons/iconfont.css";
import axios from "axios";
import "nprogress/nprogress.css";
import i18n from "./i18n/i18n";
import device from "./viewport";
import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);

// import _ from "lodash";
// require("./mock/index.js");

window.log = console.log.bind(console);
Vue.config.productionTip = false;
Vue.use(ElementUI);
// Vue.use(axios);
Vue.prototype.$http = axios;

new Vue({
  created() {
    this.checkDevice();
  },
  methods: {
    checkDevice() {
      const userAgentInfo = navigator.userAgent;
      const Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          const myBody = document.getElementsByTagName("body")[0];
          myBody.style.overflowX = "hidden";
          myBody.style.minWidth = "";
          device(640, 640);
          const FastClick = require("fastclick");
          FastClick.attach(document.body);
          break;
        } else {
          const myBody = document.getElementsByTagName("body")[0];
          myBody.style.minWidth = "1300px";
        }
      }
    }
  },
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
