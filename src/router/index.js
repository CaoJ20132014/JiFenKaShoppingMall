import Vue from 'vue';
import Router from 'vue-router';
import { Toast } from 'vant';

Vue.use(Router);

const routes = [{
	path: '/login',
	name: 'login',
	component: resolve => require.ensure([], () => resolve(require('@/views/Login/login')), 'login')
}, {
	path: '/home',
	component: resolve => require.ensure([], () => resolve(require('@/views/Home/index/index')), 'index'),
	children: [{
		path: '',
		name: 'home',
		component: resolve => require.ensure([], () => resolve(require('@/views/Home/home/index')), 'home')
	}, {
		path: 'user',
		name: 'user',
		component: resolve => require.ensure([], () => resolve(require('@/views/Home/user/index')), 'user')
	}, {
		path: 'shopCar',
		name: 'shopCar',
		component: resolve => require.ensure([], () => resolve(require('@/views/Home/shopCar/index')), 'car')
	}]
}, {
	path: '/game',
	name: 'game',
	component: resolve => require.ensure([], () => resolve(require('@/views/Game/index')), 'game')
}, {
	path: '/Order/:type',
	name: 'order',
	component: resolve => require.ensure([], () => resolve(require('@/views/Order/allOrder')), 'order')
}, {
	path: '/Detail/:type/:id',
	name: 'goodsDetail',
	component: resolve => require.ensure([], () => resolve(require('@/views/GoodsDetail/goodDetail')), 'detail')
}, {
	path: '/address',
	name: 'address',
	component: resolve => require.ensure([], () => resolve(require('@/views/Address/address')), 'address')
}, {
	path: '/exit',
	name: 'exit',
	component: resolve => require.ensure([], () => resolve(require('@/views/Address/exit')), 'exit')
}, {
	path: '/financ',
	name: 'financ',
	component: resolve => require.ensure([], () => resolve(require('@/views/Financ/index')), 'financ')
}, {
	path: '/list/:type',
	name: 'list',
	component: resolve => require.ensure([], () => resolve(require('@/views/Financ/list')), 'list')
}, {
	path: '/recharge',
	name: 'recharge',
	component: resolve => require.ensure([], () => resolve(require('@/views/Financ/recharge')), 'recharge')
}, {
	path: '/withdrawals',
	component: resolve => require.ensure([], () => resolve(require('@/views/Financ/withdrawals')), 'withdrawals'),
	children: [{
		path: '',
		name: 'Input',
		component: resolve => require.ensure([], () => resolve(require('@/views/Financ/withdrawalsinput')), 'withdrawals')
	}, {
		path: 'cardList',
		name: 'cardList',
		component: resolve => require.ensure([], () => resolve(require('@/views/Financ/cardList')), 'cardList')
	}]
}, {
	path: '/addCard',
	name: 'addCard',
	component: resolve => require.ensure([], () => resolve(require('@/views/Financ/addCard')), 'addCard')
}, {
	path: '/inputInfo',
	name: 'inputInfo',
	component: resolve => require.ensure([], () => resolve(require('@/views/Financ/inputInfo')), 'inputInfo')
}, {
	path: '/cardInfo',
	name: 'cardInfo',
	component: resolve => require.ensure([], () => resolve(require('@/views/Financ/cardInfo')), 'cardInfo')
}, {
	path: '/success/:type',
	name: 'success',
	component: resolve => require.ensure([], () => resolve(require('@/views/Financ/success')), 'success')
}, {
	path: '*',
	redirect: '/login'
}];

const router = new Router({
	mode: "history",
	routes,
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
});

router.beforeEach((to, from, next) => {
	if (to.fullPath == '/') {
		next();
	} else {
		const toast = Toast.loading({
			duration: 300,
			forbidClick: true,
			message: '正在加载...',
			mask: false
		});
		setTimeout(() => {
			next();
		}, 300);
	}
});

router.afterEach( route => {
	
});

export default router;