<template>
<div>
  <h1 class="subheading">Courses </h1>
  <v-container class="my-5">
  <!-- <b-col>
    <h2>Welcome to the Course Index page</h2>

    <p
     v-for="course in courses"
     :key="course._id"
    >
  


    <router-link :to="{name: 'courses_show', params: {id: course.id}}">{{course.title}}</router-link>
    </p>
  </b-col> -->

<v-layout row wrap>
  <v-flex sm6 lg4 v-for="course in courses" :key="course._id">
    <router-link :to="{name: 'courses_show', params: {id: course.id}}">
    <v-card   
    elevation="2"
    outlined  
    class="text-center ma-3">

      <v-card-text>
        <div class="heading">{{course.title}}</div>
   
      </v-card-text>
    </v-card>
    </router-link>
  </v-flex>
</v-layout>
  </v-container>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: "CoursesIndex",
  components: {},
   data() {
       return {
            courses: [],
       }
   },
   mounted() {
       this.getData()
   },
   methods: {
       getData() {
          let token = localStorage.getItem('token')
           axios
            .get(`https://college-api-mo.herokuapp.com/api/courses`,
           {
               headers: {"Authorization" : `Bearer ${token}`}
           })
           .then(response => {
               console.log(response.data)
               this.courses = response.data.data
           })
           .catch(error => console.log(error))
       }
   },

  };
</script>
