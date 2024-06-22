import {createRouter, createWebHistory} from "vue-router";
import {ElMessage} from "element-plus";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: () => import('../pages/IndexPage.vue'),
            children: [
                {
                    path: '',
                    name: 'welcome-login',
                    component: () => import('../pages/welcome/LoginPage.vue')
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import("../pages/welcome/RegisterPage.vue")
                }
            ],
            meta: {
                auth: false
            }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../pages/HomePage.vue'),
            meta: {
                auth: true
            }
        }
    ]
})
router.beforeEach((to, from, next) => {
    if(to.meta.auth && !localStorage.getItem("token")){
        next("/")
        ElMessage.error("请先登录")
    }else{
        next()
    }
})
export default router