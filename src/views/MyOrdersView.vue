<template>
  <div>
    <OrdersTable/>
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
