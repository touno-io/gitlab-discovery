import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: 'Patrick',
    AppConfigBase: {
      theme: null,
      lastCloneLocation: null,
      users: null,
      lastSelectedProjectId: null,
      externalEditor: null,
      ftu: null,
    },
  },
  mutations: {
    UPDATE_THEME(state, payload) {
      state.AppConfigBase.theme = payload;
      localStorage.setItem('theme', payload);
    },
  },
  actions: {
    updateTheme({commit}, payload) {
      commit('UPDATE_THEME', payload);
    },
  },
  getters: {
    theme: (state) => {
      return state.AppConfigBase.theme;
    },
    ftu: (state) => {
      return state.AppConfigBase.ftu;
    },
  },
});
