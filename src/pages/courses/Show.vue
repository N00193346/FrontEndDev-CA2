<template>
  <b-col>
    <h2>ShowCourses page</h2>

    <p>
        {{ course.title}}
    </p>
      <p>
        {{ course.description}}
    </p>

    <button @click="deleteCourse()" type="button" class="btn btn-danger">Delete Course</button>
  </b-col>
</template>

<script>
import axios from 'axios'

export default {
  name: "CoursesShow",
  components: {},
   data() {
       return {
            course: {},
       }
   },
   mounted() {
       this.getCourse()
   },
   methods: {
       getCourse() {

         let token = localStorage.getItem('token')
           axios
           .get(`https://college-api-mo.herokuapp.com/api/courses/${this.$route.params.id}`,
           {
               headers: {"Authorization" : `Bearer ${token}`}
           })
           .then(response => {
               console.log(response)
               this.course = response.data.data
           })
           .catch(error => {
             console.log(error)
             localStorage.removeItem('token')
            //  this.$emit('invalid-token')
             })
       },
        deleteCourse() {
         let token = localStorage.getItem('token')
           axios
           .delete(`https://college-api-mo.herokuapp.com/api/courses/${this.course.id}`,
           {
               headers: {"Authorization" : `Bearer ${token}`}
           })
           .then(response => {
               console.log(response)
                console.log("Course deleted")
               
           })
           .catch(error => {
             console.log(error)
            //  localStorage.removeItem('token')
             })
       },

   },

  };
</script>
