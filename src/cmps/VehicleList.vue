<template>
  <section class="vehicle-list" v-if="vehicles.length">
    <ul>
      <li v-for="vehicle in vehicles" :vehicle="vehicle" :key="vehicle._id">
        <VehiclePreview :vehicle="vehicle" @removeVehicle="$emit('removeVehicle', $event)" />
      </li>
    </ul>
  </section>
</template>

<script>
import VehiclePreview from "./VehiclePreview.vue";

export default {
  name: "VehicleList",
  props: ["vehicles"],

  methods: {
    removeVehicle(vehicleId) {
      this.$emit("removeVehicle", vehicleId);
    }
  },
  components: {
    VehiclePreview
  }
};
</script>

