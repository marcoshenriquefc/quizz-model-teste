import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import EventPage from "../pages/EventPage.vue";
import QuestionsPage from "../pages/QuestionsPage.vue";
import StartQuestionPage from "../pages/StartQuestionPage.vue";


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage,
    },
    {
        path: '/event',
        name: 'Event Page',
        component: EventPage,
    },
    {
        path: '/event/:id',
        name: 'Event Individual Page',
        component: EventPage,
    },

    {
        path: '/event/:id/:categoryId',
        name: 'Question Page',
        component: StartQuestionPage,
    },
    {
        path: '/question/:id/:categoryId',
        name: 'Question Individual Page',
        component : QuestionsPage,
    }
];;

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;