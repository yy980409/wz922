import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const test = r => require.ensure([], () => r(require('@/page/test')), 'test');
const EmpBasic = r => require.ensure([], () => r(require('@/page/EmpBasic')), 'EmpBasic');
const singleStatus = r => require.ensure([], () =>r(require('@/page/singleStatus')), 'singleStatus');
const HomeMap = r => require.ensure([], () =>r(require('@/components/HomeMap')), 'HomeMap');
const lineMap = r => require.ensure([], () =>r(require('@/components/lineMap')), 'lineMap');
const tableList = r => require.ensure([], () =>r(require('@/components/tableList')), 'tableList');
const tempearatureHumidity = r => require.ensure([], () =>r(require('@/page/tempearatureHumidity')), 'tempearatureHumidity');
const temperatureSingle = r => require.ensure([], () =>r(require('@/page/temperatureSingle')), 'temperatureSingle');
const Signin = r => require.ensure([], () =>r(require('@/page/Signin')), 'Signin');
const devices = r => require.ensure([], () =>r(require('@/page/devices')), 'devices');
const user = r => require.ensure([], () =>r(require('@/page/user')), 'user');
const routes = [
	// {
	// 	path: '/',
	// 	component: login
	// },
    {
        path: '/',
        component: Signin,
        meta: ['', ''],
    },
	{
		// path: '/manage',
        path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: HomeMap,
			meta: [],
		},{
			path: '/addShop',
			component: addShop,
			meta: ['添加数据', '添加商铺'],
		},{
			path: '/addGoods',
			component: addGoods,
			meta: ['添加数据', '添加商品'],
		},{	path: '/test',
            component: test,
            meta: ['设备状态', '所有设备状态'],
        },{
            path: '/HomeMap',
            component: HomeMap,
            meta: [],
        },{
            path: '/EmpBasic',
            component: EmpBasic,
            meta: ['222', '333'],
        },{
            path: '/singleStatus',
            component: singleStatus,
            meta: ['设备状态', '单设备状态'],
        },{
            path: '/lineMap',
            component: lineMap,
            meta: ['设备状态', '单设备状态'],
        },{
            path: '/tableList',
            component: tableList,
            meta: ['设备状态', '单设备状态'],
        },{
            path: '/tempearatureHumidity',
            component: tempearatureHumidity,
            meta: ['设备状态'],
        },{
            path: '/temperatureSingle',
            component: temperatureSingle,
            meta: ['设备状态', '单设备状态'],
        },{
            path: '/devices',
            component: devices,
            meta: ['添加数据', '添加商铺'],
        },{
            path: '/user',
            component: user,
            meta: ['添加数据', '添加商铺'],
        },

		]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
