<template>
  <div>
    <div v-for="featureType in featureTypes" :key="featureType.featureId"
         class="form-check text-start">
      <input v-model="featureType.isAvailable" :id=" 'featureTypeId' + featureType.featureId"
             class="form-check-input" type="checkbox">
      <label class="form-check-label" :for=" 'featureTypeId' + featureType.featureId ">
        {{ featureType.featureName }}
      </label>
    </div>
  </div>

</template>
<script>
import router from "@/router";

export default {
  name: "FeatureTypesCheckbox",
  props: {
    featureInfos: []
  },

  data () {
    return {
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
   getFeatures () {
      this.$http.get("/storage/features")
          .then(response => {
            this.featureTypes = response.data

          })
          .catch(error => {
            //const errorResponseBody = error.response.data
          })
    },


  },
  mounted () {
    this.getFeatures()

  }
}


</script>


