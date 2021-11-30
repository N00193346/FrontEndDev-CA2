<template>
  <b-col>
    <h2>Welcome to the College thing</h2>

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

    </p>
  </b-col>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "Home",
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
