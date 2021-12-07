<template>
<nav>

  <v-snackbar v-model="$store.state.snackbarLecturer" color="secondary" :timeout="5000" top >
    <span>Lecturer added to the database</span>
    <v-btn color="secondary" class="ml-3" @click="removeSnackbarLecturer()">Close</v-btn>
  </v-snackbar>

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

    <v-navigation-drawer temporary clipped disable-resize-watcher app v-model="drawer"  class="primary">
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
    },
    displaySnackbarLecturer(){
      this.$store.dispatch('displayLecturerSnackBar')
    },
    removeSnackbarLecturer(){
      this.$store.dispatch('removeLecturerSnackBar')
    }
  }
};
</script>

<style></style>
