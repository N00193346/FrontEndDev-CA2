<template>
  <b-col>
    <h2>Edit Enrolment</h2>

    <h4>Status</h4>
    <select required name="status" id="status" v-model="enrolment.status">
       <option :value="enrolment.status" selected>{{enrolment.status}}</option>
      <option value="interested">Interested</option>
      <option value="assigned">Assigned</option>
      <option value="associate">Associate</option>
      <option value="career_break">Career Break</option>
       </select>
    <br>
     <h4>Course</h4>
    <select required name="course" id="course" v-model="enrolment.course_id">
      <option :value="enrolment.course_id" selected>{{enrolment.courseTitle}}</option>
      <option v-for="course in courses" :key="course.code" 
     :value="course.id">{{course.title }}</option >
    </select>
    <br>
     <h4>Lecturer</h4>
    <select required name="lecturer" id="lecturer" v-model="enrolment.lecturer_id">
      <option :value="enrolment.lecturer_id" selected>{{enrolment.lecturerName}}</option>
      <option v-for="lecturer in lecturers" :key="lecturer.id" 
     :value="lecturer.id">{{lecturer.name }}</option
     >
    </select>
     <br>
      <h4>Date</h4>
     <input type="date" v-model="enrolment.date" />
     <br>
      <h4>Time</h4>
     <input type="time" v-model="enrolment.time" />
     <br>

     <button @click="editEnrolment()">Submit</button>
  
  </b-col>
</template>

<script>
import axios from 'axios'

export default {
  name: "EnrolmentsEdit",
  components: {},
  data() {
    return {   
      enrolment: {
          status: "",
          course_id: "",
          lecturer_id: "",
          date: "",
          time: "",
          courseTitle: "",
          lecturerName: "",
      },
      course: {
        title: ""
      },
      courses: [],
      lecturers: []
    }
  },
   mounted() {
      this.getEnrolment()
      this.getCourses()
      this.getLecturers()
      
   },
   methods: {
     //Get all Enrolments
      getEnrolment() {
         let token = localStorage.getItem('token')
           axios
           .get(`https://college-api-mo.herokuapp.com/api/enrolments/${this.$route.params.id}`,
           {
               headers: {"Authorization" : `Bearer ${token}`}
           })
           .then(response => {
               console.log(response)
                    this.enrolment.status = response.data.data.status, 
                    this.enrolment.course_id = response.data.data.course_id,
                    this.enrolment.lecturer_id = response.data.data.lecturer_id,
                    this.enrolment.date = response.data.data.date,
                    this.enrolment.time = response.data.data.time,
                    this.enrolment.courseTitle = response.data.data.course.title
                    this.enrolment.lecturerName = response.data.data.lecturer.name
           })
           .catch(error => {
             console.log(error)
             localStorage.removeItem('token')
            //  this.$emit('invalid-token')
             })
       },
        //Get all courses
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
       //Get All Lecturers
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
       },
       //Edit Enrolment
         editEnrolment(){
          let token = localStorage.getItem('token')
        axios.put(`https://college-api-mo.herokuapp.com/api/enrolments/${this.$route.params.id}`,
      {
          status: this.enrolment.status, 
          course_id: this.enrolment.course_id,
          lecturer_id: this.enrolment.lecturer_id,
          date: this.enrolment.date,
          time: this.enrolment.time,
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
   },
  };
</script>
