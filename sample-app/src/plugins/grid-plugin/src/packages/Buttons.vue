<template>
  <div>
    {{ params.value }}
    <v-btn class="trash-button" @click="deleteRow()"
      ><font-awesome-icon icon="trash"
    /></v-btn>
  </div>
</template>

<script>
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTrash);

Vue.component("font-awesome-icon", FontAwesomeIcon);

export default Vue.extend({
  data: () => {
    return {
      columnDefs: null,
      rowData: null,
    };
  },
});
</script>
<style>
.trash-button {
  width: 20px !important;
  min-width: 20px !important;
}
</style>
