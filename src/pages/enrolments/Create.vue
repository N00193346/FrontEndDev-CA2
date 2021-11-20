<template>
  <b-col>
    <h2>Create Lecturer</h2>

    <h4>Name</h4>
    <input type="text" v-model="form.name" />
    <br>
     <h4>Address</h4>
     <input type="text" v-model="form.address" />
     <br>
      <h4>email</h4>
     <input type="text" v-model="form.email" />
     <br>
      <h4>Phone</h4>
     <input type="text" v-model="form.phone" />
     <br>

     <button @click="createEnrolment()">Submit</button>
  
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
        name: "",
        address: "",
        email: "",
        phone: "",
      },
    }
  },

   methods: {
       createEnrolment(){
          let token = localStorage.getItem('token')
        axios.post(`https://college-api-mo.herokuapp.com/api/lecturers`,
      {
          name: this.form.name, 
          address: this.form.address,
          email: this.form.email,
          phone: this.form.phone,
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
