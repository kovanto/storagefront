<template>


    <input class="form-control" type="file" id="formFile" accept="image/x-png,image/jpeg,image/gif">

</template>


<script>
export default {
  name: 'ImageInput',

  data() {
    return {
      imageDataBase64: ''
    }
  },


}
</script>