import Vue from 'vue'
import App from './App'
import router, {initMenu} from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);
import BaiduMap from 'vue-baidu-map'
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: '8247c4ff267dbf3d70447d844612f0a7',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.StyleObject'],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4'
});
Vue.use(BaiduMap, {
    /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
    ak: 'HRj42cpubWpqT9zCnM86UVFi4rjK0tDw'
});
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
router.beforeEach((to, from, next)=> {
    console.log('from:',from.path);
    console.log('to:',to.path,);
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^');
        if($cookies.get("status")===null){
            console.log("登陆超时");
            store.commit('clear');
        }
        if(store.state.router.length > 0){
            console.log('普通跳转');
            next();
            return;
        }
        if (to.path === '/' ) {
            // if(JSON.parse(window.localStorage.getItem('user' || '[]')) !== null){
            //     next('/manage');
            // }
            next();
            return;
        }
        var name = store.state.user.name;
        if (name === '未登录') {
            console.log('未登录跳转');
            next('/');
        } else {
            console.log("路由导入");
            initMenu(router, store);
            next(to);
            // router.push({path:to.path});
        }
    }
);
new Vue({
	el: '#app',
	router,
	store,
    axios,
	template: '<App/>',
	components: { App }
});

