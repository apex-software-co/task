<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="1000px"
    origin="left top"
    scrollable
  >
    <v-card>
      <v-card-title>Cadastrar Cliente</v-card-title>
      <v-card-text class="mb-6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <h3 class="mt-4 mb-2">Informações</h3>
          <v-row>
            <v-col cols="6" >
              <v-radio-group
                class="mt-0"
                hide-details="auto"
                v-model="form.person_type"
                row
              >
                <v-radio label="Pessoa Física" value="f"> </v-radio>
                <v-radio label="Pessoa Jurídica" value="j"> </v-radio>
              </v-radio-group>
            </v-col>
            <v-col offset="4" cols="2">
              <app-code-field
                label="Código"
                v-model="form.code"
                :clear-on-auto-code="isInsert"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col md="6">
              <app-text-field v-model="form.name" :label="name_label" />
            </v-col>
            <v-col md="4">
              <app-text-field v-model="form.alias" :label="alias_label" />
            </v-col>
          </v-row>
          <v-row>
            <template v-if="IsJuridic">
              <v-col md="4">
                <app-text-field v-model="form.cnpj" label="CNPJ" />
              </v-col>

              <v-col>
                <app-text-field
                  v-model="form.inscricao_estadual"
                  label="Inscrição Estadual"
                />
              </v-col>
              <v-col md="2">
                <v-checkbox
                  class="mt-0"
                  v-model="form.inscricao_estadual_isento"
                  label="Isento"
                  hide-details="auto"
                  :true-value="1"
                  :false-value="0"
                />
              </v-col>
            </template>

            <template v-else>
              <v-col md= "md-6">
                <app-text-field 
                v-model="form.cpf" 
                label="CPF" 
                />
              </v-col>
              <v-col>
                <app-text-field v-model="form.rg" label="RG" />
              </v-col>
            </template>
          </v-row>

          <h3 class="mt-10 mb-0">Endereço</h3>
          <v-row   class="mb-2">
            <v-col md="2">
              <app-text-field
                v-model="form.main_address.postal_code"
                append-outer-icon="mdi-magnify"
                @click:append-outer="getZipCode()"
                label="CEP"
              />
            </v-col>
            <v-col md="5">
              <app-text-field
                v-model="form.main_address.address"
                label="Endereço"
              />
            </v-col>
            <v-col md="2">
              <app-text-field
                v-model="form.main_address.number"
                label=" Número"
              />
            </v-col>
            <v-col md="2">
              <app-text-field
                v-model="form.main_address.complement"
                label="Complemento"
              />
            </v-col>
            <v-col md="3">
              <app-text-field
                v-model="form.main_address.district"
                label="Bairro"
              />
            </v-col>
              <v-col md="2">
              <app-text-field v-model="form.main_address.city" label="Cidade" />
            </v-col>
            <v-col md="2">
              <app-text-field
                v-model="form.main_address.state"
                label="Estado"
              />
            </v-col>
            
            </v-col>
          </v-row>

          <v-row class="mt-10">
            <v-col md="2">
              <app-text-field v-model="form.phone" label="Telefone" />
            </v-col>
            <v-col md="2">
              <app-text-field v-model="form.cell_phone" label="Celular" />
            </v-col>
            <v-col>
              <app-text-field v-model="form.email" label="email" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions
        class="justify-end py-4"
        style="background-color: #f5f5f5"
      >
        <v-btn
          @click="dialog = false"
          text
          class="text-capitalize"
          color="primary"
          >Cancelar</v-btn
        >
        <v-btn @click="dialog = false" class="text-capitalize" color="primary"
          >Salvar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
      

<script>
import cep from "cep-promise";

export default {
  data() {
    return {
      dialog: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
      valid: true,
      form: {},
      baseForm: {
        person_type: "f",
        name: null,
        alias: null,
        cpf: null,
        cnpj: null,
        inscricao_estadual: null,
        inscricao_municipal: null,
        main_address: {
          address: null,
          number: null,
          complement: null,
          district: null,
          postal_code: null,
          city_district: null,
          city: null,
          state: null,
          country: null,
        },
        phone: null,
        cell_phone: null,
        email: null,
      },
    };
  },
  computed: {
    IsJuridic() {
      return this.form.person_type == "j";
    },
    alias_label() {
      if (this.IsJuridic) {
        return "Nome Fantasia";
      } else {
        return "Apelido";
      }
    },

    name_label() {
      if (this.IsJuridic) {
        return "Razão Social";
      } else {
        return "Nome";
      }
    },
    isInsert() {
      return !this.form.id;
    },
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
      await this.$http.$get("customer/customer/" + id).then((response) => {
        this.form = response.customer;
      });
    },

    handleSave() {
      this.$refs.form.validate();
      if (this.valid == true) {
        if (this.isInsert) {
          this.store();
        } else {
          this.update();
        }
      }
    },

    store() {
      this.$http.store("customer/customer", this.form).then((response) => {
        this.processSaved();
      });
    },

    update() {
      this.$http
        .update("customer/customer", this.form.id, this.form)
        .then((response) => {
          console.log(response);
          this.processSaved();
        });
    },

    processSaved() {
      this.$emit("store");
      this.dialog = false;
    },

    getZipCode() {
      cep(this.form.main_address.postal_code)
        .then((response) => {
          this.form.main_address.city = response.city;
          this.form.main_address.address = response.street;
          this.form.main_address.district = response.neighborhood;
          this.form.main_address.state = response.state;
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>

<style scoped>
</style>