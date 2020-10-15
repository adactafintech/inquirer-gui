import Grid from "./packages/Grid";

export default {
  install(Vue, options) {
    Vue.component('Grid', Grid);
    if (options) {Grid
      options.plugin = {
        questionType: "grid",
        component: Grid
      };
    }
  }
}


