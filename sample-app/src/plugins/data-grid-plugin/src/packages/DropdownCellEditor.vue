
<template>
  <div>
    <v-select
      :items="items"
      v-model="select"
      v-on:input="changeRoute(`${select}`)"
      dense
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      select: "",
      items: [],
    };
  },

  beforeMount() {
    this.items = this.params.colDef.enum ? this.params.colDef.enum : [];
    this.select = this.params.node.data[this.params.colDef.field]
      ? this.params.node.data[this.params.colDef.field]
      : this.items[0];
  },

  methods: {
    changeRoute(select) {
      this.params.node.data[this.params.colDef.field] = select;
      this.params.context.componentParent.updateSelectedRow([
        this.params.node.data,
      ]);
    },
  },
});
</script> 
 
<style>
.v-select.v-input {
  padding-top: 0px !important;
}

.v-select.v-input div.v-input__control{
  background-color: transparent !important;
}
.v-select__selection{
  padding-left: 5px;
}
</style> 
