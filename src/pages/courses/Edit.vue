<template>
  <b-col>
    <h2>Edit Courses page</h2>

     <h4>Title</h4>
   <!-- <form> -->
    <input type="text" v-model="form.title"  >
    <br>
     <h4>Code</h4>
     <input type="text" v-model="form.code" :placeholder="this.course.code"/>
     <br>
      <h4>Description</h4>
     <input type="text" v-model="form.description" :placeholder="this.course.description"/>
     <br>
      <h4>Points</h4>
     <input type="number" v-model="form.points" :placeholder="this.course.points"/>
     <br>
    <h4>Level</h4>
     <input type="number" v-model="form.level" :placeholder="this.course.level"/>
     <br>
     <button @click="log()">Save</button>
   <!-- </form> -->
  </b-col>
</template>

<script>
// import axios from 'axios'
import { mapActions, mapState } from 'vuex'

export default {
  name: "CoursesEdit",
  components: {},
   data() {
       return {
            course: {},
            form : {
              title: "",
              code: "",
              description: "",
              points: "",
              level: "",
      },
       }
   },
   mounted() {
       this.getCourse(this.$route.params.id)
      
   },
    computed: {
    ...mapState(['form'])
  },
   methods: {
     ...mapActions(['getCourse']),
      //  getCourse() {

      //    let token = localStorage.getItem('token')
      //      axios
      //      .get(`https://college-api-mo.herokuapp.com/api/courses/${this.$route.params.id}`,
      //      {
      //          headers: {"Authorization" : `Bearer ${token}`}
      //      })
      //      .then(response => {
      //          console.log(response)
      //          this.course = response.data.data
      //      })
      //      .catch(error => {
      //        console.log(error)
      //       //  localStorage.removeItem('token')
      //       //  this.$emit('invalid-token')
      //        })
      //  },
      //   updateCourse() {
      //    let token = localStorage.getItem('token')
      //      axios
      //      .delete(`https://college-api-mo.herokuapp.com/api/courses/${this.course.id}`,
      //      {
      //          headers: {"Authorization" : `Bearer ${token}`}
      //      })
      //      .then(response => {
      //          console.log(response)
      //           console.log("Course deleted")
               
      //      })
      //      .catch(error => {
      //        console.log(error)
      //        localStorage.removeItem('token')
      //        })
      //  },
      //  log(){
      //    console.log("title: " + this.form.title)
      //  }
   },
  


  };
</script>
