<template>
  <v-container>
    <h1>Login</h1>
    <!-- <h2>Welcome to the College thing</h2>

    <div v-if="!loggedIn">
    <h4>Email</h4>
    <input type="email" v-model="form.email" />
    <br>
     <h4>Password</h4>
     <input type="password" v-model="form.password" />
     <br>
     <button @click="login(form)">Submit</button>
    </div>
    <p v-else>
      
      You are logged in 
      <br>
       <router-link :to="{name: 'courses_create'}">Create Course</router-link>
       <br>
       <router-link :to="{name: 'lecturers_create'}">Create Lectuer</router-link>
          <br>
       <router-link :to="{name: 'enrolments_create'}">Create Enrolment</router-link>

    </p> -->
    <div v-if="!loggedIn">
      
     <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="form.email"
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.password"
       :type="show1 ? 'text' : 'password'"
      label="E-mail"
      required
    ></v-text-field>

    <v-btn
      color="success"
      class="mr-4"
      @click="login(form)"
    >
      Sign in
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>
  </v-form>

  </div>
    <p v-else>
      
      You already logged in 
      <br>
       <router-link :to="{name: 'courses_create'}">Create Course</router-link>
       <br>
       <router-link :to="{name: 'lecturers_create'}">Create Lectuer</router-link>
          <br>
       <router-link :to="{name: 'enrolments_create'}">Create Enrolment</router-link>

    </p> 

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "Login",
  components: {

  },
  data() {
    return {
      form : {
        email: "sam@bloggs.com",
        password: "secret",
      },
  
    }
  },
  computed: {
    ...mapState(['loggedIn'])
  },
  methods:{
    ...mapActions(['login']),
  }
};
</script>
