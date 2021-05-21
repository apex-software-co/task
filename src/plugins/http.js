
import Http from './../api/Http.js'
import Vue from 'vue';

Vue.use({
  install (Vue) {
    
    let http = new Http({
      baseURL: 'http://localhost:3000/'
    })

    Vue.prototype.$http = http
    Vue.http = http;
  }
})
