<template>
  <h1>Minu broneeringud</h1>
  <div class="container text-center">
    <div class="row" v-for="storageInfo in storageInfos" :key="storageInfo.userId">
      <div class="col col-3">
        <img :src="storageInfo.imageData" class="img-fluid img-thumbnail" width="400">
      </div>
      <div class="col col-6">

      </div>
      <div class="col col-3">
        <div class="row"></div>
        <div class="row"></div>
      </div>
    </div>
    <button @click="navigateToAllLocationsView" type="submit" class="btn btn-outline-dark float-end">Vaata pakkumisi</button>
  </div>

</template>

<script>

import router from "@/router";

export default {
  name: "MyOrders",
  components: {},
  data() {
    return {
      orderInfos: [{
        orderId: 0,
        storageId: 0,
        startDate: '',
        endDate: '',
      }],
      storageInfos: [{
        storageId: 0,
        storageName: '',
        storagePrice: 0,
        description: '',
        imageData: ''
      }]
    }

  },

  methods: {
    navigateToAllLocationsView() {
      router.push({name: 'allLocationsRoute'})
    },
  }
}
</script>
