<template>




  <select class="form-select" aria-label="Maakond">
    <option v-if="countyDetail.countyId > 0" :key="countyDetail.countyId" :value="countyDetail.countyName"></option>

    <option v-else selected value="0">Vali maakond</option>
    <option v-for="county in counties" :key="county.countyId" :value="county.countyName">
      {{county.countyName}}
    </option>

  </select>
</template>


<script>
export default {
  name: 'CountiesDropdown',
props:{
  countyDetail: {
    countyId: 0,
    countyName:'',
  }
},
  data () {
    return {
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
    getCounties () {
      this.$http.get("/location/counties")
          .then(response => {
            this.counties = response.data
          })
          .catch(error => {
            //const errorResponseBody = error.response.data
          })
    },

  },

  mounted () {
    this.getCounties()
  }

}
</script>