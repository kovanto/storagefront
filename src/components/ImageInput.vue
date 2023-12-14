<template>
  <div>
    <input @change="handleImage" class="form-control" type="file" id="formFile" accept="image/x-png,image/jpeg,image/gif">
  </div>
</template>

<script>
export default {
  name: 'ImageInput',

  data() {
    return {
      imageDataBase64: ''
    }
  },

  methods: {
    handleImage(event) {
      const selectedImage = event.target.files[0];
      this.emitBase64(selectedImage);
    },

    emitBase64(fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDataBase64 = reader.result;
        this.$emit('event-emit-base64', this.imageDataBase64);
      };
      reader.onerror = function (error) {
        console.error('File reading error:', error);
      };
      reader.readAsDataURL(fileObject);
    },
  }
}
</script>