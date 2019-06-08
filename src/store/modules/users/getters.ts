/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { GetterTree } from 'vuex';
import { IState }     from './types';
import { RootState }  from '../../types';

export const getters: GetterTree<IState, RootState> = {
  users: (state) => state.users,
};
