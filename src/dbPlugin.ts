/* tslint:disable */

import { db } from './db';

export default {
  install(Vue: any) {
    // Add Vue instance methods by attaching them to Vue.prototype.
    Vue.prototype.$db = db;
  },
};
