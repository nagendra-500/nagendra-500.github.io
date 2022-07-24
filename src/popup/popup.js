import Vue from 'vue';
import App from './App';

import router from './router';

// Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Get Mixin
import { mixinMinds } from './mixins/mixin';
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.mixin(mixinMinds);

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
