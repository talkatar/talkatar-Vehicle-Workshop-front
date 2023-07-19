import { gigService } from '../services/gig.service.local'
// import { gigService } from '../services/gig.service'

export function getActionRemoveGig(gigId) {
    return {
        type: 'removeGig',
        gigId
    }
}

export const gigStore = {
    state: {},
    mutations: {},
    actions: {}
}