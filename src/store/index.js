/**
* Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
* Use of this source code is governed by a BSD-style license that can be
* found in the LICENSE file.
*/

import Vue          from 'vue';
import Vuex         from 'vuex';

// Modules
import users        from './modules/users';
import repositories from './modules/repositories';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    repositories,
  },
});
