<template>
  <section @click="hideLogin" class="backdrop">
    <section @click.stop class="login-modal p30 lh24">
      <form class="flex column align-center m0-32-24" @submit.prevent="login">
        <h1>Login</h1>
        <input type="text" placeholder="Username" v-model="userCred.username" />
        <input type="password" placeholder="Password" v-model="userCred.password" />
        <button class="btn-login-form">Login</button>
      </form>
    </section>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userCred: {
        username: "",
        password: ""
      }
    };
  },
  methods: {

    hideLogin() {
      this.$emit("hideLogin");
    },

    login() {
      let userCred = this.userCred;
      this.$emit("login", userCred);
    }
    
  }
};
</script>
