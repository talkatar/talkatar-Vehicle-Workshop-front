
<template>
  <section class="vehicle-preview">
    <section class="info">

    <h2>{{vehicle.company}} {{vehicle.model}}</h2>
    <div><span>Owner: </span> {{vehicle.fullname}}</div>
    <div><span> Phone number: </span> {{vehicle.phoneNumber}}</div>
    <div><span>Energy: </span>{{enregy}}% </div>  
    <div v-if="vehicle.wheels"> <span>Air pressure: </span>{{averageAirPressure}}%</div>
    <div ><span>Repair price: </span> {{calcPrice}}</div>
    <div><span>Repair status: </span> {{vehicle.repairStatus}}</div>
    <div v-if="vehicle.remainRepairs"><span>Remain Repairs: </span> {{vehicle.remainRepairs}}</div>
    <div v-if="!vehicle.wheels"><span :style="{ opacity: 0 }">hidden content</span></div>
    <div class="img-container"> <img :src="vehicle.imgUrl"></div>

      <div  class="actions">
      <el-button class="el-button"><RouterLink :to="'/vehicle/edit/' + vehicle._id">Start Repair</RouterLink></el-button>
      <el-button class="el-button"> <RouterLink :to="'/vehicle/' + vehicle._id">Details</RouterLink></el-button>
      <el-button @click="onRemove(vehicle._id,vehicle.repairPrice)">Take The Vehicle</el-button>
    </div>

    </section>

  </section>
</template>
  
  <script>
export default {
  name: "VehiclePreview",

  props: ["vehicle"],

  data() {
    return {
    };
  },
  computed: {},
  methods: {
    onRemove(vehicleId) {
      this.$emit("removeVehicle", vehicleId);
    }
  },
  created() {},
  computed: {
    averageAirPressure() 
    {
      const wheels = this.vehicle.wheels
      const totalAirPressure = wheels.reduce(
      (sum, wheel) => sum + wheel.currAirPress, 0 )
      const averageAirPressure = (100*(totalAirPressure / wheels.length)/(this.vehicle.wheels[0].maxAirPress)).toFixed(0)
      return averageAirPressure
    },

    enregy(){
      if(this.vehicle.currFuelQuantity)return (this.vehicle.currFuelQuantity/this.vehicle.tankCapacity)*100
      else return (this.vehicle.currBatteryLife/this.vehicle.maxBatteryLife)*100
    },

    calcPrice(){
    if (!this.vehicle.repairPrice) return this.vehicle.repairPrice
    else return this.vehicle.repairPrice.toFixed(1)
    }}}
</script>
  
  