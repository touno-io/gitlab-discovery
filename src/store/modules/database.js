/**
* Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
* Use of this source code is governed by a BSD-style license that can be
* found in the LICENSE file.
*/

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint-disable no-param-reassign */

import router from '../../router';

const DB_INIT = [
  'users/INIT',
  'repositories/INIT',
];

const state = {
  user: {
    name: '',
    email: '',
    avatar_url: '',
  },
  theme: 0, // 0 is the default light theme
  lastCloneLocation: null,
  idUser: null,
  signUpProgress: 0,
};

const getters = {
  idUser: state => state.idUser,
  signUpProgress: state => state.signUpProgress,
  user: state => state.user,
};

const mutations = {
  SET_CONFIG(state, config) {
    if (config.user) {
      state.user = JSON.parse(config.user);
    }
    state.idUser = config.idUser;
    state.theme = config.theme;
    state.lastCloneLocation = config.lastCloneLocation;
    state.signUpProgress = config.signUpProgress;
  },
  UPDATE_SIGNUP_PROGRESS(state) {
    const newValue = parseInt(state.signUpProgress, 10) + 1;
    state.signUpProgress = newValue;
    localStorage.setItem('sign_up_progress', newValue);
  },
};

const actions = {
  INIT(context) {
    context.dispatch('LOAD_CONFIG');
    context.dispatch('LOAD_DB');
    console.log('Database init...');
  },
  LOAD_CONFIG({ commit }) {
    const config = {
      user: localStorage.getItem('user'),
      idUser: localStorage.getItem('id_user'),
      theme: localStorage.getItem('theme') || 0, // 0 is the default light theme
      lastCloneLocation: localStorage.getItem('last_clone_location'),
      signUpProgress: localStorage.getItem('sign_up_progress') || 0,
    };

    commit('SET_CONFIG', config);
  },
  LOAD_DB(context) {
    DB_INIT.forEach(action => context.dispatch(action));
  },
  UPDATE_SIGNUP_PROGRESS({ commit }) {
    commit('UPDATE_SIGNUP_PROGRESS');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
