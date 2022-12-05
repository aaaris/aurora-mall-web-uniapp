import App from './App'
import uView from './uni_modules/vk-uview-ui';
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue';
// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from './config/http.interceptor.js'
// http接口API集中管理引入部分
import httpApi from './api/http.api.js'
import * as Pinia from 'pinia';
export function createApp() {
	const app = createSSRApp(App)
	// 使用Pinia
	app.use(Pinia.createPinia());
	// 使用 uView UI
	app.use(uView)
	// 使用 http 拦截器
	app.use(httpInterceptor)
	// 使用 api 统一管理
	app.use(httpApi)
	return {
		app,
		Pinia
	}
}
// #endif
