<template>
  <b-col>
    <h2>Create Lecturer</h2>

    <h4>Name</h4>
    <input type="text" v-model="lecturer.name" />
    <br>
     <h4>Address</h4>
     <input type="text" v-model="lecturer.address" />
     <br>
      <h4>email</h4>
     <input type="text" v-model="lecturer.email" />
     <br>
      <h4>Phone</h4>
     <input type="text" v-model="lecturer.phone" />
     <br>

     <button @click="editLecturer()">Submit</button>
  
  </b-col>
</template>

<script>
import axios from 'axios'

export default {
  name: "LecturersEdit",
  components: {},
  data() {
    return {
      lecturer : {
        name: "",
        address: "",
        email: "",
        phone: ""
      },
    }
  },
 mounted() {
      this.getLecturer()
  },
   methods: {
      getLecturer() {

         let token = localStorage.getItem('token')
           axios
           .get(`https://college-api-mo.herokuapp.com/api/lecturers/${this.$route.params.id}`,
           {
               headers: {"Authorization" : `Bearer ${token}`}
           })
           .then(response => {
               console.log(response)
              this.lecturer.name = response.data.data.name
              this.lecturer.address = response.data.data.address
              this.lecturer.email = response.data.data.email
              this.lecturer.phone = response.data.data.phone
           })
           .catch(error => {
             console.log(error)
             localStorage.removeItem('token')
             })
       },
       editLecturer(){
          let token = localStorage.getItem('token')
        axios.put(`https://college-api-mo.herokuapp.com/api/lecturers/${this.$route.params.id}`,
      {
          name: this.lecturer.name, 
          address: this.lecturer.address,
          email: this.lecturer.email,
          phone: this.lecturer.phone,
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
