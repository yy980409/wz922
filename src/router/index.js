import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/'
import {visitorR,browserR, controllerR, adminR} from '@/components/routes'
Vue.use(Router);

const Signin = r => require.ensure([], () =>r(require('@/page/Signin')), 'Signin');


console.log(store.state.user.role);

const createRouter = () => new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: Signin,
        meta: ['', ''],
    },],
    strict: process.env.NODE_ENV !== 'production',
});
const router = createRouter();
export function resetRouter () {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher
}


// const router = new Router({
//     // routes,//直接写routes为缩写 同routes:routes
//     strict: process.env.NODE_ENV !== 'production',
// });


export const initMenu = (router, store )=> {
    // console.log('初始化菜单')
     var routes = [];

    if(store.state.user.role==='ROLE_admin'){
        routes = adminR;
    }else if(store.state.user.role==='ROLE_browser'){
        routes = browserR;
    }else if(store.state.user.role==='ROLE_controller'){
        routes = controllerR;
    }else{
        routes = visitorR;
    }
    // console.log(routes);
    router.addRoutes(routes);
    store.commit('initMenu',routes);

}

export default router;
