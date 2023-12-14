<template>

  <select class="form-select" aria-label="Maakond" v-bind="selectedCountyId" @change="emitChangedCountyId">

    <option disabled value="0">Vali maakond</option>
    <option v-for="county in counties" :key="county.countyId" :selected="county.countyId===selectedCountyId">
      {{ county.countyName }}
    </option>

  </select>
</template>


<script>
export default {
  name: 'CountiesDropdown',
  props: {
    selectedCountyId: 0
  },
  data () {
    return {
      counties: []
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

    emitChangedCountyId () {
      this.$emit('event-selected-county-change', Number(this.selectedCountyId))
    },
  },


  mounted () {
    this.getCounties()
  }
}
</script>