/**
* Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
* Use of this source code is governed by a BSD-style license that can be
* found in the LICENSE file.
*/

/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import { db } from '../../db';

const state = {
  repositories: [],
};

const getters = {
  projects: state => state.repositories,
};

const mutations = {
  ADD_REPOSITORY(state, repo) {
    state.repositories.unshift(repo);
  },
  REMOVE_REPOSITORY(state, index) {
    state.repositories.splice(index, 1);
  },
};

const actions = {
  async ADD_REPOSITORY({ commit }, repo) {
    let id;
    try {
      id = await db.repositories.add(repo);
    } catch (err) {
      console.log('Oops, failed to add repository');
      console.log(err);
    }

    commit('ADD_REPOSITORY', repo);
    console.log(`Repository added ${id}`);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
