
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'vehicle'

export const vehicleService = {
    query,
    getById,
    save,
    insertVehicle
}
window.cs = vehicleService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}


async function getById(vehicleId) {
    return httpService.get(`vehicle/${vehicleId}`)
}

async function insertVehicle(vehicle) {
    return httpService.post('vehicle', vehicle)
}


async function save(vehicle) {
    var savedVehicle
    if (vehicle._id) {
        // savedVehicle = await storageService.put(STORAGE_KEY, vehicle)
        savedVehicle = await httpService.put(`vehicle/${vehicle._id}`, vehicle)

    } else {
        // Later, owner is set by the backend
        // vehicle.owner = userService.getLoggedinUser()
        // savedVehicle = await storageService.post(STORAGE_KEY, vehicle)
        savedVehicle = await httpService.post('vehicle', vehicle)
    }
    return savedVehicle
}

// async function addVehicleMsg(vehicleId, txt) {
//     const savedMsg = await httpService.post(`vehicle/${vehicleId}/msg`, {txt})
//     return savedMsg
// }








