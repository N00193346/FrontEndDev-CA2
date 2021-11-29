<template>
  <b-col>
    <h2>Create Course</h2>

    <h4>Title</h4>
    <input type="text" v-model="course.title" />
    <br>
     <h4>Code</h4>
     <input type="text" v-model="course.code" />
     <br>
      <h4>Description</h4>
     <input type="text" v-model="course.description" />
     <br>
      <h4>Points</h4>
     <input type="number" v-model="course.points" />
     <br>
    <h4>Level</h4>
     <input type="number" v-model="course.level" />
     <br>
     <button @click="editCourse()">Submit</button>
  
  </b-col>
</template>

<script>
// import axios from 'axios'
import axios from 'axios'

export default {
  name: "CoursesEdit",
  components: {},
   data() {
       return {
            course: {
              title: "",
              code: "",
              description: "",
              points: "",
              level: "",
          }
      }
       
   },
   mounted() {
       this.getCourse(this.$route.params.id)
      
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
              this.course.title = response.data.data.title
              this.course.code = response.data.data.code
              this.course.description = response.data.data.description
              this.course.points = response.data.data.points
              this.course.level = response.data.data.level
           })
           .catch(error => {
             console.log(error)
             localStorage.removeItem('token')
            //  this.$emit('invalid-token')
             })
       },
          editCourse(){
          let token = localStorage.getItem('token')
        axios.put(`https://college-api-mo.herokuapp.com/api/courses/${this.$route.params.id}`,
      {
          title: this.course.title, 
          code: this.course.code,
          description: this.course.description,
          points: this.course.points,
          level: this.course.level,
        },
          {
               headers: {"Authorization" : `Bearer ${token}`}
           }
        )
              .then(response => {
               console.log(response.data)
            
          
              })
              .catch(error => {
                console.log(error)
                console.log(error.response.data.message)
              })
    }
   },

  };
</script>
