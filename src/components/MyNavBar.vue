<template>
<nav>
   <v-toolbar flat app clipped-left
      color="primary"
      dark
    >
    <v-app-bar-nav-icon class="primary" @click="drawer = !drawer"></v-app-bar-nav-icon>
 <v-toolbar-title>
   <span>College Vue</span>
   
   </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn 
      v-if="$store.state.loggedIn" @click="logOut()" 
        text
        color="secondary"
      >
       Logout
      </v-btn>
        <v-btn 
      v-if="!$store.state.loggedIn" @click="logIn()" 
        text
        color="secondary"
      >
       LogIn
      </v-btn>
   </v-toolbar>

    <v-navigation-drawer temporary  clipped disable-resize-watcher app v-model="drawer"  class="primary">
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" router :to="{name: link.routeName}">
            <v-list-item-action>
               <v-icon dark>{{link.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>


</nav>
</template>

<script>
export default {
  name: "MyNavBar",
  data() {
    return{
      drawer: false,
      links: [
        {icon: 'dashboard', text: 'Home', routeName: 'home'},
        {icon: 'mdi-book-multiple', text: 'Courses', routeName: 'courses_index'},
        {icon: 'mdi-account-tie', text: 'Lecturers', routeName: 'lecturers_index'},
        {icon: 'mdi-clipboard-list-outline', text: 'Enrolments', routeName: 'enrolments_index'},
      ],

    }
  },
  methods: {
    logOut() {
    this.$store.dispatch('logout')
    },
    logIn() {
    this.$router.push('login')
    }
  }
};
</script>

<style></style>
