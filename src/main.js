import Vue from 'vue';
import App from './App';
import router from './router'; 
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import 'lib-flexible';
import './style/css/public/public.css';
import { Waterfall } from 'vant';

Vue.use(Waterfall);
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
});
