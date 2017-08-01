import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './Home.vue'
import WeatherForecast from './WeatherForecast.vue'
import AirQuality from './AirQuality.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home
}, {
  path: '/forecast',
  component: WeatherForecast
}, {
  path: '/airquality',
  component: AirQuality
}]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
