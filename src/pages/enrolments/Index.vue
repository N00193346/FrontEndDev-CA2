<template>
  <b-col>
    <h2>Welcome to the Enrolments page</h2>

    <p
     v-for="enrolment in enrolments"
     :key="enrolment._id"
    >
  


    <router-link :to="{name: 'enrolments_show', params: {id: enrolment.id}}">{{enrolment.date}}</router-link>
    </p>
  </b-col>
</template>

<script>
import axios from 'axios'

export default {
  name: "EnrolmentsIndex",
  components: {},
   data() {
       return {
            enrolments: [],
       }
   },
   mounted() {
       this.getData()
   },
   methods: {
       getData() {
          let token = localStorage.getItem('token')
           axios
            .get(`https://college-api-mo.herokuapp.com/api/enrolments`,
           {
               headers: {"Authorization" : `Bearer ${token}`}
           })
           .then(response => {
               console.log("Enollments response :" + response.data.data)
               this.enrolments = response.data.data
           })
           .catch(error => console.log(error))
       }
   },

  };
</script>
