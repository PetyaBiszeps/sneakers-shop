import './assets/main.css';

import {createApp} from 'vue';
import App from './App.vue';

import {createRouter, createWebHistory} from 'vue-router';

import {autoAnimatePlugin} from "@formkit/auto-animate/vue";

import Home from "@/pages/Home.vue";
import Favourites from "@/pages/Favourites.vue";
import Profile from "@/pages/Profile.vue";

const app = createApp(App);

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/favourites', name: 'Favourites', component: Favourites},
    {path: '/profile', name: 'Profile', component: Profile},
]

const router = createRouter({
    history: createWebHistory(), routes
})

app
    .use(router)
    .use(autoAnimatePlugin)
    .mount('#app');