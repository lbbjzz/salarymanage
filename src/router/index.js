import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login')
  },
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home/Home')
      },
      {
        path: '/import_data',
        name: 'ImportData',
        component: () => import('../views/salaryManage/importData/ImportData')
      },
      {
        path: '/Class',
        name: 'class',
        component: () => import('../views/Profile/ClassManage/ClassManage')
      },
      {
        path: '/department',
        name: 'department',
        component: () => import('../views/Profile/DepartmentManage/DepartmentManage')
      },
      {
        path: '/employee',
        name: 'employee',
        component: () => import('../views/Profile/EmployeeManage/EmployeeManage')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
