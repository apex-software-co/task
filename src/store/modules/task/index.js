import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})


export default {

    namespaced: true,

    state: () => ({

        task: []

    }),

    mutations: {

    },

    actions: {

    },

    plugins: [vuexLocal.plugin]

}
