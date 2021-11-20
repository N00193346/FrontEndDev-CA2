<template>
  <b-col>
    <h2>Welcome to the Lecturer Index page</h2>

    <p
     v-for="lecturer in lecturers"
     :key="lecturer._id"
    >
  


    <router-link :to="{name: 'lecturers_show', params: {id: lecturer.id}}">{{lecturer.name}}</router-link>
    </p>
  </b-col>
</template>

<script>
import axios from 'axios'

export default {
  name: "CoursesIndex",
  components: {},
   data() {
       return {
            lecturers: [],
       }
   },
   mounted() {
       this.getData()
   },
   methods: {
       getData() {
          let token = localStorage.getItem('token')
           axios
            .get(`https://college-api-mo.herokuapp.com/api/lecturers`,
           {
               headers: {"Authorization" : `Bearer ${token}`}
           })
           .then(response => {
               console.log(response.data)
               this.lecturers = response.data.data
           })
           .catch(error => console.log(error))
       }
   },

  };
</script>
