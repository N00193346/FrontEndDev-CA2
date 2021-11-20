<template>
  <b-col>
    <h2>Enrolments Profile</h2>

    <p>
        {{ enrolment.id}}
    </p>
      <p>
        {{ enrolment.date }}
        <br>
        {{ enrolment.time}}
        <br>
        {{ enrolment.status }}
      
    </p>
  </b-col>
</template>

<script>
import axios from 'axios'

export default {
  name: "EnrolmentsShow",
  components: {},
   data() {
       return {
            enrolment: {},
       }
   },
   mounted() {
       this.getData()
   },
   methods: {
       getData() {

         let token = localStorage.getItem('token')
           axios
           .get(`https://college-api-mo.herokuapp.com/api/enrolments/${this.$route.params.id}`,
           {
               headers: {"Authorization" : `Bearer ${token}`}
           })
           .then(response => {
               console.log(response)
               this.enrolment= response.data.data
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
