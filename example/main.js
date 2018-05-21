import Vue from 'vue'
import App from './App.vue'
import plugin from './../src';
import { makeReduxStore } from './../src';
import logger from 'redux-logger';

import reduce from './reducer';

let store = makeReduxStore(reduce, [logger]);

Vue.use(plugin);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
