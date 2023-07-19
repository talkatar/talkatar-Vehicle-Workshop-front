<template>

  <header class="flex justify-content ">
    <div class= "logo">
      <RouterLink to="/">
        <span role="img" aria-label="logo"><img src="https://res.cloudinary.com/dm72lanye/image/upload/v1687211950/x6v04xmlpiqxnacuv9rd.png"></span>
      </RouterLink>
        </div>

    <nav class="flex align-center justify-content space-between">
      <RouterLink to="/explore" v-if="loggedInUser">My vehicles</RouterLink>
      <div class="side-btn-cont" v-if="!loggedInUser">
          <el-button  class="side-menu-link sign" @click="showLoginModal">Log In</el-button>
        </div>
        <div class="side-btn-cont" v-if="loggedInUser">
          <el-button class="side-menu-link sign" @click="logout">Log out</el-button>
        </div>
    </nav>

    <Login v-if="showLogin" @login="login"  @hideLogin="hideLogin"  />

  </header>

</template>
<script>
import Login from "../cmps/Login.vue"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export default {
  data() {
    return {
      showLogin: false,
    }
  },

  methods:{
    async login(userCred) {
  try {
    await this.$store.dispatch({ type: "login", userCred });
    if (this.$store.getters.loggedinUser) {
      this.showLogin = false;
    }
  } catch (err) {
    showErrorMsg(err.message);
  }
},

    logout() {
      this.$store.dispatch({ type: "logout" })
      this.$router.push('/');

    },

    showLoginModal() {
      this.showLogin = true
    },

    hideLogin() {
      this.showLogin = false
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  components: {
    Login,
  }
}
</script>