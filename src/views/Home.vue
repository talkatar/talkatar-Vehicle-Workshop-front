<template>
  <section class="container home text-center">
    <section class="banner-main">
      <div class="row">
        <div class="text-bg">
          <div class="welcome flex">
            <span>Welcome</span>
            <span v-if="loggedInUser">{{ loggedInUser }}</span>
          </div>
          <span class="service">Vehicle repair services</span>
          <div class="user-details">Username: talk</div>
          <div class="user-details">Password: 1234</div>
          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,</p>
          <div class="links">
            <RouterLink :to="'/'">More Info</RouterLink>
            <RouterLink :to="'/'">Contact Us</RouterLink>
          </div>
        </div>
        <div class="text_img">
          <img src="../assets/img/car.png" alt="#" />
        </div>
      </div>
    </section>

    <section class="we-do">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="titlepage">
              <h2>What We Do</h2>
              <p>It is a long established fact that a reader will be distracted by</p>
            </div>
          </div>
        </div>

        <section class="container-grid">
          <section class="img-grid">
            <div class="work">
              <img src="../assets/img/img1.png" alt="#" />
              <div class="work-text">
                <h3>
                  Quick repair
                  <br />
                  <span class="blu">Total Service</span>
                </h3>
              </div>
            </div>

            <div class="work">
              <img src="../assets/img/img2.png" alt="#" />
              <div class="work-text">
                <h3>
                  Quick repair
                  <br />
                  <span class="blu">Total Service</span>
                </h3>
              </div>
            </div>

            <div class="work">
              <img src="../assets/img/img3.png" alt="#" />
              <div class="work-text">
                <h3>
                  Quick repair
                  <br />
                  <span class="blu">Total Service</span>
                </h3>
              </div>
            </div>

            <div class="work">
              <img src="../assets/img/img4.png" alt="#" />
              <div class="work-text">
                <h3>
                  Quick repair
                  <br />
                  <span class="blu">Total Service</span>
                </h3>
              </div>
            </div>
          </section>
        </section>
      </div>
      <RouterLink class="read-more" :to="'/'">See More</RouterLink>
    </section>
  </section>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    loggedInUser() {
      const user = this.$store.getters.loggedinUser
      return user ? user.fullname : null
    }
  },
  created() {},
  methods: {}
}
</script>
