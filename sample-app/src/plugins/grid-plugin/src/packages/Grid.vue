
<template>
  <div>
    <ag-grid-vue
      style="width: 500px; height: 300px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
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
    this.createGridColumns();

    this.rowData = [];
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    },

    createGridColumns() {
      this.defaultColDef = {
        flex: 1,
        editable: true,
        resizable: true,
      };

      this.columnDefs = [];
      if (
        this.question.guiOptions &&
        this.question.guiOptions.columns &&
        Array.isArray(this.question.guiOptions.columns)
      ) {
        this.columnDefs = this.question.guiOptions.columns.map((col) => {
          return {
            headerName: col.header,
            field: col.field,
            editable: col.editable !== undefined ? col.editable === true : true,
          };
        });
      }

      this.columnDefs.push({
        field: "",
        pinned: "right",
        cellRendererFramework: Buttons,
        width: 75,
      });
    },

    addNewRow() {
      this.gridApi.applyTransaction({ add: [this.createNewRowData()] });
      let items = [];
      this.gridApi.forEachNode(function (node) {
        items.push(node.data);
      });
      this.$emit("answerChanged", this.question.name, items);
    },

    createNewRowData() {
      return {};
    },
  },
};
</script>
