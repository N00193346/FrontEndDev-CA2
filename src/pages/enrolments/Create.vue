<template>
    <!-- <v-menu>
                <v-text-field :value ="form.date" slot ="activator" label="Date" prepend-icon="date_range"></v-text-field>
                <v-date-picker v-model="form.date"></v-date-picker>
          </v-menu> -->
  <b-col>
    <h2>Create Enrolment</h2>

    <h4>Status</h4>
    <select required name="status" id="status" v-model="form.status">
      <option value="">Please pick an option</option>
      <option value="interested">Interested</option>
      <option value="assigned">Assigned</option>
      <option value="associate">Associate</option>
      <option value="career_break">Career Break</option>
       </select>
    <br>
     <h4>Course</h4>
    <select required name="course" id="course" v-model="form.course_id">
      <option v-for="course in courses" :key="course.code" 
     :value="course.id">{{course.title }}</option
     >
    </select>
    <br>
     <h4>Lecturer</h4>
    <select required name="lecturer" id="lecturer" v-model="form.lecturer_id">
      <option v-for="lecturer in lecturers" :key="lecturer.id" 
     :value="lecturer.id">{{lecturer.name }}</option
     >
    </select>
     <br>
      <h4>Date</h4>
     <input type="date" v-model="form.date" />
     <br>
      <h4>Time</h4>
     <input type="time" v-model="form.time" />
     <br>

     <button @click="createEnrolment()">Submit</button>
  
  </b-col>
</template>

<script>
import axios from 'axios'

export default {
  name: "EnrolmentsCreate",
  components: {},
  data() {
    return {
      form : {
        status: "",
        course_id: "",
        lecturer_id: "",
        date: "",
        time: "",
      },
      courses: [],
      lecturers: []
    }
  },
   mounted() {
       this.getCourses()
       this.getLecturers()
   },
   methods: {
       createEnrolment(){
               console.log("Course ID:" + this.form.course_id)
                console.log("Lecturer ID:" + this.form.lecturer_id)
          let token = localStorage.getItem('token')
        axios.post(`https://college-api-mo.herokuapp.com/api/enrolments`,
      {
          status: this.form.status, 
          
          course_id: this.form.course_id,
          lecturer_id: this.form.lecturer_id,
          date: this.form.date,
          time: this.form.time,
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
    },
          getCourses() {
          let token = localStorage.getItem('token')
           axios
            .get(`https://college-api-mo.herokuapp.com/api/courses`,
           {
               headers: {"Authorization" : `Bearer ${token}`}
           })
           .then(response => {
               console.log("Courses: "  + response.data.data)
               this.courses = response.data.data
           })
           .catch(error => console.log(error))
       },
          getLecturers() {
          let token = localStorage.getItem('token')
           axios
            .get(`https://college-api-mo.herokuapp.com/api/lecturers`,
           {
               headers: {"Authorization" : `Bearer ${token}`}
           })
           .then(response => {
               console.log("Lecturers: " + response.data)
               this.lecturers = response.data.data
           })
           .catch(error => console.log(error))
       }
   },
  };
</script>
