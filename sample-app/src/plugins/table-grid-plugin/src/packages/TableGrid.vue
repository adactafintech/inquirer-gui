
<template>
  <div>
    <ag-grid-vue
      style="width: 500px; height: 300px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :context="gridContext"
      :frameworkComponents="frameworkComponents"
      @grid-ready="onGridReady"
      @cell-value-changed = "handleCellValueChanged"
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
import TableGridButtons from "./TableGridButtons";
export default {
  name: "TableGrid",
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
    this.initGrid();

    this.rowData = [];
  },

  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    },

    initGrid() {
      this.gridContext = { componentParent: this };
      this.frameworkComponents = {
        tableGridButtons: TableGridButtons,
      };

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
        cellRendererFramework: TableGridButtons,
        width: 50,
        editable: false
      });
    },

    handleCellValueChanged() {
      this.answerChanged();
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
      return {};
    },
  },
};
</script>
