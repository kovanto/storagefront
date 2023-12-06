
<template>

  <img v-if="imageDataBase64 === '' || imageDataBase64 === null" src="../../assets/StorageStandard.jpeg" class="img-thumbnail"/>
  <img v-else :src="imageDataBase64" class="img-thumbnail">
</template>


<script>
export default {
  name: 'StorageImage',
  props: {
    imageDataBase64: String
  }
}

</script>
