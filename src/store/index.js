import Vue from 'vue'
import Vuex from 'vuex'

import app from '@/store/modules/app/app'
import auth from '@/store/modules/app/auth'
import task from '@/store/modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    auth,
    task
  }
})
