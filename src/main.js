/**
* Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
* Use of this source code is governed by a BSD-style license that can be
* found in the LICENSE file.
*/

import Vue from 'vue';
import App      from './App.vue';
import router   from './router';
import store    from './store';
import i18n     from './locales';
import dbPlugin from './dbPlugin';

Vue.config.productionTip = false;
Vue.use(dbPlugin);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
