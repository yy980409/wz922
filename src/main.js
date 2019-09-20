import Vue from 'vue'
import App from './App'
import router from './router'
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
new Vue({
	el: '#app',
	router,
	store,
    axios,
	template: '<App/>',
	components: { App }
})
