import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  //周鑫路由
  {
    path: '/financial',
    name: 'financial',
    component: () => import('../views/Financial.vue')
  },
  {
    path: '/income',
    name: 'income',
    component: () => import('../views/Income.vue')
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('../views/Payment.vue')
  },
  {
    path: '/storecenter',
    name: 'storecenter',
    component: () => import('../views/Storecenter.vue')
  },
  //黄杰路由
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: () => import('../views/OrderDetail.vue')
  },
  {
    path: '/orderMngDetail',
    name: 'orderMngDetail',
    component: () => import('../views/OrderMngDetail.vue')
  },
  {
    path: '/oderUserDetail',
    name: 'oderUserDetail',
    component: () => import('../views/OderUserDetail.vue')
  },
  
  // 李钰路由
  {
    path: '/bossSystem',
    name: 'bossSystem',
    component: () => import('../views/BossSystem.vue')
  },
  {
    path: '/menumanagement',
    name: 'bossSystem',
    component: () => import('../views/MenuManagement.vue')
  },
  // 李立新路由
  {
    path: '/mindex',
    name: 'mindex',
    component: () => import('../views/Mindex.vue')
  },
  // 陈家坤路由
  {
    path: '/worker',
    name: 'worker',
    component: () => import('../views/Worker.vue')
  },
  {
    path: '/workersalary',
    name: 'workersalary',
    component: () => import('../views/WorkerSalary.vue')
  },
  // 王小明路由
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/wang/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/wang/Register.vue')
  },

  {
    path: '/forgetPass',
    name: 'forgetPass',
    component: () => import('../views/wang/ForgetPass.vue')
  },
  {
    path: '/resetPass',
    name: 'resetPass',
    component: () => import('../views/wang/ResetPass.vue')
  },{
    path: '/admin',
    name: 'admin',
    component: () => import('../views/wang/Administrators.vue')
  },
  {
    path: '/userPage',
    name: 'userPage',
    component: () => import('../views/wang/UserPage.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

/* // 注册全局守卫
// 在访问路由之前进行拦截
router.beforeEach((to, from, next) => {
  // 获取 token，登录的标识
  var token = sessionStorage.getItem("token")

  if(to.meta.auth) { // 判断是否需要权限
    if(token) { // 再次判断是否已经有权限了
      next()
    } else {
      next({ // 没有权限，导向登录页
        path: "/login",
        query: {redirect: to.fullPath} // 记录原本想访问的路由
      })
    }
  } else {
    next() // 想去哪就去哪
  }
}) */


export default router
