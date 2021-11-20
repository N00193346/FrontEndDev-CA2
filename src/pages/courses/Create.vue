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
     <input type="description" v-model="form.description" />
     <br>
      <h4>Points</h4>
     <input type="points" v-model="form.points" />
     <br>
    <h4>Level</h4>
     <input type="level" v-model="form.level" />
     <br>
     <button @click="login()">Submit</button>
  
  </b-col>
</template>

<script>
import axios from 'axios'

export default {
  name: "CoursesCreate",
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

   methods: {
       login(){
          let token = localStorage.getItem('token')
        axios.post(`https://college-api-mo.herokuapp.com/api/courses`,
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
