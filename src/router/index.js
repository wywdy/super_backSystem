import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Login from '@/views/Login.vue'

const routes = [
  {path:'/',redirect:"/login"},
  {path:'/login',name:"Login",component:Login},
  {path:'/home',name:"Home",component:()=>import('@/views/Home.vue'),
   children:[
       {path:'',name:"Welcome",component:()=>import('@/components/Welcome.vue')},
       {path:'/welcome',name:"Welcome",component:()=>import('@/components/Welcome.vue')},
       {path:"userlist",name:"UserList",component:()=>import("@/components/UserList.vue")},
       {path:"roleslist",name:"RolesList",component:()=>import('@/components/RolesList.vue')},
       {path:"limitlist",name:"LimitList",component:()=>import('@/components/LimitList.vue')},
       {path:"productify",name:"product",component:()=>import('@/components/product.vue')},
       {path:"params",name:"Params",component:()=>import('@/components/Params.vue')},
       ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
       if(to.path==="/login"){
          return next()
       }
       const tokenStr=sessionStorage.getItem("token1")
       if(!tokenStr){
         return next('/login')
       }else {
         next()
       }

})

export default router
