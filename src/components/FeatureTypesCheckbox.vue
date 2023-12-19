<template>
  <div>
    <div v-for="featureInfo in featureInfos" :key="featureInfo.featureId"
         class="form-check text-start">
      <input v-model="featureInfo.isAvailable" :id=" 'featureInfoId' + featureInfo.featureId"
             class="form-check-input" type="checkbox">
      <label class="form-check-label" :for=" 'featureInfoId' + featureInfo.featureId ">
        {{ featureInfo.featureName }}
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


}


</script>


