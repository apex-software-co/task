
import Http from './../api/Http.js'
import Vue from 'vue';

Vue.use({
  install (Vue) {
    
    let http = new Http({
      baseURL: 'http://172.31.3.9:3000/'
    })

    Vue.prototype.$http = http
    Vue.http = http;
  }
})
