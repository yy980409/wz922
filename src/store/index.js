import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import {getAdminInfo} from '@/api/getData'
import VueCookies from 'vue-cookies'
Vue.use(Vuex);

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
    user : {
	    // name:window.localStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(window.localStorage.getItem('user' || '[]')).username,
        // role:window.localStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(window.localStorage.getItem('user' || '[]')).roles[0].name,
        name:$cookies.get("status") == null ? '未登录' : $cookies.get("status").username,
        role:$cookies.get("status") == null ? '未登录' : $cookies.get("status").roles[0].name,
    },
    router:[]
};

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	},
    clear (state){
        state.router=[];
        state.user={
            name:'未登录',
            role:'未登录'
        }
    },
    login(state,user){
        state.user.name=user.username;
        state.user.role=user.roles[0].name;
        $cookies.set("status", user, 0);
        // window.localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state){
        $cookies.remove("status");
        // window.localStorage.removeItem('user');
        state.router=[];
        state.user={
            name:'未登录',
            role:'未登录'
        }
    },
    initMenu(state,routes){
	    state.router = routes;
    }
};

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			if (res.status == 1) {
				commit('saveAdminInfo', res.data);
			}else{
				throw new Error(res.type)
			}
		}catch(err){
			// console.log(err.message)
		}
	},
    logout({commit},str){
        commit('logout');
        // location.reload();
        router.push('/');
        console.log(str);
},
};

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
