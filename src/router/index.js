import Vue from "vue";
import Router from "vue-router";
import { routers, mobileRouters } from "./router";
import store from "@/store/store";
import api from "@/axios/api";
import NProgress from "nprogress";
import { getToken } from "../libs/token";
import { MessageBox } from "element-ui";

let routerConfig = {};
let flag = false;
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
    flag = true;
    break;
  }
}
if (flag) {
  routerConfig = {
    routes: mobileRouters,
    mode: "history"
  };
} else {
  routerConfig = {
    routes: routers,
    mode: "history"
  };
}

export const router = new Router(routerConfig);

router.beforeEach((to, from, next) => {
  NProgress.start();
  const needAuth = to.matched.some(
    record => record.meta.requiresAuth && record.meta
  );
  // 本地有token 已登陆
  if (getToken()) {
    if (to.name === "home") {
      // if (from.name === null) {
      //   next({ path: "/composite/user" });
      // } else {
      next();
      // }
    } else {
      // 如果有用户信息 直接跳转
      if (store.state.user !== null) {
        next();
      } else {
        api
          .getNewInfo()
          .then(res => {
            const data = res.data;
            if (data.result === 1) {
              store.commit("updateUser", data.data);
              next();
            }
          })
          .catch(err => {
            const res = err.response;
            if (res && res.status === 401) {
              store.commit("loggedOut");
              if (flag) {
                if (needAuth) {
                  next({ name: "home" });
                } else {
                  next();
                }
              } else {
                MessageBox.alert("已退出，请重新登录", "已退出", {
                  type: "warning"
                }).finally(() => {
                  if (needAuth) {
                    next({ name: "home" });
                  } else {
                    next();
                  }
                  window.location.reload(true);
                });
              }
            }
          });
      }
    }
  } else {
    if (needAuth) {
      next({
        name: "home",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  }
});

router.afterEach(to => {
  NProgress.done();
  window.document.title = "发卡去-自动发卡平台-" + to.meta.title;
  // 发卡去-自动发卡平台-
  window.scrollTo(0, 0);
});
