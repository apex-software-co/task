<template>
  <div>
    <v-card color="primary" dark>
      <v-card-title class="title"> How We Build the Application </v-card-title>
      <v-card-text class="white text--primary">
        <br />
        <div>
          <p><b>Technologies:</b></p>

          Vue.js 2.6, Vuetify, Vuex, Vue-router, server-json, AWS
        </div>
        <div class="mt-10">
          <p><b>Architecture:</b></p>

          The application has a module developed by us called dynamic services
          where there is an abstraction of the api data access model saving code
          and centralizing the resolution of all data access problems in one
          place, we use the FLUX architecture for management application status,
          I used the amazon S3, for the host
        </div>
        <div class="mt-10">
          <p><b>Application:</b></p>
          
          The application is a CRUD of tasks, to be carried out where you select
          a start date and when completing the task it fills the task's end
          date, we have a v-select to filter the tasks by status and a
          v-datatable to display the data, I developed a side menu where there
          may be other controls for the application. In the table I added some
          controls where it is possible to perform some operations such as
          completing, editing and deleting the task, we still have a sidebar
          type mode where we can create activities, I did not create validations
          because it takes a little more time, I was more concerned with the
          designer which I didn’t elaborate much but kept all the spacing and
          breathing rules of the materia.io
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>