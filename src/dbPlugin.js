

import { db } from './db';

export default {
  install(Vue) {
    // Add Vue instance methods by attaching them to Vue.prototype.
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$db = db;
  },
};
