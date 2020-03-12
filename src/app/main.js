import Vue from "vue";
import VueRouter from "vue-router";
import App from './App.vue';
import CuadradosMedios from './views/CuadradosMedios.vue';
import ProductosMedios from './views/ProductosMedios.vue';
Vue.use(VueRouter)
const routes =[
  {
    path: "/",
    name: "cuadradosMedios",
    component: CuadradosMedios
  },
  {
    path: "/productosMedios",
    name: "productosMedios",
    component: ProductosMedios
  }
];

const router = new VueRouter({mode: 'history',routes:routes});
new Vue(App)
new Vue (Vue.util.extend({router},App)).$mount('#app'); 

