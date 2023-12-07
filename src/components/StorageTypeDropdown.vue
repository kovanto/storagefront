<template>

  <select class="form-select" aria-label="Tüüp">

    <option selected value="0">Vali tüüp</option>
    <option v-for="type in types" :key="type.typeId" :value="type.typeName">{{type.typeName }}</option>

  </select>
</template>
<script>
export default {
  name: 'StorageTypeDropdown',

  data(){
    return{

      selectedType: 0,
      types: [
        {
          typeId: 0,
          typeName: ''
        }
      ]

    }
  },
  methods: {
    getTypes () {
      this.$http.get("/storage/types")
          .then(response => {
            this.types = response.data
          })
          .catch(error => {
            //const errorResponseBody = error.response.data
          })
    },

  },
  mounted(){
    this.getTypes()
  }
}
</script>