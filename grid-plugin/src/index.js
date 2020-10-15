import Vue from "vue";
import Grid from "./packages/Grid";

export default {
  install(Vue, options) {
    Vue.component('Grid', QuestionDateTime);
    if (options) {Grid
      options.plugin = {
        questionType: "date",
        component: Grid
      };
    }
  }
}


