<template>
  <div>
      <div class="contents" v-for="storageInfo in storageInfos" >
        <img :src="storageInfo.imageData" class="img-fluid img-thumbnail" width="400">
        <div>{{ storageInfo.storageName }}</div>
      </div>
  </div>

</template>

<script>
export default {
  name: "AllLocationsView",

  data() {
    return {
      storageInfos: [
        {
          storageId: 0,
          storageName: '',
          imageData: ''
        }
      ]
    }
  },

  methods: {
    getStorages() {
      this.$http.get("/locations")
          .then(response => {
            this.storageInfos = response.data
          })
          .catch(error => {
            const errorResponseBody = error.response.data
          })
    },

  },

  mounted() {
    this.getStorages()
  }
}
</script>

<style>
div.contents {
  display: inline-block;
  width: 25%;
}
</style>


