<template>
  <b-col>
    <h2>Create Course</h2>

    <h4>Title</h4>
    <input type="text" v-model="form.title" />
    <br>
     <h4>Code</h4>
     <input type="text" v-model="form.code" />
     <br>
      <h4>Description</h4>
     <input type="text" v-model="form.description" />
     <br>
      <h4>Points</h4>
     <input type="number" v-model="form.points" />
     <br>
    <h4>Level</h4>
     <input type="number" v-model="form.level" />
     <br>
     <button @click="editCourse()">Submit</button>
  
  </b-col>
</template>

<script>
import axios from 'axios'

export default {
  name: "CoursesEdit",
  components: {},
  data() {
    return {
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
              this.form.title = response.data.data.title
              this.form.code = response.data.data.code
              this.form.description = response.data.data.description
              this.form.points = response.data.data.points
              this.form.level = response.data.data.level
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
          title: this.form.title, 
          code: this.form.code,
          description: this.form.description,
          points: this.form.points,
          level: this.form.level,
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
