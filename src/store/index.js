import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  modules: {
    tab
  },
  state: {
    token: '',
    adminId: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setAdminId(state, adminId) {
      state.adminId = adminId
    }
  }
})
