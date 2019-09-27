import Vue from 'vue'
import App from './App'
import router, {initMenu} from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
    /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
    ak: 'HRj42cpubWpqT9zCnM86UVFi4rjK0tDw'
});
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

router.beforeEach((to, from, next)=> {
        if(store.state.router.length > 0){
            // console.log('普通跳转')
            next();
            return;
        }
        if (to.path === '/') {
            next();
            return;
        }
        var name = store.state.user.name;
        if (name === '未登录') {
            console.log('未登录跳转')
            next('/');
        } else {

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

