import Vue from "vue";
import Vuex from "vuex";
import { router } from "@/router";
import api from "@/axios/api";
import { getToken, setToken, removeToken } from "../libs/token";
import Cookies from "js-cookie";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    openid: Cookies.get("openid") || "",
    language: Cookies.get("language") || "cn"
  },
  getters: {
    language: state => state.language,
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      Cookies.set("language", language);
    },
    SET_OPENID: (state, openid) => {
      state.openid = openid;
      Cookies.set("openid", openid);
    },
    loggedIn(state, { access_token, info }) {
      store.commit("updateUser", info);
      setToken(access_token);
    },
    loggedOut(state) {
      removeToken();
      localStorage.clear();
      state.user = null;
      router.replace({
        path: "/",
        query: { redirect: router.currentRoute.fullPath }
      });
    },
    updateUser(state, info) {
      state.user = Object.assign({}, state.user, info);
    },
    // changeStatus(state,type) {
    //     state.second_confirm = type;
    // }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit("SET_LANGUAGE", language);
    },
    setOpenId({ commit }, openid) {
      commit("SET_OPENID", openid);
    }
  }
});

export default store;
