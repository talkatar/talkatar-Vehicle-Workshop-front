import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import VehicleIndex from './views/VehicleIndex.vue'
import VehicleDetails from './views/VehicleDetails.vue'
import VehicleEdit from './views/VehicleEdit.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/explore',
    name: 'VehicleIndex',
    component: VehicleIndex
  },
  {
    path: '/vehicle/edit/:vehicleId?',
    component: VehicleEdit
  },
  {
    path: '/vehicle/:vehicleId',
    component: VehicleDetails
  },
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

