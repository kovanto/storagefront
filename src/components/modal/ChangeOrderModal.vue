<template>
  <div v-if="isOpen" class="modal" tabindex="-1" style="display: block; background-blend-mode: lighten">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body border-0">
          <h4>Muuda broneeringu kuupäevad</h4>
        </div>
        <div>
          Algus: <input type="date" class="">
          Lõpp: <input type="date" class="m-2">
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-outline-dark me-auto" @click="closeModal">Loobu</button>
          <button type="button" class="btn btn-outline-danger">Salvesta</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeOrderModal",
  props: {
    storageInfo: {}
  },

  data() {
    return {
      isOpen: false
    }
  },

  methods: {

    closeModal() {
      this.isOpen = false
    },

    openModal() {
      this.isOpen = true
    },

  }
}
</script>

