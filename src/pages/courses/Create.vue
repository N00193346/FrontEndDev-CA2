<template>
<div>
 <v-container class="my-5">

    <v-card>
        <v-card-title class="mb-1">
        <h1>Create Course</h1>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="formR">
          <v-text-field label="Title" v-model="form.title" prepend-icon="folder" :rules="inputRules"></v-text-field>
          <v-text-field label="Code" v-model="form.code" prepend-icon="mdi-code-braces" :rules="codeRules"></v-text-field>
          <v-textarea  label="Description" v-model="form.description" prepend-icon="edit" :rules="inputRules"></v-textarea>
          <v-text-field type="number" label="Points" v-model="form.points" prepend-icon="mdi-chart-line" :rules="inputRules"></v-text-field>
          <v-text-field type="number" label="Level" v-model="form.level" prepend-icon="mdi-equalizer" :rules="inputRules"></v-text-field>
          <v-btn flat class="secondary mt-3" @click="submit + createCourse()">Create </v-btn>  
        </v-form>
      </v-card-text>
  
  </v-card>

</v-container>


</div>
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
      inputRules: [
        v => v.length > 0 || 'Cannot be empty'
      ],
        codeRules: [
        v => v.length > 0 || 'Cannot be empty',
        v => v.length < 6 || 'Code cannot be greater than 5 characters'

      ]
    }
  },

   methods: {
       createCourse(){
         if(this.$refs.formR.validate()){
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
}
};
</script>
