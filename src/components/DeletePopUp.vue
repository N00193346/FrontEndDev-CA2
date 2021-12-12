<template>
  <div class="text-center">
    <v-dialog transition="dialog-bottom-transition" width="600">
      <template v-slot:activator="{ on }">
        <v-btn 
        outlined
        rounded
        text
        color="white"
        class="buttonDelete button  pa-5" dark v-on="on">Delete</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{button.message}}</v-card-title>
    <v-card-actions class ="d-flex  justify-center"> 
      <v-btn
      @click="dialog.value = false"
        outlined
        rounded
        text
        color="white"
        class="buttonEdit button pa-5"
      >
       No
      </v-btn>

        <v-btn
        @click="deleteCourse()"
        outlined
        rounded
        text
        color="white"
        class="buttonDelete button  pa-5"
      >
      Yes
      </v-btn>
    </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: "DeletePopUp",
  props: {
      button: Object,
  },
  data() {
       return {
        
            errors: "",
       }
   },
  methods: {
       deleteCourse() {
         let token = localStorage.getItem('token')
           axios
           .delete(`https://college-api-mo.herokuapp.com/api/courses/${this.button.id}`,
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
  }
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