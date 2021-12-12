<template>
  <div>
  <v-container class="my-5">

    <v-card
    class="ma-3"
     elevation="5"
    outlined

  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h3 mb-1">
         {{ course.title}}
        </v-list-item-title>
        <v-list-item-subtitle class="fontSize">
          <div class="subheading">Id:</div>
            {{ course.id}}
          <div class="subheading">Code:</div>
            {{ course.code}}
          <div class="subheading">Points:</div>
            {{ course.points}}
          <div class="subheading">Level:</div>
            {{ course.level}}
          <div class="subheading">Description:</div>
            {{ course.description}}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <router-link :to="{name: 'courses_edit'}">
      <v-btn
        outlined
        rounded
        text
        color="white"
        class="buttonEdit button pa-5"
      >
       Edit
      </v-btn>
      </router-link>

        <!-- <v-btn
        @click="deleteCourse()"
        outlined
        rounded
        text
        color="white"
        class="buttonDelete button  pa-5"
      >
       Delete
      </v-btn> -->
      <DeletePopUp :button="this.button"/>
       <div class="errorText" > {{ errors}}</div>
    </v-card-actions>
  </v-card>

</v-container>
</div>
</template>

<script>
import axios from 'axios'
import DeletePopUp from "@/components/DeletePopUp"

export default {
  name: "CoursesShow",
  components: {
    DeletePopUp
  },
   data() {
       return {
            course: {},
            errors: "",
            button: {
              id: this.$route.params.id,
              class: "button pa-5",
              message: "Are you sure you want to delete this course?"
            }
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
                this.$router.push({name: 'courses_index'})
                this.displayDeleteCourseSB()
                
               
           })
           .catch(error => {
             console.log(error)
            //  localStorage.removeItem('token')
            this.errors = error.response.data.status
             })
       }, 
        displayDeleteCourseSB(){
        this.$store.dispatch('displaySnackBar', {
        show: true,
        color: "danger",
        message: "Course deleted",
        timeout: "4000"
          })
        }
   },

  };
</script>
<style scoped>
.button{
   margin-left: 20px;
   margin-bottom: 10px;
}

.buttonEdit{
   background: #f9aa33 !important;
}

.buttonDelete{

   background: red !important;
}

.subheading{
  font-weight: bold;
  margin-top:10px;
  margin-bottom:5px;
  color: black;
}
.fontSize{
  font-size: 20px;
  margin: 10px;
}

.errorText{
  color: red;
}
</style>
