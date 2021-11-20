<template>
  <b-col>
    <h2>Lecturer Profile</h2>

    <p>
        {{ lecturer.name}}
    </p>
      <p>
        {{ lecturer.name }}
        <br>
        {{ lecturer.address }}
        <br>
        {{ lecturer.email }}
        <br>
        {{ lecturer.phone }}
    </p>
  </b-col>
</template>

<script>
import axios from 'axios'

export default {
  name: "LecturersShow",
  components: {},
   data() {
       return {
            lecturer: {},
       }
   },
   mounted() {
       this.getData()
   },
   methods: {
       getData() {

         let token = localStorage.getItem('token')
           axios
           .get(`https://college-api-mo.herokuapp.com/api/lecturers/${this.$route.params.id}`,
           {
               headers: {"Authorization" : `Bearer ${token}`}
           })
           .then(response => {
               console.log(response)
               this.lecturer = response.data.data
           })
           .catch(error => {
             console.log(error)
             localStorage.removeItem('token')
            //  this.$emit('invalid-token')
             })
       }
   },

  };
</script>
