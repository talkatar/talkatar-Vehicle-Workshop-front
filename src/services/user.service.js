// import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { store } from '../store/store'
import { showSuccessMsg } from './event-bus.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    getLoggedinUser,
    saveLocalUser,
}

window.userService = userService

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    const user = await httpService.post('auth/login', userCred)
    console.log('user',user);
    if (user) {
        return saveLocalUser(user)
    }

}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    return await httpService.post('auth/logout')
}


function saveLocalUser(user) {
    user = {_id: user._id, fullname: user.fullname,phoneNumber: user.phoneNumber}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}




