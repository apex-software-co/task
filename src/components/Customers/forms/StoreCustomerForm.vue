<template>
  <v-navigation-drawer
    clipped
    temporary
    app
    right
    v-model="dialog"
    width="500px"
  >
    <!-- <v-card> -->
    <v-card-title v-if="form.id">Update Task</v-card-title>
    <v-card-title v-if="!form.id">Register Task</v-card-title>
    <v-card-text>
      <v-tabs> </v-tabs>
      <v-form ref="form" v-model="valid" lazy-validation>
        <h3>Informations</h3>

        <v-row class="mt-2">
          <v-col cols="12">
            <app-text-field
              v-model="form.description"
              label="Description"
              prepend-icon="mdi-alphabetical-variant"
            />
          </v-col>
          <v-col cols="12">
            <app-text-field
              v-model="form.date_start"
              label="Date Start"
              type="date"
              prepend-icon="mdi-calendar"
            />
          </v-col>
          <v-col cols="12">
            <app-text-field
              v-model="form.date_end"
              disabled
              label="Date Finish"
               type="date"
              prepend-icon="mdi-calendar"
            />
          </v-col>
          <v-col cols="12">
            <v-select v-model="form.status" :items="items" prepend-icon="mdi-chevron-down-circle-outline"></v-select>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <template v-slot:append>
      <div class="pa-4" style="background-color: #f5f5f5">
        <v-btn
          @click="handleSave()"
          class="text-capitalize mr-2"
          color="primary"
          >Save</v-btn
        >
        <v-btn @click="dialog = false" text class="text-capitalize"
          >Cancel</v-btn
        >
      </div>
    </template>
  </v-navigation-drawer>
</template>
      

<script>
export default {
  data() {
    return {
      dialog: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
      valid: true,
      items: ['open', 'close'],
      form: {},
      baseForm: {
        description: null,
        date_start: null,
        date_end: null,
        status: null,
      },
    };
  },
  computed: {
    isInsert() {
      return !this.form.id;
    },
  },

  created() {
    this.reset();
  },

  methods: {
    async open(id = null) {
      this.reset();
      if (id) {
        await this.showCustomer(id);
      }
      this.dialog = true;
    },

    reset() {
      this.form = JSON.parse(JSON.stringify(this.baseForm));
      //this.$refs.form.resetValidation();
      //this.$refs.form.reset();
    },

    async showCustomer(id) {
      await this.$http.$get("tasks?id=" + id).then((response) => {
        this.form = response[0];
        console.log(this.form)
      });
    },

    handleSave() {
      //this.$refs.form.validate();
      if (this.valid == true) {
        if (this.isInsert) {
          this.store();
        } else {
          this.update();
        }
      }
    },

    store() {
      this.$http.store("tasks", this.form).then((response) => {
        this.processSaved();
      });
    },

    update() {
      this.$http
        .update("tasks/", this.form.id, this.form)
        .then((response) => {
          console.log(response);
          this.processSaved();
        });
    },

    processSaved() {
      this.$emit("store");
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
</style>