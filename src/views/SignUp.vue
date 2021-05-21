<template>
  <v-container class="ma-10">
    <v-row>
      <v-col cols="4">
        <v-row>
          <v-col>
            <app-text-field label="Seu Nome" v-model="form.name" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <app-text-field label="Seu Whatsapp" v-model="form.name" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <app-text-field label="Nome da Sua Empresa" v-model="form.name" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <app-text-field label="Seu Email" v-model="form.name" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <app-text-field label="Crie uma senha" v-model="form.name" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn class="primary text-capitalize" block>Criar Conta</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    form: {},
  }),
};
</script>

<style>
</style>