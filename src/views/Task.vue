<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          outlined
          dense
          :items="items"
          @input="handleSearchInput($event)"
        />
      </v-col>
      <v-col class="text-right" cols="12" md="8">
        <v-btn
          class="text-capitalize"
          bottom
          large
          color="primary"
          @click="handleStoreCustomer((id = null))"
          >Add New Task</v-btn
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="task.data"
          :loading="loading"
          :server-items-length="task.total"
          :options.sync="options"
          hide-default-footer
          @update:options="handleTableUpdate($event)"
        >
          <!-- :items-per-page="20" -->
          <!-- :options.sync="options" -->
          <template v-slot:[`item.status`]="{ item }">
            <v-chip v-if="item.status == 'open'" color="success" small outlined>
              {{ item.status }}
            </v-chip>
            <v-chip v-if="item.status == 'close'" color="error" small outlined>
              {{ item.status }}
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              v-show="item.status == 'open'"
              small
              color="success"
              class="mr-2"
              @click.stop="closeTask(item)"
            >
              mdi-check-circle-outline
            </v-icon>
            <v-icon
              v-show="item.status == 'close'"
              small
              disabled
              class="mr-2"
              color="error"
              @click.stop="handleStoreCustomer(item.id)"
            >
              mdi-check-circle
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click.stop="handleStoreCustomer(item.id)"
            >
              mdi-pencil
            </v-icon>
            <v-icon small @click.stop="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination
            v-model="searchParams.page"
            :length="task.last_page"
            @input="select($event)"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
    <StoreCustomerForm
      ref="StoreCustomerForm"
      @store="select(searchParams.page)"
    />
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="success" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import StoreCustomerForm from "../components/Customers/forms/StoreCustomerForm";
import { format } from "date-fns";

export default {
  components: { StoreCustomerForm },

  data: () => ({
    headers: [
      { text: "Description", align: "start", value: "description" },
      { text: "Start", align: "start", value: "date_start" },
      { text: "End", align: "start", value: "date_end" },
      { text: "Status", align: "left", value: "status" },
      { text: "Actions", align: "left", value: "actions" },
    ],
    items: ["all", "open", "close"],
    options: {},

    loading: false,

    dialogDelete: false,

    editedIndex: -1,

    deleteId: null,

    searchParams: {
      page: 1,
      orderBy: "description",
      orderDirection: "asc",
    },

    task: {
      data: [],
    },
  }),

  created() {
    this.select();
  },

  methods: {
    async select(page = 1) {
      this.loading = true;

      this.searchParams.page = page;

      await this.$http.index("tasks").then((response) => {
        this.task.data = response;
        console.log(this.task);
      });

      this.loading = false;
    },

    handleTableUpdate(options) {
      // this.options = options;
      // //this.searchParams.page = options.page
      // this.searchParams.orderBy = options.sortBy[0];
      // this.searchParams.orderDirection = options.sortDesc[0] ? "desc" : "asc";
      // this.select(options.page);
    },

    async handleSearchInput(text) {
      if (text == "all") {
        await this.$http.$get("tasks").then((response) => {
          this.task.data = response;
          console.log(this.task);
        });
      } else {
        await this.$http.$get("tasks?status=" + text).then((response) => {
          this.task.data = response;
          console.log(this.task);
        });
      }
    },

    handleStoreCustomer(id = null) {
      this.$refs.StoreCustomerForm.open(id);
    },

    deleteItem(item) {
      this.editedIndex = this.task.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.deleteId = item.id;
      this.dialogDelete = true;
    },

    async deleteItemConfirm(id) {
      await this.$http.destroy("tasks/" + this.deleteId).then((response) => {
        this.select();
      });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeTask(item) {

console.log(item)

      this.$http
        .update("tasks/", item.id, {
          description: item.description,
          status: "close",
          date_start: item.date_start,
          date_end: format(new Date(), "yyyy-MM-dd"),
        })
        .then((response) => {
          console.log(response);
          this.select();
         
        });
    },
  },
};
</script>

<style>
</style>