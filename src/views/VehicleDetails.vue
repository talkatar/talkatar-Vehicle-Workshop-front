<template>
  <section v-if="vehicle" class="vehicle-details">
    <h2>{{vehicle.company}} {{vehicle.model}}</h2>
    <section class="detail">
      <div>
        <span>Vehicle type:</span>
        {{vehicle.type}}
      </div>
      <div>
        <span>License number:</span>
        {{vehicle.licenseNum}}
      </div>

      <div v-if="vehicle.licenseType">
        <span>License type:</span>
        {{vehicle.licenseType}}
      </div>

      <div>
        <span>Energy:</span>
        {{vehicle.energyPerc}}%
      </div>

      <div v-if="vehicle.wheels">
        <span>Air pressure:</span>
        {{averageAirPressure}}%
      </div>

      <div>
        <span>Repair price:</span>
        {{ calcPrice}}
      </div>

      <div>
        <span>Repair status:</span>
        {{vehicle.repairStatus}}
      </div>

      <div>
        <span>Remain Repairs:</span>
        {{vehicle.remainRepairs}}
      </div>

      <div v-if="vehicle.numOfDoors">
        <span>Number of doors:</span>
        {{vehicle.numOfDoors}}
      </div>

      <div v-if="vehicle.color">
        <span>Color:</span>
        {{vehicle.color}}
      </div>

      <div v-if="vehicle.fuelType">
        <span>Fuel type:</span>
        {{vehicle.fuelType}}
      </div>

      <div v-if="vehicle.currFuelQuantity">
        <span>Current fuel quantity:</span>
        {{vehicle.currFuelQuantity}}
      </div>

      <div v-if="vehicle.tankCapacity">
        <span>Tank capacity:</span>
        {{vehicle.tankCapacity}}
      </div>

      <div v-if="vehicle.currBatteryLife">
        <span>Current battery life:</span>
        {{vehicle.currBatteryLife}}
      </div>

      <div v-if="vehicle.maxBatteryLife">
        <span>Max battery life:</span>
        {{vehicle.maxBatteryLife}}
      </div>

      <div v-if="vehicle.isDrivenDangerGoods">
        <span>Existense of danger goods:</span>
        {{vehicle.isDrivenDangerGoods}}
      </div>

      <div v-if="vehicle.rearChargerCapacity">
        <span>Rear Charger capacity:</span>
        {{vehicle.rearChargerCapacity}}
      </div>

      <div v-if="vehicle.engineCapacity">
        <span>Engine capacity:</span>
        {{vehicle.engineCapacity}}
      </div>

      <div v-if="vehicle.numOfEngines">
        <span>Number of engines:</span>
        {{vehicle.numOfEngines}}
      </div>

      <div v-if="vehicle.controlInterface">
        <div>
          <span>Control interface:</span>
          <p class="control-interface">{{vehicle.controlInterface}}</p>
        </div>
      </div>
    </section>

    <div class="img-container">
      <img :src="vehicle.imgUrl" />
    </div>

    <el-button>
      <router-link to="/explore">Back</router-link>
    </el-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      vehicle: null
    };
  },
  computed: {
    averageAirPressure() {
      const wheels = this.vehicle.wheels;
      const totalAirPressure = wheels.reduce((sum, wheel) => sum + wheel.currAirPress, 0)
      const averageAirPressure = ((100 * (totalAirPressure / wheels.length))/this.vehicle.wheels[0].maxAirPress).toFixed(0)
      return averageAirPressure
    },

    calcPrice() {
      if (!this.vehicle.repairPrice) return this.vehicle.repairPrice
      else return this.vehicle.repairPrice.toFixed(1)
    }
  },

  async created() {
    const { vehicleId } = this.$route.params
    const vehicle = this.$store.getters.garage.vehicles.find(vehicle => vehicle._id === vehicleId)
    this.vehicle = { ...vehicle }
  }
}
</script>

