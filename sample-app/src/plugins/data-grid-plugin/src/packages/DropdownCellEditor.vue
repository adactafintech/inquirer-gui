
<template>
  <div>
    <v-select
      :items="items"
      v-model="select"
      v-on:input="changeRoute(`${select}`)"
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
    this.items = this.params.colDef.choices;
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
.my-dropdown-toggle {
  border-radius: 5px;
}

.my-dropdown-toggle::v-deep .dropdown-toggle {
  color: tomato;
  font-size: 25px;
  font-weight: 800;
}

.my-dropdown-toggle::v-deep .dropdown-toggle-placeholder {
  color: #c4c4c4;
}
</style> 
