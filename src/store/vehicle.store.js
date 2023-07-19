import { vehicleService } from '../services/vehicle.service'
import { garageService } from '../services/garage.service'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";



export function getActionRemoveVehicle(vehicleId) {
    return {
        type: 'removeVehicle',
        vehicleId
    }
}
export function getActionAddVehicle(vehicle) {
    return {
        type: 'addVehicle',
        vehicle
    }
}
export function getActionUpdateVehicle(repairDetails) {
    return {

        type: 'updateVehicle',
        repairDetails
    }
}
export function getActionAddVehicleMsg(vehicleId) {
    return {
        type: 'addVehicleMsg',
        vehicleId,
        txt: 'Stam txt'
    }
}

export const vehicleStore = {
    state: {
        vehicles: [],
        currVehicle: null,
        currGarage: {}
    },
    getters: {
        vehicles({ vehicles }) { return vehicles },
        garage({ currGarage }) { return currGarage },

    },
    mutations: {
        setVehicles(state, { vehicles }) {
            state.vehicles = vehicles
        },
        addVehicle(state, { vehicle }) {
            if (!state.currGarage.vehicles) {
                state.currGarage.vehicles = []
            } state.currGarage.vehicles.push(vehicle)
        },

        addStolenVehicle(state, { vehicle }) {
            state.currGarage.blackList.push(vehicle)
        },

        updateVehicle(state, { vehicle }) {
            const idx = state.currGarage.vehicles.findIndex(g => g._id === vehicle._id);
            state.currGarage.vehicles.splice(idx, 1, vehicle)
        },

        removeVehicle(state, { vehicleId }) {
            state.currGarage.vehicles = state.currGarage.vehicles.filter(vehicle => vehicle._id !== vehicleId)
        },

        setCurrentVehicle(state, { vehicle }) {
            state.currVehicle = vehicle[0]
        },

        setGarage(state, { garage }) {
            if (garage && garage.length > 0) {
                state.currGarage = { ...garage[0] };
            }
        },

    },
    actions: {

        async loadGarage(context, { filterBy }) {
            try {
                const garage = await garageService.query(filterBy)
                context.commit({ type: 'setGarage', garage })
                return garage

            } catch (err) {
                console.log('garageStore: Error in remainTreatsGarage', err)
                throw err
            }
        },

        async addGarage(context, { garage }) {
            try {
                console.log(11);
                const savedGarage = await garageService.save(garage)
                context.commit({ type: 'setGarage', savedGarage })


            } catch (err) {
                console.log('garageStore: Error in addGarage', err)
                throw err
            }
        },

        async insertVehicle(context, { vehicle }) {
            try {
                const returnedData = await vehicleService.insertVehicle(vehicle)
                if (returnedData.error) showErrorMsg(returnedData.error);

                else if (returnedData.stolenVehicle && returnedData.error) {
                    showErrorMsg(returnedData.error)
                    const stolenVehicle = returnedData.stolenVehicle
                    context.commit({ type: 'addStolenVehicle', stolenVehicle })
                }

                else {
                    const vehicle = returnedData.vehicle;
                    context.commit({ type: 'addVehicle', vehicle });
                }
            }
            catch (err) {
                console.log('vehicleStore: Error in insertVehicle', err)
                throw err
            }
        },


        async updateVehicle(context, { repairDetails }) {
            try {
                console.log("store");
                const vehicle = await garageService.update(repairDetails)
                context.commit({ type: 'updateVehicle', vehicle });
                return vehicle
            } catch (err) {
                console.log('vehicleStore: Error in updateVehicle', err)
                throw err
            }
        },

        async loadVehicles(context, { filterBy }) {
            try {
                const vehicles = await vehicleService.query(filterBy)
                context.commit({ type: 'setVehicles', vehicles })
            } catch (err) {
                console.log('vehicleStore: Error in loadVehicles', err)
                throw err
            }
        },

        async removeVehicle(context, { vehicleId }) {
            try {
                await garageService.remove(vehicleId)
                context.commit(getActionRemoveVehicle(vehicleId))
            } catch (err) {
                console.log('vehicleStore: Error in removeVehicle', err)
                throw err
            }
        },

        async setCurrentVehicle({ commit }, { vehicleId }) {
            try {
                const vehicle = await garageService.getById(vehicleId)
                console.log('setCurrentVehicle', vehicle);
                commit({ type: 'setCurrentVehicle', vehicle })
                return vehicle
            }
            catch (err) {
                console.log('vehicleStore: Error in setCurrentVehicle', err)
                throw err
            }
        },
    },
}