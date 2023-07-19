<template>
  <section class="filter">

    <el-select  @change="setFilterBy('repairStatus', $event)" v-model="filterBy.repairStatus" placeholder="Filter by repair status" style="width: 240px" >
      <el-option value="Waiting">Waiting</el-option>
      <el-option value="On Progress">On Progress</el-option>
      <el-option value="Ready"> Ready</el-option>
      <el-option value="Fuel station">Fuel station</el-option>
      <el-option value="Inflation station">Inflation station</el-option>
      <el-option value="Charging station">Charging station</el-option>
    </el-select>

    <el-select @change="setFilterBy('remainRepairs', $event)" v-model="filterBy.remainRepairs" placeholder="Filter by number of repairs" style="width: 240px" >
      <el-option value="0">No repairs</el-option>
      <el-option value="1">1 repair</el-option>
      <el-option value="2">2 repairs</el-option>
    </el-select>
  </section>
</template>

<script>
export default {
    name: "VehicleFilter",
  data() {
    return {
      filterBy: {
        repairStatus: "",
        remainRepairs:null
      },    
    }
  },
  methods: {
    setFilterBy() {
      this.$emit("setFilterBy", this.filterBy);
    }
  }

}
</script>

