import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
export const LoginRoute: RouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
        title: '登录',
    },
};

export const constantRouter: any[] = [LoginRoute];

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRouter
})

export default router
