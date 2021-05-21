<template>
  <div>
    <!-- <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar> -->
    <v-app-bar app flat>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title
        ><h3>{{ $route.meta.name }}</h3></v-toolbar-title
      >
    </v-app-bar>
    <v-navigation-drawer color="#2C333E" app dark v-model="drawer">
      <v-sheet color="#2C333E" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64">
          <v-img
            height="100%"
            src="https://randomuser.me/api/portraits/men/46.jpg"
          />
        </v-avatar>

        <div>matheus@dev.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <!-- <v-list class="teste">
        <v-list-item
          @click.stop="$router.push(row.page)"
          v-for="(row, index) in links"
          :key="index"
          router
          link
        >
          <v-list-item-icon>
            <v-icon>{{ row.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ row.page }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->

      <v-list dense>
        <v-list-item-group>
          <template v-for="(link, index) in links">
            <v-list-item
              link
              @click.stop="$router.push(link.route)"
              router
              exact
              :key="index"
            >
              <v-list-item-action>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ link.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item link router exact>
            <v-list-item-action>
              <v-icon>mdi-help-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Ajuda</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="" fluid>
        <!-- <router-view /> -->
        <slot></slot>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    links: [
      {
        route: "/tasks",
        name: "Tasks",
        icon: "mdi-format-list-bulleted-square",
      },

      {
        route: "/configuraçoes",
        name: "Configurações",
        icon: "mdi-cog",
      },
    ],
  }),

  async created() {
    // this.$store.dispatch("company/index");
  },
};
</script>