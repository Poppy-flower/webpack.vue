/**
 * Created by mahenan on 2017/10/19.
 */
import Vue from 'vue'
import UserPosts from "./vue/UserPosts.vue"
import UserProfile from "./vue/UserProfile.vue"
import VueRouter from "vue-router"
import Vuex from 'vuex'
import a from "./vue/a.vue"
import b from "./vue/b.vue"
import './index.css'
// import '../common/rem.js'

import app from "./vue/app.vue"
import index from "./vue/index.vue"

Vue.use(VueRouter);
Vue.use(Vuex);
//全局注册vue-router和vuex

//----------->vue-router<---------------
const store = new Vuex.Store({
    strict: true,//加入了严格模式，可以监听无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
                 //不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
    state: {//类似于一个data的集合，可以暴露给外面访问,叫做===》状态
        count: 0,
        index:100
    },
    mutations: {
        increment (state) {//可以传入state（状态）作为第一个参数
            state.count++;
        },
        indexAdd(state,payLoad){//可以传入载荷作为第二个参数，一般是一个对象，可以理解为是一个函数的参数
           state.index+=payLoad.count;
        },
        alert(){
            console.log('xixihaha');
        }
    },
    actions:{
        alert(context){
            context.commit("alert");
        }
    },
    getters:{//相当于state的计算属性，同样可以暴露给外面
        data(state){//state作为第一个参数
            return state.count+200;
        },
        data2(state,getters){ //getters作为第二个参数，但是state必须做为第一个参数，即使不使用
            return getters.data+200;
        },
        data3(state,getters){ //可以返回一个函数暴露给外面。传参进去可以按需查找state下面的变量
            return function (id) {
                return getters.data2+id;
            }
        }
    }
});

// store.state.count=100; //不推荐的写法，追踪不到状态的改变

// store.commit('indexAdd',{count2:200});//尽量使用这种显式的提交改变store中的状态，不要直接改变状态

store.commit({count:300,type:'indexAdd'});//将整体都作为载荷传递进去，但是mutations的处理不变
//执行mutations


store.dispatch("alert");
//执行actions

console.log("store.state.==>>",store.state.count) // -> 1
console.log("store.state.index",store.state.index);
//取store下面的状态

console.log(store.getters.data);
console.log(store.getters.data2);
//取store下面的getters





//----------->vuex<-----------
const router = new VueRouter({
    // scrollBehavior (to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition
    //     } else {
    //         return { x: 0, y: 0 }
    //     }
    // },
    // 切换路由的时候。会回到页面的顶部
    routes:[
        {   path: '/app/:id',
            // component: app,
            name:'app',
            components: {
                default: app,
                view1: a,
                view2: b
            },
            //添加props可以将路由的参数作为组件的属性传入子组件，解耦，不那么依赖this.$route.params.id了
            //有命名视图的时候,必须为每个命名视图添加是否作为组件属性传入
            props:{
                default: true,
                view1: true,
                view2: true
            },
            children: [
                //嵌套路由
                {
                    // 当 /app/:id/profile 匹配成功，
                    // UserProfile 会被渲染在 app 的 <router-view> 中
                    path: 'profile',
                    component: UserProfile
                },
                {
                    // 当 /app/:id/posts 匹配成功
                    // UserPosts 会被渲染在 app 的 <router-view> 中
                    path: 'posts',
                    component: UserPosts
                }
            ]
        },
        {
            path: '/index',
            component: index,
            name:'index'
        }
    ]
});

router.afterEach((to, from) => {
    console.log(from);
    console.log(to);
});
//路由守卫也是个很重要的功能，可以取到路由变化的各种时间节点


// new Vue({
//     el: '.app',
//     router,
//     components: {app}
// })

new Vue({
    router,//注册vue-router到所有组件
    store//注册vuex到所有组件
}).$mount('.vue');

