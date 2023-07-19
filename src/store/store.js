import Vuex from 'vuex'

import { userStore } from './user.store.js'
import{vehicleStore} from './vehicle.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    vehicleStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
