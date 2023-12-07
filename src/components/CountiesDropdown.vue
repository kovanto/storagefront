<template>
  <select class="form-select" aria-label="Maakond">
    <option selected value="0">Vali maakond</option>
    <option v-for="county in counties" :key="county.countyId" :value="county.countyId">{{county.countyName}}</option>

  </select>
</template>


<script>
export default {
  name: 'CountiesDropdown',

  data(){
    return{
      selectedCountyId: 0,
      counties: [
        {
          countyId: 0,
          countyName: ''
        }
      ]
    }
  },
  methods: {
      getCounties() {
        this.$http.get("/location/counties")
            .then(response => {
              this.counties = response.data
            })
            .catch(error => {
              const errorResponseBody = error.response.data
            })
      },
    },
  mounted() {
    this.getCounties()
  }
}
</script>