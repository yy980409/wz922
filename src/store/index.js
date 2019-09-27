import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex);

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
    count:  window.localStorage.getItem('count')==null?0:window.localStorage.getItem('count'),
    user : {
	    name:window.localStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(window.localStorage.getItem('user' || '[]')).username,
        role:window.localStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(window.localStorage.getItem('user' || '[]')).roles[0].name,
    },
    router:[]
};

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	},
    increment (state) {
        window.localStorage.setItem('count', ++state.count);
    },
    clear (state){
	    state.count=0;
        window.localStorage.removeItem('count');
    },
    login(state,user){
        state.user.name=user.username;
        state.user.role=user.roles[0].name;
        window.localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state){
        window.localStorage.removeItem('user');
        state.router=[];
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
    logout({commit}){
        commit('logout');
        location.reload()
}
};

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
