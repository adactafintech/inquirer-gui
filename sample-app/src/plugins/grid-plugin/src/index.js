import Grid from "./packages/Grid";

export default {
  install(Vue, options) {
    Vue.component('Grid', Grid);
    if (options) {
      options.plugin = {
        questionType: "grid",
        component: Grid
      };
    }
  }
}


