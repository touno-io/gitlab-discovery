/**
* Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
* Use of this source code is governed by a BSD-style license that can be
* found in the LICENSE file.
*/

// Core
import Vue          from 'vue';
import Vuex         from 'vuex';

// Modules
import database     from './modules/database';
import users        from './modules/users';
import repositories from './modules/repositories';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: database.state,
  getters: database.getters,
  mutations: database.mutations,
  actions: database.actions,

  modules: {
    users,
    repositories,
  },
});

store.dispatch('INIT');
export default store;
