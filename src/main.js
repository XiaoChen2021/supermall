import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Fastclick from 'fastclick'
import vauLazyload from 'vue-lazyload'

import toast from '@/components/common/toast'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

Vue.use(ElementUI)
Vue.use(toast)

//解决移动端300ms延迟
// Fastclick.attach(document.body)

//使用图片懒加载插件
Vue.use(vauLazyload, {
	loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
	router,
	store
}).$mount('#app')
