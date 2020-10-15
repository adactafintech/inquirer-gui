
<template>
   <ag-grid-vue style="width: 500px; height: 300px;"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="rowData">
    </ag-grid-vue>
</template>

<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridVue } from "ag-grid-vue";
export default {
  name: "Grid",
  props: {
    question: Object,
  },
  data: () => {
    return {
     columnDefs: null,
            rowData: null
    };
  },
    components: {
    AgGridVue,
  },
  beforeMount() {
    this.columnDefs = [
      { headerName: "Make", field: "make" },
      { headerName: "Model", field: "model" },
      { headerName: "Price", field: "price" },
    ];

    this.rowData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
    ];
  },
  methods: {
  },

};
</script>
