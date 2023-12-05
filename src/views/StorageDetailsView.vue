<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-8">
        <h1>Rendipind {{storageId}}</h1>
      </div>
    </div>

    <div class="row">
      <div class="col col-3">
        <!--sellest teeb eraldi komponendi "StorageImage.vue"-->
        <img src="img_placeholder.jpg" class="img-thumbnail">
      </div>

      <div class="col col-6">
        <div class="row">
          Maakond
        </div>
        <div class="row">
          Vaata kaardil
        </div>
        <div class="row">
          Suurus
        </div>
        <div class="row">
          Tüüp
        </div>
        <div class="row">
          Lisad
        </div>
        <div class="row">
          Hind ühes kuus
        </div>
      </div>
    </div>
  </div>


</template>


<script>

import StorageImage from "@/components/image/StorageImage.vue";

export default {
  name: "StorageDetailsView",
  components: {StorageImage},

  data() {
    return {
      storageId: '10'

    }
  }

}


</script>
