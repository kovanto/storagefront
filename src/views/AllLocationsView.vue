<template>
  <FilterModal ref="filterModalRef"/>
  <div>
    <h1>Pakutavad rendipinnad</h1>
    <div class="container text-center">
      <div class="row mt-3 mb-5 class= text-end">
        <div class="col">
          <font-awesome-icon :icon="['fas', 'arrow-up-short-wide']" class="me-3"/>
          <font-awesome-icon :icon="['fas', 'filter']" @click="openFilterModal"/>
        </div>
      </div>
    </div>

      <div class="contents" v-for="storageInfo in storageInfos" >
        <img @click="navigateToStorageDetailsView(storageInfo.storageId)" :src="storageInfo.imageData" class="img-fluid img-thumbnail" width="400">
        <div @click="navigateToStorageDetailsView(storageInfo.storageId)">{{ storageInfo.storageName}}</div>
        <div> {{ storageInfo.storagePrice + " €/kuu" }}</div>
      </div>
  </div>

</template>

<script>
import router from "@/router";
import FilterModal from "@/components/modal/FilterModal.vue";
import FeatureTypesCheckbox from "@/components/FeatureTypesCheckbox.vue";

export default {
  name: "AllLocationsView",
  components: {FeatureTypesCheckbox, FilterModal},

  data() {
    return {
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

    openFilterModal() {
      this.$refs.filterModalRef.openFilterModalAndSetData(this.featureTypes)
    },

    getFeatureTypes() {
      this.$http.get("/storage/features")
          .then(response => {
            this.featureTypes = response.data
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
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


