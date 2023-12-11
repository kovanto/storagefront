<template>
  <div>
    <h1>Minu laod</h1>

    <div class="container text-center">
      <div class="row" v-for="storageInfo in storageInfos" :key="storageInfo.userId">
        <div class="col col-3">
          <img :src="storageInfo.imageData" class="img-fluid img-thumbnail" width="400">
        </div>
        <div class="col col-6">
          <h3>{{ storageInfo.storageName }}</h3>
          {{ storageInfo.description }}
          <br>
          {{ storageInfo.storagePrice }} €/kuu
        </div>
        <div class="col col-3">
          <div class="row"></div>
          <button type="submit" class="btn btn-outline-dark mb-3">Muuda</button>
          <div class="row"></div>
          <button type="submit" class="btn btn-danger">Kustuta</button>
        </div>
      </div>
      <button @click="addNewStorage" type="submit" class="btn btn-outline-dark float-end">Lisa uus rendipind</button>
    </div>
  </div>

</template>

<script>
import AllLocationsView from "@/views/AllLocationsView.vue";
export default {
  name: "MyStoragesView",
  components: {AllLocationsView},

  data() {
    return {
      roleName: '',
      storageInfos: [
        {
          storageId: 0,
          userId: 0,
          storageName: '',
          storagePrice: 0,
          description: '',
          imageData: ''
        }
      ]
    }
  },

  methods: {

    getUserStorages(userId) {
      this.$http.get("/mystorages", {
        params: {
          userId: sessionStorage.getItem('userId')

        }
          }
      ).then(response => {
        this.storageInfos = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    getUserId() {
      this.userId = sessionStorage.getItem('userId')
    },

  },
  mounted() {
    this.getUserStorages()
  }
}
</script>


