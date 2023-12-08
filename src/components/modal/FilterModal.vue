<template>
  <div v-if="isOpen" class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Filtreeri pakkumisi</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                  @click="closeFilterModal"></button>
        </div>
        <div class="modal-body">
          <p>
            <div class="container text-center">
              <div class="row">
                <div class="col">
                  <CountiesDropdown ref="countiesDropdownRef"/>
                </div>
                <div class="col">
                  Vali teenused
                  <FeatureTypesCheckbox ref="featureTypesCheckboxRef"/>
                </div>
              </div>
            </div>
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="handleFilteredStorageRequestValues">Rakenda filtrid
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeFilterModal">Loobu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountiesDropdown from "@/components/CountiesDropdown.vue";
import FeatureTypesCheckbox from "@/components/FeatureTypesCheckbox.vue";

export default {
  name: "FilterModal",
  emits: ['county-id-and-features-filter-applied'],
  components: {FeatureTypesCheckbox, CountiesDropdown},

  data() {
    return {
      isOpen: false,
      filteredStorageRequest: {
        countyId: 0,
        featureTypes: [
          {
            featureId: 0,
            featureName: '',
            isAvailable: true
          }
        ]
      }
    }
  },

  methods: {

    handleFilteredStorageRequestValues() {
      this.getFilterValues();
      this.emitEventFindFilteredLocations()
      this.closeFilterModal()
    },


    getFilterValues() {
      this.filteredStorageRequest.countyId = this.$refs.countiesDropdownRef.selectedCountyId
      this.filteredStorageRequest.featureTypes = this.$refs.featureTypesCheckboxRef.featureTypes
    },

    emitEventFindFilteredLocations() {
      this.$emit('event-county-id-and-features-filter-applied', this.filteredStorageRequest);
      // todo saa kätte lastelt kõik vajalik info  (countyId, featureTypes)
      // emiti tegevus ülesse koos filteredStorageRequest objektiga
      // sulge modal
      // ----> Püüa event kinni (koos filteredStorageRequest objektiga) ja saada parentis AllCoactionsView välja post sõnum
      // Salvesta tulemus storageInfos objekti
    },

    closeFilterModal() {
      this.isOpen = false
    },

    openFilterModalAndSetData(featureTypes) {
      this.isOpen = true
      this.$nextTick(() => {
        if (this.$refs.featureTypesCheckboxRef) {
          this.$refs.featureTypesCheckboxRef.featureTypes = featureTypes;
        }
      })
    },

  },

}
</script>

