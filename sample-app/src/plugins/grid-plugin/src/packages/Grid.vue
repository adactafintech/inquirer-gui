
<template>
  <div>
    <ag-grid-vue
      style="width: 500px; height: 300px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :context="context"
      :frameworkComponents="frameworkComponents"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>

    <v-btn @click="addNewRow()">Add</v-btn>
  </div>
</template>

<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { AgGridVue } from "ag-grid-vue";
import Buttons from "./Buttons";
export default {
  name: "Grid",
  props: {
    question: Object,
  },
  data: () => {
    return {
      columnDefs: null,
      rowData: null,
    };
  },
  components: {
    AgGridVue,
  },
  beforeMount() {
    this.defaultColDef = {
      flex: 1,
      editable: true,
      resizable: true,
    };
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttons: Buttons,
    };
    this.columnDefs = [
      { headerName: "Make", field: "make" },
      { headerName: "Model", field: "model" },
      { headerName: "Price", field: "price" },
      {
        field: "",
        pinned: "right",
        cellRenderer: "buttons",
        width: 50,
      },
    ];

    this.rowData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
    ];
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    },
    addNewRow() {
      this.gridApi.applyTransaction({ add: [this.createNewRowData()] });
      this.answerChanged();
    },
    deleteSelectedRow(selectedData) {
      this.gridApi.applyTransaction({ remove: selectedData });
      this.answerChanged();
    },
    answerChanged() {
      let items = [];
      this.gridApi.forEachNode(function (node) {
        items.push(node.data);
      });
      this.$emit("answerChanged", this.question.name, items);
    },
    createNewRowData() {
      return {
        make: "",
        model: "",
        price: undefined,
      };
    },
  },
};
</script>
