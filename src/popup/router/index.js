import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

Vue.use(VueRouter);

export default new VueRouter({
  routes,
});
