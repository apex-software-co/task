
import Http from './../api/Http.js'
import Vue from 'vue';

Vue.use({
  install (Vue) {
    
    let http = new Http({
      baseURL: 'http://52.67.97.40:3000/'
    })

    Vue.prototype.$http = http
    Vue.http = http;
  }
})
