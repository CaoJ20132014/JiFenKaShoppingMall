import Vue from 'vue';
import Router from 'vue-router';
import { Toast } from 'vant';

/* 登录 */
const login = resolve => require.ensure([], () => resolve(require('@/views/Login/login')), 'login');
/* home */
const index = resolve => require.ensure([], () => resolve(require('@/views/Home/index/index')), 'index');
/* 首页 */
const home = resolve => require.ensure([], () => resolve(require('@/views/Home/home/index')), 'home');
/* 购物车 */
const shopCar = resolve => require.ensure([], () => resolve(require('@/views/Home/shopCar/index')), 'car');
/* 我的 */
const user = resolve => require.ensure([], () => resolve(require('@/views/Home/user/index')), 'user');

Vue.use(Router);

const routes = [{
	path: '/',
	name: 'login',
	component: login
}, {
	path: '/home',
	component: index,
	children: [{
		path: '',
		name: 'home',
		component: home
	}, {
		path: 'user',
		name: 'user',
		component: user
	}, {
		path: 'shopCar',
		name: 'shopCar',
		component: shopCar
	}]
}];

const router = new Router({
	mode: "history",
	routes
});

router.beforeEach((to, from, next) => {
	if (to.fullPath == '/') {
		next();
	} else {
		const toast = Toast.loading({
			duration: 1000,
			forbidClick: true,
			message: '正在加载...',
			mask: true
		});
		setTimeout(() => {
			next();
		}, 1000);
	}
});

router.afterEach( route => {
	
});

export default router;