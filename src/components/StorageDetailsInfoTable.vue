<template>
  <div class="col col-6">
    <table>
      <tr>
        <td>Maakond</td>
        <td v-if="editable">
          <CountiesDropdown :selectedCountyId="storageDetailsInfo.countyId"
                            @event-selected-county-change="handleCountyChange"/>
        </td>
        <td v-else>{{ storageDetailsInfo.countyName }}</td>
      </tr>
      <tr>
        <td>
          <a :href="getMapLink(storageDetailsInfo.latitude, storageDetailsInfo.longitude)" target="_blank">Asukoht
            kaardil</a>
        </td>

        <td v-if="editable">
          <input class="form-control" type="text"
                 placeholder="latitude"
                 v-model="storageDetailsInfo.latitude"
                 @change-latitude="handleLatitudeChange">
          <input class="form-control" type="text"
                 placeholder="longitude"
                 v-model="storageDetailsInfo.longitude"
                 @change-longitude="handleLongitudeChange">
        </td>
        <td v-else>{{ storageDetailsInfo.latitude }} {{ storageDetailsInfo.longitude }}</td>
      </tr>
      <tr>
        <td>Suurus (m2)</td>
        <td v-if="editable">
          <input class="form-control" type="text"
                 placeholder="sisesta pindala"
                 v-model="storageDetailsInfo.squareMeters"
                 @change-squaremeters="handleSquareMetersChange">
        </td>
        <td v-else>{{ storageDetailsInfo.squareMeters }}</td>
      </tr>
      <tr>
        <td>Tüüp</td>
        <td v-if="editable">
          <StorageTypeDropdown :selectedTypeId="storageDetailsInfo.typeId"
                               @event-selected-type-change="handleTypeChange"/>
        </td>
        <td v-else>{{ storageDetailsInfo.typeName }}</td>
      </tr>
      <tr>
        <td>Lisad</td>
        <td v-if="editable">
          <FeatureTypesCheckbox :featureInfos="storageDetailsInfo.featureInfos"/>
        </td>


        <td v-else>
          <div v-for="featureInfo in storageDetailsInfo.featureInfos" :key="featureInfo.featureId">
            <div v-if="featureInfo.isAvailable"> {{ storageDetailsInfo.featureName }}</div>
          </div>
        </td>

      </tr>
      <tr>
        <td>Hind ühes kuus (€)</td>
        <td v-if="editable">
          <input v-model="storageDetailsInfo.price"
                 class="form-control" type="text" placeholder="hind eurodes"
                 @change-price="handlePriceChange">
        </td>
        <td v-else>{{ storageDetailsInfo.price }}</td>
      </tr>
    </table>

  </div>
</template>

<script>

import CountiesDropdown from "@/components/CountiesDropdown.vue";
import StorageTypeDropdown from "@/components/StorageTypeDropdown.vue";
import FeatureTypesCheckbox from "@/components/FeatureTypesCheckbox.vue";

export default {
  name: 'StorageDetailsInfoTable',
  props: {
    editable: {},
    storageDetailsInfo: {}

  },
  components: {FeatureTypesCheckbox, StorageTypeDropdown, CountiesDropdown},

  data () {
    return {
      storageDetailedInfo: {}
    }
  },
  methods: {
    handleCountyChange (selectedCountyId) {
      this.storageDetailedInfo.countyId = selectedCountyId;
      this.$emit('event-selected-county-change', Number(this.storageDetailedInfo.countyId))
    },

    handleLatitudeChange () {
      this.$emit('change-latitude', Number(this.storageDetailedInfo.latitude))
    },

    handleLongitudeChange () {
      this.$emit('change-longitude', Number(this.storageDetailedInfo.longitude))
    },

    handleSquareMetersChange () {
      this.$emit('change-squaremeters', Number(this.storageDetailedInfo.squareMeters))

    },
    handleTypeChange (selectedTypeId) {
      this.storageDetailedInfo.typeId = selectedTypeId;
      this.$emit('event-selected-type-change', Number(this.storageDetailedInfo.typeId))
    },
    handlePriceChange () {
      this.$emit('change-price', Number(this.storageDetailedInfo.price))
    },

    getMapLink (latitude, longitude) {

      return `https://www.google.com/maps?q=${latitude},${longitude}`;
    },
  }
}


</script>