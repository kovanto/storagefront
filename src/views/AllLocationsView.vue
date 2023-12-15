<template>
  <ErrorAlert :error-message="errorMessage"/>
  <FilterModal ref="filterModalRef" @event-county-id-and-features-filter-applied="getFilteredStorageLocations"/>
  <div>
    <h1>Pakutavad rendipinnad</h1>
    <div class="container text-center">
      <div class="row mt-3 mb-5 class= text-end">
        <div class="col">
          <font-awesome-icon :icon="['fas', 'filter']" @click="openFilterModal"/>
        </div>
      </div>
    </div>

    <div class="contents" v-for="storageInfo in storageInfos">
      <img @click="navigateToStorageDetailsView(storageInfo.storageId)" :src="storageInfo.imageData"
           class="img-fluid img-thumbnail" width="400" style="width: 100%; height: 100%; object-fit: cover;">
      <div @click="navigateToStorageDetailsView(storageInfo.storageId)" class="text-uppercase" >{{ storageInfo.storageName }}</div>
      <div> {{ storageInfo.storagePrice + " €/kuu" }}</div>
    </div>
  </div>

</template>

<script>
import router from "@/router";
import FilterModal from "@/components/modal/FilterModal.vue";
import FeatureTypesCheckbox from "@/components/FeatureTypesCheckbox.vue";
import countiesDropdown from "@/components/CountiesDropdown.vue";
import ErrorAlert from "@/components/alert/ErrorAlert.vue";

export default {
  name: "AllLocationsView",
  components: {ErrorAlert, FeatureTypesCheckbox, FilterModal},

  data() {
    return {
      errorMessage: '',
      storageInfos: [
        {
          storageId: 0,
          storageName: '',
          imageData: '',
          storagePrice: 0
        }
      ],
      featureTypes: [
        {
          featureId: 0,
          featureName: '',
          isAvailable: false
        }
      ],
      errorResponse: {
        message: '',
        errorCode: 0
      },
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

    openFilterModal() {
      this.$refs.filterModalRef.openFilterModalAndSetData(this.featureTypes)
    },

    getFeatureTypes() {
      this.$http.get("/storage/features")
          .then(response => {
            this.featureTypes = response.data;
            this.setAllFeatureTypesAvailable();

          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },

    setAllFeatureTypesAvailable: function () {
      for (let i = 0; i < this.featureTypes.length; i++) {
        this.featureTypes[i].isAvailable = true
      }
    },


    getFilteredStorageLocations(filteredStorageRequest) {
      this.$http.post("/locations/filtered", filteredStorageRequest
      ).then(response => {
        this.storageInfos = response.data
      }).catch(error => {
        this.handleStoragesNotFound(error)
      })
    },
  },

  handleStoragesNotFound(error) {
    this.errorResponse = error.response.data
    const httpStatusCode = error.response.status
    if (httpStatusCode === 403 & this.errorResponse.errorCode === 222) {
      this.errorMessage = this.errorResponse.message;
    } else {
      router.push({name: 'errorRoute'})
    }
  },

  mounted() {
    this.getStorages()
    this.getFeatureTypes()
  }
}
</script>

<style>
div.contents {
  display: inline-block;
  width: 25%;
}
</style>


