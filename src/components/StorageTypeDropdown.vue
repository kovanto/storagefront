<template>

  <select class="form-select" aria-label="Tüüp" v-bind="selectedTypeId" @change="emitChangedTypeId">

    <option  disabled value="0">Vali tüüp</option>
    <option v-for="type in types" :key="type.typeId" :selected="type.typeId===selectedTypeId">{{type.typeName }}</option>

  </select>
</template>
<script>
export default {
  name: 'StorageTypeDropdown',

  props:{
    selectedTypeId: Number
  },

  data(){
    return{

      types: [{
        typeId:0,
        typeName:''
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

    emitChangedTypeId(){
      this.$emit('event-selected-type-change', Number(this.selectedTypeId))
    }

  },
  mounted(){
    this.getTypes()
  }
}
</script>