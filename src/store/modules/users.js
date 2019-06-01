/**
* Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
* Use of this source code is governed by a BSD-style license that can be
* found in the LICENSE file.
*/

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint-disable no-param-reassign */

import { dbUsers } from '../../db';

const state = {
  users: [],
};

const getters = {
  users: state => state.users,
};

const mutations = {
  FETCH_USERS(state, users) {
    state.users = users;
  },
  ADD_USER(state, user) {
    state.users.unshift(user);
  },
  REMOVE_USER(state, index) {
    state.users.splice(index, 1);
  },
};

const actions = {
  INIT(context) {
    context.dispatch('FETCH_USERS');
  },
  async FETCH_USERS({ commit }) {
    const users = await dbUsers.users
      .orderBy('created_at')
      .reverse()
      .toArray();

    commit('FETCH_USERS', users);
  },
  async ADD_USER(context, user) {
    let id;
    user.created_at = new Date().toISOString();
    user.updated_at = null;

    try {
      id = await dbUsers.users.add(user);
    } catch (err) {
      console.log('Oops, failed to add user');
      console.log(err);
    }

    context.commit('ADD_USER', user);
    context.dispatch('INIT', null, { root: true });
    context.dispatch('UPDATE_SIGNUP_PROGRESS', null, { root: true });
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('id_user', id);
    console.log(`User added ${id}`);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
