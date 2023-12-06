<template>
  <div>
      <div class="contents" v-for="storageInfo in storageInfos" >
        <img @click="navigateToStorageDetailsView(storageInfo.storageId)" :src="storageInfo.imageData" class="img-fluid img-thumbnail" width="400">
        <div @click="navigateToStorageDetailsView(storageInfo.storageId)">{{ storageInfo.storageName}}</div>
        <div> {{ storageInfo.storagePrice + " €/kuu" }}</div>
      </div>
  </div>

</template>

<script>
import router from "@/router";

export default {
  name: "AllLocationsView",

  data() {
    return {
      storageInfos: [
        {
          storageId: 0,
          storageName: '',
          imageData: '',
          storagePrice: 0
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

    navigateToStorageDetailsView(storageId) {
      router.push({name: 'storageDetailsRoute', query: {storageId: storageId}})
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


