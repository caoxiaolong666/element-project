import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

// 解除element的重复点击侧边栏的报错提示
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login")
  }
]

const router = new VueRouter({
  routes
})

export default router
