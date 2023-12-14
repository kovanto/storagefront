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
        <td >
        <a :href="getMapLink(storageDetailsInfo.latitude, storageDetailsInfo.longitude)" target="_blank">Asukoht kaardil</a>
        </td>

        <td v-if="editable">
          <input class="form-control" type="text"
                 placeholder="latitude"
                 v-model="storageDetailsInfo.latitude">
          <input class="form-control" type="text"
                 placeholder="longitude"
                 v-model="storageDetailsInfo.longitude">
        </td>
        <td v-else>{{ storageDetailsInfo.latitude }} {{ storageDetailsInfo.longitude }}</td>
      </tr>
      <tr>
        <td>Suurus (m2)</td>
        <td v-if="editable">
          <input class="form-control" type="text"
                 placeholder="sisesta pindala"
                 v-model="storageDetailsInfo.squareMeters">
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
          <input class="form-check-input mx-2" type="checkbox">
          <label class="form-check-label">valve</label>
          <input class="form-check-input mx-2" type="checkbox">
          <label class="form-check-label">küte</label>
          <input class="form-check-input mx-2" type="checkbox">
          <label class="form-check-label">elekter</label>
        </td>
        <td v-else>

          <FeatureTypesCheckbox/>
        </td>


      </tr>
      <tr>
        <td>Hind ühes kuus (€)</td>
        <td v-if="editable">
          <input v-model="storageDetailsInfo.price"
                 class="form-control" type="text" placeholder="hind eurodes">'
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

    handleTypeChange (newTypeId) {
      this.storageDetailedInfo.typeId = newTypeId;
      //emit to StorageDetailsView
    },
    handleCountyChange (newCountyId) {
      this.storageDetailedInfo.countyId = newCountyId;
  //emit to StorageDetailsView
    },
    getMapLink(latitude, longitude) {

      return `https://www.google.com/maps?q=${latitude},${longitude}`;
    },
  }
}


</script>