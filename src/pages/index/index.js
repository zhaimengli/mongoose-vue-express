import Vue from "vue"
import VueRouter from "vue-router"
import ElementUI  from "element-ui"
import routes from "./router/index"
import FastClick from "fastclick"
import Index from "./component/index.vue"
import http from "../../common/http"

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.$http=http
const router=new VueRouter({
    routes
})
FastClick.attach(document.body)

new Vue({
    router,
    render:h=>h(Index)
}).$mount("#app")