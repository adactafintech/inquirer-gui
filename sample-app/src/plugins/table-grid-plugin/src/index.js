import TableGrid from "./packages/TableGrid";

export default {
  install(Vue, options) {
    Vue.component('TableGrid', TableGrid);
    if (options) {
      options.plugin = {
        questionType: "table-grid",
        component: TableGrid
      };
    }
  }
}


