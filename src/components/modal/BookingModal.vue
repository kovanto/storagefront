<template>
  <div v-if="isOpen" class="modal" tabindex="-1" style="display: block; background-blend-mode: lighten">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                  @click="closeModal"></button>
        </div>
        <div class="modal-body border-0">
          <h4>Kas oled kindel, et soovid asukoha "{{ orderDetails.storageName }}" broneerida?</h4>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-outline-dark me-auto" @click="closeModal" style="background-color:#008080; color:#fff">Loobu</button>
          <button type="button" class="btn btn-outline-danger"  style="background-color:#008080; color:#fff" @click="postOrder(orderDetails)">Broneeri asukoht</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookingModal",
  props: {
    orderDetails: {}
  },

  data() {
    return {
      isOpen: false
    }
  },

  methods: {

    postOrder(orderDetails) {
      this.$http.post("/myorders", orderDetails
      ).then(response => {
        const responseBody = response.data
        this.closeModal()
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },


    closeModal() {
      this.isOpen = false
    },

    openModal() {
      this.isOpen = true
    },

  }
}
</script>


