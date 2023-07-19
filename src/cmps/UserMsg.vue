
<template>
  <div :class="{active:alive}" class="alert flex" >
    <div class="color-left"></div>
    <section class="alert-content flex align-center">
      <p>{{ msg?.txt }}</p>
    </section>
  </div>
</template>

<script>
import { eventBus, SHOW_MSG } from "../services/event-bus.service"

export default {
  created() {
    eventBus.on(SHOW_MSG, (msg) => {
      this.msg = msg
      var delay =3500
      this.alive = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        this.alive = false
      }, delay)
    })
  },
  data() {
    return {
      alive: false,
      msg: null,
    }
  },
  computed: {
    alertClass() {
      if (!this.msg) return
      return `alert-${this.msg.type}`
    },
  },
}
</script>

