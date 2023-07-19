<template>
  <div class="container home">

    <section class="form-filter-section">
      <div v-if="(isGarageSubmitted)||Object.keys(garage).length ">
        <h1>Filter your vehicles</h1>
        <VehicleFilter @setFilterBy="setFilterBy"></VehicleFilter>
      </div>

      <el-form class="garage-details-form" v-if="!isGarageSubmitted&&!Object.keys(garage).length ">
        <h1>Set Mical's garage details</h1>

        <label>
          <el-input
            type="number"
            v-model="newGarage.numOfWorkers"
            placeholder="Enter a number of workers"
            required
            min="0"
            :max="maxWorkers"
                      />
        </label>
        <label>
          <el-input
            type="number"
            v-model="newGarage.numOfFuelStations"
            placeholder="Enter a number of fuel stations"
            required
            min="0"
          />
        </label>
        <label>
          <el-input
            type="number"
            v-model="newGarage.numOfInflationStations"
            placeholder="Enter a number of inflation stations"
            min="0"
            required
          />
        </label>
        <label>
          <el-input
            type="number"
            v-model="newGarage.numOfChargingStations"
            placeholder="Enter a number of charging stations"
            required
            min="0"
          />
        </label>

        <el-button type="primary" @click="setGarage">Submit</el-button>
      </el-form>

      <el-form class="insert-vehicle" v-else>
        <h1>Park your vehicle in the garage</h1>
        <label>
          <el-input
            type="text"
            v-model="vehicle.lisenceNum"
            placeholder="Enter a lisence number"
            required
          />
        </label>
        <label>
          <el-input
            type="text"
            v-model="vehicle.company"
            placeholder="Enter a company name"
            required
          />
        </label>
        <el-button type="primary" @click="insertVehicle">Submit</el-button>
      </el-form>
    </section>
    <VehicleList v-if="vehicles" :vehicles="vehicles" @removeVehicle="removeVehicle"></VehicleList>
    <div v-if="!garage || !garage.vehicles || !garage.vehicles.length">
      <h1 class="no-vehicles">There are no vehicles in the garage</h1>
      <img
        class="no-vehicles-img"
        src="https://res.cloudinary.com/dm72lanye/image/upload/v1687342702/cvcbybnzdj0rilkozdnr.jpg"
        alt
      />
    </div>
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import {getActionRemoveGig,} from "../store/gig.store"
import { getActionRemoveVehicle } from "../store/vehicle.store"
import VehicleList from "../cmps/VehicleList.vue";
import VehicleFilter from "../cmps/VehicleFilter.vue";

export default {
  data() {
    return {
      isGarageSubmitted: false,
      vehicle: {
        lisenceNum: "",
        company: ""
      },

      garage: {},
      newGarage: {},

    }
  },

  computed: {

    loggedInUser() {
      return this.$store.getters.loggedinUser
    },

    vehicles() {
      return this.$store.getters.garage.vehicles
    },

    maxWorkers() {
      return navigator.hardwareConcurrency || 0
    }

  },

   async created() {
    try{
      await this.$store.dispatch({ type: "loadGarage" })
    const garage = this.$store.getters.garage
    if (garage) this.garage = garage
    }
    catch (err) {
        console.log(err)
        showErrorMsg("Error loading garage");
      }
  
    //   this.garage = this.$store.getters.garage
    //  this.$store.dispatch({ type: "loadGarage" })
    // .then(() => {
    //   this.garage = this.$store.getters.garage
    // })
  },
  methods: {
  
    async setGarage() {
      this.isGarageSubmitted = true
      this.$store.dispatch({ type: "addGarage", garage: { ...this.newGarage } })
    },

    async insertVehicle() {
      if (!this.vehicle.lisenceNum === "" || this.vehicle.company === "") {
        showErrorMsg("Must complete all details")
        return;
      }
      const { fullname, phoneNumber } = this.loggedInUser
      this.$store.dispatch({type: "insertVehicle",vehicle: { ...this.vehicle, fullname, phoneNumber } })
        .then(() => {
          this.vehicle.lisenceNum = ""
          this.vehicle.company = ""
          this.garage = this.$store.getters.garage;
        })
        .catch(err => {
          showErrorMsg(err);
        })
    },

    async removeVehicle(vehicleId) {
      try {
        const vehicles = this.$store.getters.garage.vehicles
        const vehicle = vehicles.find(vehicle => vehicle._id === vehicleId)
        await this.$store.dispatch(getActionRemoveVehicle(vehicleId))
        if(vehicle.repairPrice){
        showSuccessMsg(
        `Thank you and good bye. Our service cost $${vehicle.repairPrice.toFixed(1)}`
        )
        }   
        else   showSuccessMsg(
          `Thank you and good bye`
        ); 
      } catch (err) {
        console.log(err)
        showErrorMsg("Cannot take back the vehicle");
      }
    },
    async setFilterBy(filterBy) {
      await this.$store.dispatch({ type: "loadGarage", filterBy })
      this.garage = this.$store.getters.garage
    },

  },

  components: {
    VehicleList,
    VehicleFilter
  },

}
</script>
