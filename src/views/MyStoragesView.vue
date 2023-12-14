<template>
  <div>
    <h1>Minu laod</h1>
    <DeleteStorageModal ref="deleteStorageModalRef" :storage-info="storageInfo"
                        @event-storage-successfully-deleted="handleStorageDeleted"/>
    <div class="container text-center">
      <SuccessAlert :success-message="successMessage" class="justify-content-center"/>
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
          <button @click="navigateToStorageDetailsView(storageInfo.storageId)" type="submit"
                  class="btn btn-outline-dark mb-3">Muuda</button>
          <div class="row"></div>
          <button @click="handleDeleteStorage(storageInfo)" type="submit" class="btn btn-outline-danger">Kustuta</button>
        </div>
      </div>
      <button @click="addNewStorage" type="submit" class="btn btn-outline-dark float-end">Lisa uus rendipind</button>
    </div>
  </div>

</template>

<script>
import AllLocationsView from "@/views/AllLocationsView.vue";
import router from "@/router";
import DeleteStorageModal from "@/components/modal/DeleteStorageModal.vue";
import SuccessAlert from "@/components/alert/SuccessAlert.vue";

export default {
  name: "MyStoragesView",
  components: {SuccessAlert, DeleteStorageModal, AllLocationsView},

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
      ],
      storageInfo:
          {
            storageId: 0,
            storageName: '',
          },
      successMessage: ''
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

    handleStorageDeleted(message) {
      this.getUserStorages()
      this.successMessage = message
    },

    navigateToStorageDetailsView(storageId) {
      router.push({name: 'storageDetailsRoute', query: {storageId: storageId}})
    },

    handleDeleteStorage(storageInfo) {
      this.storageInfo = storageInfo
      this.$refs.deleteStorageModalRef.openModal();
      this.$refs.deleteStorageModalRef.storageId = storageInfo.storageId
    },

    addNewStorage(userId) {
      router.push({name: 'storageDetailsRoute', query: {userId: userId}})
    },

  },
  mounted() {
    this.getUserStorages()
  }
}
</script>


