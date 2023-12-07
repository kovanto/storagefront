<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-8">
        <h1>{{ storageName }}</h1>
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

      <StorageDetailsInfoTable :editable="isEditable"/>

    </div>
    <br>
    <br>
    <div class="row justify-content-center">
      {{ storageDescription }}
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
import ImageInput from "@/views/ImageInput.vue";

export default {
  name: "StorageDetailsView",

  components: {ImageInput, StorageDetailsInfoTable},

  data () {
    return {
      isLoggedIn: false,
      isAdmin: false,
      isSeller: false,
      isEditable: false,
      storageName: 'Kohalik ladu 10',
      storageDescription: "Täpsustav kirjeldus ja muu lisainfo",
      startDate: '',
      endDate: '',

    }
  },

  methods: {
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


  mounted () {
    this.getAndSetIsLoggedIn()
    this.getAndSetIsSeller()
    this.getAndSetIsAdmin()
    this.getAndSetEditable()
  },
}

</script>
