/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { ActionTree } from 'vuex';
import { IState }     from './types';
import { RootState }  from '../../types';
import { db }         from '../../db';

export const actions: ActionTree<IState, RootState> = {
  INIT(context) {
    context.dispatch('FETCH_USERS');
  },
  async FETCH_USERS({ commit }) {
    const users = await db.users
      .orderBy('created_at')
      .reverse()
      .toArray();

    commit('FETCH_USERS', users);
  },
  async ADD_USER(context, user) {
    let id: number;
    user.created_at = new Date().toISOString();
    user.updated_at = null;

    try {
      id = await db.users.add(user);
      localStorage.setItem('id_user', id.toString());
      context.commit('ADD_USER', user);
      context.dispatch('INIT', null, { root: true });
      context.dispatch('UPDATE_SIGNUP_PROGRESS', null, { root: true });
      console.log(`User added ${id}`);
    } catch (err) {
      console.log('Oops, failed to add user');
      console.log(err);
    }
  },
};
