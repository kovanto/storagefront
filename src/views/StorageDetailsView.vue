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
      <div class="col col-3">
        <!--siia tuleb eraldi komponent "StorageImage.vue"-->
        <img src="@\assets\img_placeholder.jpg" alt="image placeholder" class="img-thumbnail">
        <div v-if="isEditable">
          <ImageInput/>
        </div>

      </div>
      <StorageDetailsInfoTable :editable="isEditable" :storage-details-info="storageDetails"/>
    </div>
    <br>
    <br>
    <div class="row justify-content-center">
      {{ storageDetails.description }}
    </div>
    <br>
    <br>

    <div>
      <a v-if="isEditable" class="btn btn-primary">Salvesta</a>
      <div v-else-if="isLoggedIn">
        Algus: <input type="date" class="">
        Lõpp: <input type="date" class="m-2">
        <a class="btn btn-primary">Kontrolli saadavust</a>
      </div>
      <a v-else href="/login" class="btn btn-primary">Tellimiseks logi sisse</a>
      <a href="/alllocations" class="btn btn-primary m-2">Loobu</a>
    </div>
  </div>

</template>

<script>

import StorageDetailsInfoTable from "@/components/StorageDetailsInfoTable.vue";
import ImageInput from "@/components/ImageInput.vue";


export default {

  name: 'StorageDetailsView',
  components: {ImageInput, StorageDetailsInfoTable},

  data () {
    return {
      isLoggedIn: false,
      isAdmin: false,
      isSeller: false,
      isEditable: false,
      storageId: 0,
      storageDetails: {
        storageName: '',
        locationId:0,
        countyId: 0,
        countyName: '',
        typeId: 0,
        typeName:'',
        longitude: 0,
        latitude: 0,
        squareMeters: 0,
        price: 0,
        description: '',
        imageData: 'string',
        featureInfos: [
          {
            featureId: 0,
            featureName: 'string',
            isAvailable: true
          }
        ]
      },

      startDate: '',
      endDate: '',

    }
  },

  methods: {

    getStorageDetails () {
      this.$http.get('/storage', {
            params: {
              storageId: this.storageId
            }
          }
      )
          .then(response => {
            this.storageDetails = response.data
          }).catch(error => {
        //router.push({name: 'errorRoute'})
      })

    },


    getAndSetIsLoggedIn () {
      const userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
    },

    getAndSetIsSeller () {
      const roleName = sessionStorage.getItem('roleName')
      this.isSeller = roleName === 'seller'
    },

    getAndSetIsAdmin () {
      const roleName = sessionStorage.getItem('roleName')
      this.isAdmin = roleName === 'admin'
    },

    getAndSetEditable () {
      const roleName = sessionStorage.getItem('roleName')
      this.isEditable = roleName === 'seller' || roleName === 'admin'
    },
  },

  created () {
    const queryParams = new URLSearchParams(window.location.search);
    this.storageId = queryParams.get('storageId') || null;
  },

  mounted () {
    this.getAndSetIsLoggedIn()
    this.getAndSetIsSeller()
    this.getAndSetIsAdmin()
    this.getAndSetEditable()
    this.getStorageDetails()
  },

}
</script>
