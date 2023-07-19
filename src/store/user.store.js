import { userService } from '../services/user.service'

export const userStore = {
    state: {
        loggedinUser: null,
    },
    getters: {
        loggedinUser({ loggedinUser }) { return loggedinUser },
    },

    mutations: {
        setLoggedinUser(state, { user }) {
            state.loggedinUser = user
        },

    },
    actions: {
        async login({ commit }, { userCred }) {
            try {
                const user = await userService.login(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            }
            catch (err) {
                console.log('Invalid username or password', err)
                throw new Error('Invalid username or password');
            }
        },

        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
    }
}