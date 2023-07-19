
import { httpService } from './http.service.js'


const STORAGE_KEY = 'garage'

export const garageService = {
    query,
    save,
    getById,
    remove,
    update,
}
window.cs = garageService


async function query(filterBy) {
    return httpService.get(STORAGE_KEY,{ ...filterBy })

}
async function save(garage) {
    return await httpService.post(STORAGE_KEY, garage)

}
async function update(repairDetails) {
   return  await httpService.put(STORAGE_KEY, repairDetails)

}

async function getById(vehicleId) {
    // return storageService.get(STORAGE_KEY, vehicleId)
    return httpService.get(`${STORAGE_KEY}/${vehicleId}`)
}

async function remove(vehicleId) {
    // await storageService.remove(STORAGE_KEY, vehicleId)
    return httpService.delete(`${STORAGE_KEY}/${vehicleId}`)
}



