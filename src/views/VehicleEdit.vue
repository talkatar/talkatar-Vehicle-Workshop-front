<template>
  <section v-if="vehicle" class="vehicle-edit">
    <h2 class="title">{{vehicle.company}} {{vehicle.model}}</h2>
    <section class="details">
      <div v-if="vehicle.wheels">
        <span>Air pressure:</span>
        {{averageAirPressure}}%
      </div>

      <div v-if="vehicle.currFuelQuantity">
        <span>Current fuel quantity:</span>
        {{vehicle.currFuelQuantity}} Liters <span >({{100*(this.vehicle.currFuelQuantity/this.vehicle.tankCapacity)}}% capacity)</span>
      </div>
      <div v-if="vehicle.currBatteryLife">
        <span>Current battery life :</span>
        {{vehicle.currBatteryLife}} Hours<span >  ({{100*(this.vehicle.currBatteryLife/this.vehicle.maxBatteryLife)}}% capacity)</span>
      </div>
    </section>

    <el-form  v-if="!carFinishedRepair" class="form">
      <div class="form-container">
        <label>

      <div v-if="vehicle.currBatteryLife&&vehicle.currBatteryLife<vehicle.maxBatteryLife">
            <el-input
              type="number"
              v-model="repair.updatedBatteryLife"
              placeholder="Charge your vehicle"
              min="1"
              :max="maxCharging"
              require
            />
          </div>

          <div v-if="vehicle.currFuelQuantity&&vehicle.currFuelQuantity<vehicle.tankCapacity">
            <el-input
              type="number"
              v-model="repair.updatedFuelQuantity"
              placeholder="Fuel your vehicle"
              min="1"
              :max="maxFuel"
              require
            />
          </div>

          <div v-if="averageAirPressure<100">
            <el-input
              type="number"
              v-model="repair.updatedAirQuantity"
              placeholder="Set your air pressure"
              min="1"
              :max="maxAirPress"
              require
            />
          </div>
        </label>

        <el-button  @click="updateVehicle" type="primary">Repair</el-button>
      </div>
      </el-form>

      <div class="eyal-song"  v-if="isEyalSong">We are working! Meanwhile enjoy Eyal Golan's music</div>
      <div class="working"  v-if="loading">We are working!</div>
    <VueSpinner v-if="loading" class="spinner" size="90"  />

    <div class="car-ready" v-if="isCarReady&&vehicle.repairStatus !== 'Ready'">The repair is finished! But the vehicle is'nt ready yet </div>
    <div class="car-ready" v-if="vehicle.repairStatus === 'Ready'">The Vehicle is ready! </div>

    
    <div class="container-back-btn">
      <el-button class="back-btn"  v-if="!loading">
      <router-link to="/explore">Back</router-link>
    </el-button>
</div>
    <div class="img-container">
      <img class="first-img"
        src="https://res.cloudinary.com/dm72lanye/image/upload/v1687464019/bmeoojqdgciwpqgbrnfe.jpg"
        alt="#"
      />
      <img
        src="https://res.cloudinary.com/dm72lanye/image/upload/v1687464019/hwrrw6n706wuj7gx0ycv.jpg"
        alt="#"
      />
    </div>
  </section>
</template>

<script>
import { gigService } from "../services/gig.service.local.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { getActionUpdateVehicle } from "../store/vehicle.store.js";
import {VueSpinner} from 'vue3-spinners';

export default {
  data() {
    return {
      vehicle: null,
      repair: {
        licenseNum:null,
        updatedBatteryLife: null ,
        updatedFuelQuantity: null ,
        updatedAirQuantity: null ,
      },
      isCarReady:false,
      loading: false,
      audioInstance :null,
      songs:[
       'https://res.cloudinary.com/dm72lanye/video/upload/v1687697647/ftaeul2cjxhjq5wvb3dy.mp3',
        'https://res.cloudinary.com/dm72lanye/video/upload/v1687550629/tdpkogtxyylarrg9r2vl.mp3'
      ],
      isEyalSong:false

    };
  },
  created() {
     this.loadVehicle()
    },

  beforeUnmount(){
    this.stopMusic()
  },

  methods: {

    loadVehicle(){
    const { vehicleId } = this.$route.params
   const garage = this.$store.getters.garage
    this.vehicle = garage.vehicles.find(vehicle => vehicle._id === vehicleId)
},
       
    async updateVehicle() {

  if (
  ((this.vehicle.currBatteryLife&&this.vehicle.wheels) &&(!this.repair.updatedAirQuantity&&this.averageAirPressure!==100 || !this.repair.updatedBatteryLife&&this.vehicle.currBatteryLife<this.vehicle.maxBatteryLife))
  ||
  ((this.vehicle.currFuelQuantity&&this.vehicle.wheels) && (!this.repair.updatedAirQuantity&&this.averageAirPressure!==100 || !this.repair.updatedFuelQuantity&&this.vehicle.currFuelQuantity<this.vehicle.tankCapacity))
  ||
  this.vehicle.currBatteryLife&&!this.vehicle.wheels &&(!this.repair.updatedBatteryLife&&this.vehicle.currBatteryLife<this.vehicle.maxBatteryLife)
  )
 {
  showErrorMsg("Must complete all details");
  return;
}

      try {
        this.loading = true
        this.isCarReady=false
        this.repair.licenseNum=this.vehicle.licenseNum
       this.playSong()
         showSuccessMsg("Vehicle was entered to a repair");
        this.vehicle=await this.$store.dispatch(getActionUpdateVehicle(this.repair))
          this.loading = false
          this.isCarReady=true
          this.isEyalSong=false
          this.stopMusic()
          this.repair= {
        updatedBatteryLife: null ,
        updatedFuelQuantity: null ,
        updatedAirQuantity: null ,
      }

      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot enter vehicle to a repair")
      }
    },
    playSong(){
      const randomIndex = Math.floor(Math.random() * this.songs.length)
    const audio = new Audio()
    audio.src = this.songs[randomIndex]
    this.audioInstance = audio;
    audio.play()
    if(!randomIndex) this.isEyalSong=true
    },

    stopMusic() {
    if (this.audioInstance) {
    this.audioInstance.pause()
    this.audioInstance.currentTime = 0
  }}},

  computed: {

    averageAirPressure() {
      if (this.vehicle.wheels) {
        const wheels = this.vehicle.wheels;
      const totalAirPressure = wheels.reduce((sum, wheel) => sum + wheel.currAirPress, 0)
      const totalMaxAirPressure = wheels.reduce(
        (sum, wheel) => sum + wheel.maxAirPress, 0)
      const averageAirPressure = ( 100 *(totalAirPressure / totalMaxAirPressure)).toFixed(0);
      return +averageAirPressure;
      }
      else return
    },

    maxCharging() {
      return parseFloat(this.vehicle.maxBatteryLife - this.vehicle.currBatteryLife).toFixed(1)
    },

    maxFuel() {
      return this.vehicle.tankCapacity - this.vehicle.currFuelQuantity;
    },

    maxAirPress() {
      return this.vehicle.wheels[0].maxAirPress-this.vehicle.wheels[0].currAirPress
    },

    carFinishedRepair(){
    if(this.vehicle.repairStatus==="Ready")return true
    else return false
   }
  },
  components: {
    VueSpinner,
  },
  }
</script>
<style>
</style>