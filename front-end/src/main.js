import { createApp } from 'vue'
import App from './App.vue'
import './main.css';
import * as VueRouter from 'vue-router';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import ShoppingCartPage from './pages/ShoppingCartPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_z7rW-ijEym9_6pp4OCfl1Q9UrdXzK74",
  authDomain: "shaun-wassel-vue.firebaseapp.com",
  projectId: "shaun-wassel-vue",
  storageBucket: "shaun-wassel-vue.appspot.com",
  messagingSenderId: "1063006078161",
  appId: "1:1063006078161:web:602dd5521be3315214b1f0"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
    .use(VueRouter.createRouter({
        history: VueRouter.createWebHistory(process.env.BASE_URL),
        routes: [{
            path: "/cart",
            component: ShoppingCartPage,
        }, {
            path: "/products",
            component: ProductsPage,
        }, {
            path: "/products/:productId",
            component: ProductDetailPage,
        }, {
            path: "/",
            redirect: "/products"
        }, {
            path: "/:pathMatch(.*)*",
            component: NotFoundPage
        }]
    }))
    .mount('#app')
