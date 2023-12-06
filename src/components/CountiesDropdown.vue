<template>
  <select class="form-select" aria-label="Maakond">
    <option selected value="0">Vali maakond</option>
    <option value="1">One</option>

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
  }
}
</script>