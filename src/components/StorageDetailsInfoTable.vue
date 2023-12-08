<template>
  <div class="col col-6">

    <table>
      <tr>
        <td>Maakond</td>
        <td v-if="editable">
          <CountiesDropdown/>
        </td>
        <td v-else>{{ countyName }}</td>

      </tr>
      <tr>
        <td>Asukoht kaardil</td>
        <td>123</td>
      </tr>
      <tr>
        <td>Suurus (m2)</td>
        <td v-if="editable">
          <input class="form-control" type="text" placeholder="sisesta pindala" aria-label="default input example">
        </td>
        <td v-else>ruutmeetrid</td>
      </tr>
      <tr>
        <td>Tüüp</td>
        <td v-if="editable">
          <StorageTypeDropdown/>
        </td>
        <td v-else>123</td>
      </tr>
      <tr>
        <td>Lisad</td>
        <td v-if="editable">
          <input class="form-check-input mx-2" type="checkbox">
          <label class="form-check-label">valve</label>
          <input class="form-check-input mx-2" type="checkbox">
          <label class="form-check-label">küte</label>
          <input class="form-check-input mx-2" type="checkbox">
          <label class="form-check-label">elekter</label>
        </td>

        <!--
        all on
        <div v-for="transactionType in transactionTypes" :key="transactionType.transactionTypeId"
             class="form-check text-start">
          <input v-model="transactionType.isAvailable" class="form-check-input" type="checkbox"
                 :id=" 'transactionTypeId' + transactionType.transactionTypeId">
          <label class="form-check-label" :for=" 'transactionTypeId' + transactionType.transactionTypeId">
            {{ transactionType.transactionTypeName }}
          </label>
        </div>-->


        <td v-else>123</td>
      </tr>
      <tr>
        <td>Hind ühes kuus (€)</td>
        <td v-if="editable">
          <input class="form-control" type="text" placeholder="hind eurodes" aria-label="default input example">'
        </td>
        <td v-else>123</td>
      </tr>
    </table>

  </div>
</template>

<script>

import CountiesDropdown from "@/components/CountiesDropdown.vue";
import StorageTypeDropdown from "@/components/StorageTypeDropdown.vue";

export default {
  name: 'StorageDetailsInfoTable',
  props: {
    editable: {}
  },
  components: {StorageTypeDropdown, CountiesDropdown},

  data () {
    return {
      storageID: 0,
      countyName: '',

    }
  },
}
</script>