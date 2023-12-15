<template>

  <div class="container">
    <div class="row justify-content-center">
      <div v-if="isEditable" class="col col-8">
        <input class="form-control" type="text" v-model="storageDetails.storageName">
        <br>
        <br>
      </div>
      <div v-else class="col col-8">
        <h1>{{ storageDetails.storageName }}</h1>
        <br>
        <br>
      </div>
    </div>

    <div class="row">
      <div class="col col-5">
        <!--siia tuleb eraldi komponent "StorageImage.vue"-->
        <!--<img src="@\assets\img_placeholder.jpg" alt="image placeholder" class="img-thumbnail">-->
        <img :src="storageDetails.imageData" class="img-fluid img-thumbnail" width="600">
        <div v-if="isEditable">
          <ImageInput @event-emit-base64="emitImageDataBase64"/>
        </div>

      </div>
      <StorageDetailsInfoTable :editable="isEditable" :storageDetailsInfo="storageDetails"
                               @event-selected-county-change="handleCountyChange"
                               @change-latitude="handleLatitudeChange"
                               @change-longitude="handleLongitudeChange"
                               @event-selected-type-change="handleTypeChange"
                               @change-squaremeters="handleSquareMetersChange"
                               @change-price="handlePriceChange"
      />
    </div>
    <br>
    <br>
    <div v-if="isEditable">
      <input class="form-control" type="text" v-model="storageDetails.description">
    </div>
    <div v-else class="row justify-content-center">
      {{ storageDetails.description }}
    </div>
    <br>
    <br>

    <div>
      <a v-if="isEditable" class="btn btn-primary" style="background-color:#008080; color:#fff">Salvesta</a>
      <div v-else-if="isLoggedIn">
        <ErrorAlert :error-message="errorMessage"/>
        Algus: <input v-model="startDate" type="date" class="">
        Lõpp: <input v-model="endDate" type="date" class="m-2">
        <button @click="initiateBooking(startDate, endDate)" class="btn btn-primary" type="submit"  style="background-color:#008080; color:#fff">Broneeri asukoht
        </button>
        <BookingModal ref="bookingModalRef" :order-details="orderDetails"/>
      </div>
      <a v-else href="/login" class="btn btn-primary"  style="background-color:#008080; color:#fff">Tellimiseks logi sisse</a>
      <a href="/alllocations" class="btn btn-primary m-2"  style="background-color:#008080; color:#fff">Tagasi</a>
    </div>
  </div>

</template>

<script>

import StorageDetailsInfoTable from "@/components/StorageDetailsInfoTable.vue";
import ImageInput from "@/components/ImageInput.vue";
import router from "@/router";
import BookingModal from "@/components/modal/BookingModal.vue";
import ErrorAlert from "@/components/alert/ErrorAlert.vue";
import {end} from "@popperjs/core";


export default {

  name: 'StorageDetailsView',
  components: {ErrorAlert, BookingModal, ImageInput, StorageDetailsInfoTable},

  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      isSeller: false,
      isEditable: false,
      storageId: 0,
      storageDetails: {
        storageName: '',
        locationId: 0,
        countyId: 0,
        countyName: '',
        typeId: 0,
        typeName: '',
        longitude: 0,
        latitude: 0,
        squareMeters: 0,
        price: 0,
        description: '',
        imageData: '',
        featureInfos: [
          {
            featureId: 0,
            featureName: '',
            isAvailable: true
          }
        ],
        userId: '',
      },
      orderDetails: {
        customerId: 0,
        storageId: 0,
        storageName: '',
        startDate: '',
        endDate: ''

      },
      startDate: '',
      endDate: '',
      errorMessage: ''

    }
  },

  methods: {
    end() {
      return end
    },

    async getStorageDetails() {
      try {
        const response = await this.$http.get('/storage', {
          params: {
            storageId: this.storageId
          }
        });

        this.storageDetails = response.data;
        this.getAndSetIsSeller();
        this.getAndSetEditable();
      } catch (error) {
        await router.push({name: 'errorRoute'});
      }
    },
    getAndSetIsLoggedIn() {
      const userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
    },
    getAndSetIsSeller() {
      const userId = sessionStorage.getItem('userId')
      this.isSeller = userId === this.storageDetails.userId;
    },
    getAndSetIsAdmin() {
      const roleName = sessionStorage.getItem('roleName')
      this.isAdmin = roleName === 'admin'
    },
    getAndSetEditable() {
      const roleName = sessionStorage.getItem('roleName')
      this.isEditable = (roleName === 'admin') || this.isSeller;
    },

    handleCountyChange(countyId) {
      this.storageDetails.countyId = countyId;
    },
    handleLatitudeChange(latitude) {
      this.storageDetails.latitude = latitude;
    },
    handleLongitudeChange(longitude) {
      this.storageDetails.longitude = longitude;
    },
    handleTypeChange(typeId) {
      this.storageDetails.typeId = typeId;
    },
    handleSquareMetersChange(squareMetes) {
      this.storageDetails.squareMetes = squareMetes;
    },
    handlePriceChange(price) {
      this.storageDetails.price = price;
    },

    emitImageDataBase64(imageData) {
      this.$emit('event-emit-image-data', imageData)
    },

    initiateBooking(startDate, endDate) {
      this.getAndSetOrderDetails(startDate, endDate)
      this.validateBookingDatesAndOpenBookingModal()
    },

    getAndSetOrderDetails(startDate, endDate) {
      this.orderDetails.storageId = this.storageId;
      this.orderDetails.startDate = startDate
      this.orderDetails.endDate = endDate;
      this.orderDetails.storageName = this.storageDetails.storageName;
      this.orderDetails.customerId = Number(sessionStorage.getItem('userId'));
    },

    validateBookingDatesAndOpenBookingModal() {
        if (this.startDate && this.endDate) {
          this.$refs.bookingModalRef.openModal(this.orderDetails)
        } else {
          this.errorMessage = 'Vali nii broneeringu alguse kui lõpu kuupäev'
        }
      }
    },

  created() {
    const queryParams = new URLSearchParams(window.location.search);
    this.storageId = queryParams.get('storageId') || null;
  },

  mounted() {
    this.getStorageDetails()
    this.getAndSetIsLoggedIn()
    this.getAndSetIsSeller()
    this.getAndSetIsAdmin()
    this.getAndSetEditable()

  },
}
</script>
