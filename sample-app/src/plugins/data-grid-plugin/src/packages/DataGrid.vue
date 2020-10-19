
<template>
  <div>
    <ag-grid-vue
      style="height: 300px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :context="gridContext"
      :frameworkComponents="frameworkComponents"
      :gridOptions="gridOptions"
      @grid-ready="onGridReady"
      @cell-value-changed="handleCellValueChanged"
    >
    </ag-grid-vue>

    <v-btn @click="addNewRow()">Add</v-btn>
  </div>
</template>

<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { AgGridVue } from "ag-grid-vue";
import DataGridButtons from "./DataGridButtons";
import DropdownCellEditor from "./DropdownCellEditor";
export default {
  name: "DataGrid",
  props: {
    question: Object,
  },
  data: () => {
    return {
      gridOptions: null,
      columnDefs: null,
      rowData: null,
    };
  },
  components: {
    AgGridVue,
  },

  beforeMount() {
    this.initGrid();
  },

  mounted: function () {
    this.rowData = this.question.answer || [];
  },

  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    },

    async initGrid() {
      this.gridOptions = {};
      this.gridContext = { componentParent: this };
      this.frameworkComponents = {
        dataGridButtons: DataGridButtons,
        dropdownCellEditor: DropdownCellEditor,
      };

      this.defaultColDef = {
        flex: 1,
        editable: true,
      };

      this.columnDefs = [];
      if (
        this.question.guiOptions &&
        this.question.guiOptions.columns &&
        Array.isArray(this.question.guiOptions.columns)
      ) {
        for (
          let index = 0;
          index < this.question.guiOptions.columns.length;
          index++
        ) {
          const col = this.question.guiOptions.columns[index];

          let enumValue = col.enum;
          if (col.enumProvider && typeof this.question[col.enumProvider] === 'function') {
            const dynData = await this.question[col.enumProvider](col, this.question);
            // console.log(dynData);
            enumValue = dynData;
          }

          this.columnDefs.push({
            headerName: col.header,
            field: col.field,
            editable: col.editable !== undefined ? col.editable === true : true,
            cellRendererFramework: enumValue ? DropdownCellEditor : undefined,
            enum: enumValue,
          });
        }
      }

      this.columnDefs.push({
        field: "",
        pinned: "right",
        cellRendererFramework: DataGridButtons,
        width: 50,
        editable: false,
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

    updateSelectedRow(selectedData) {
      this.gridApi.applyTransaction({ update: selectedData });
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
