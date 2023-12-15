<template>
  <h1>Minu broneeringud</h1>
  <CancelOrderModal ref="cancelOrderModalRef" :order-info="orderInfo"
                    @event-order-successfully-cancelled = "handleOrderCancelled"/>
  <div class="container text-center">
    <SuccessAlert :success-message="successMessage" class="justify-content-center"/>
    <div class="row" v-for="orderInfo in orderInfos" :key="orderInfo.customerId">
      <div class="col col-3">
        <img @click="navigateToStorageDetailsView(orderInfo.storageId)" :src="orderInfo.imageData" class="img-fluid img-thumbnail" width="400">
      </div>
      <div class="col col-6">
        <h3>{{ orderInfo.storageName }}</h3>
        {{ orderInfo.description }}
        <div class="row">
          <div class="col">
            <div class="row justify-content-start">{{ orderInfo.storagePrice }} €/kuu</div>
          </div>
          <div class="col me-3">
            <div class="row justify-content-end"> Rendiperioodi algus {{ orderInfo.startDate }}</div>
            <div class="row justify-content-end"> Rendiperioodi lõpp {{ orderInfo.endDate }}</div>
          </div>
        </div>
      </div>
      <div class="col col-1">
        <div class="form-floating mb-3">
          <input readonly class="form-control-plaintext" disabled>
          <label>{{ orderInfo.status }}</label>
        </div>
        <div class="row">
          <button v-if="orderInfo.status === 'Broneeritud'" @click="handleCancelOrder(orderInfo)" type="submit" class="btn btn-outline-danger" style="background-color:#008080; color:#fff" >Tühista</button>
        </div>
      </div>
    </div>
    <button @click="navigateToAllLocationsView" type="submit" class="btn btn-outline-dark float-end" style="background-color:#008080; color:#fff">Vaata pakkumisi
    </button>
  </div>

</template>

<script>

import router from "@/router";
import CancelOrderModal from "@/components/modal/CancelOrderModal.vue";
import SuccessAlert from "@/components/alert/SuccessAlert.vue";

export default {
  name: "MyOrders",
  components: {SuccessAlert, CancelOrderModal},
  data() {
    return {
      isBooked: false,
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
      orderInfo: {
        orderId: 0,
        storageName: ''
      },
      successMessage: ''
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

    handleCancelOrder(orderInfo) {
      this.orderInfo = orderInfo
      this.$refs.cancelOrderModalRef.orderInfo.orderId = orderInfo.orderId
      this.$refs.cancelOrderModalRef.orderInfo.storageName = orderInfo.storageName
      this.$refs.cancelOrderModalRef.openModal()
    },

    handleOrderCancelled(message) {
      this.getCustomerOrders()
      this.successMessage = message
    },

    navigateToStorageDetailsView(storageId) {
      router.push({name: 'storageDetailsRoute', query: {storageId: storageId}})
    },

  },
  mounted() {
    this.getCustomerOrders()
  }
}
</script>
