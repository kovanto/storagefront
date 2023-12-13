<template>
  <h1>Minu broneeringud</h1>
  <div class="container text-center">
    <div class="row" v-for="orderInfo in orderInfos" :key="orderInfo.customerId">
      <div class="col col-3">
        <img :src="orderInfo.imageData" class="img-fluid img-thumbnail" width="400">
      </div>
      <div class="col col-6">
        <h3>{{ orderInfo.storageName }}</h3>
        {{ orderInfo.description }}
        <div class="row">
          <div class="col">
            <div class="row justify-content-start">{{ orderInfo.storagePrice }} €/kuu</div>
            <div class="row justify-content-start">[Kogumaksumus] €</div>
          </div>
          <div class="col me-3">
          <div class="row justify-content-end"> Rendiperioodi algus {{ orderInfo.startDate }}</div>
          <div class="row justify-content-end"> Rendiperioodi lõpp {{ orderInfo.endDate }}</div>
          </div>
        </div>
      </div>
      <div class="col col-1">
        <div class="row">
        <button type="submit" class="btn btn-outline-dark">Muuda</button>
        </div>
        <div class="row">
        <button type="submit" class="btn btn-outline-danger">Tühista</button>
        </div>
        <div class="form-floating mb-3">
          <input readonly class="form-control-plaintext" disabled>
          <label>{{ orderInfo.status }}</label>
        </div>
      </div>
    </div>
    <button @click="navigateToAllLocationsView" type="submit" class="btn btn-outline-dark float-end">Vaata pakkumisi
    </button>
  </div>

</template>

<script>

import router from "@/router";

export default {
  name: "MyOrders",
  components: {},
  data() {
    return {
      customerUserId: 0,
      orderInfos: [{
        customerId: '',
        storageId: 0,
        storageName: '',
        storagePrice: 0,
        storageDescription: '',
        imageData: '',
        orderId: 0,
        startDate: '',
        endDate: '',
        status: ''
      }],
    }

  },

  methods: {
    navigateToAllLocationsView() {
      router.push({name: 'allLocationsRoute'})
    },

    getCustomerOrders(customerUserId) {
      this.$http.get("/myorders", {
            params: {
              customerUserId: sessionStorage.getItem('userId'),
            }
          }
      ).then(response => {
        this.orderInfos = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

  },
  mounted() {
    this.getCustomerOrders()
  }
}
</script>
