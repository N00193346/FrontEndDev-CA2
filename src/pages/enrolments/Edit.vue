<template>
  <!-- <b-col>
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
  
  </b-col> -->
<div>
 <v-container class="my-5">

    <v-card>
        <v-card-title class="mb-1">
        <h1>Create Enrolment</h1>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="formR">
         
          <!-- Status -->
          <v-select
            v-model="enrolment.status"
            :items="statusItems"
            prepend-icon="mdi-clipboard-check-outline"
            item-text="text"
            item-value="value"
            :rules="[v => !!v || 'Status is required']"
            label="Status"
            required
          ></v-select>

          <!-- Course -->
           <v-select
            v-model="enrolment.course_id"
            :items="courses"
            prepend-icon="folder"
            :rules="[v => !!v || 'Course is required']"    
            item-text="title"
            item-value="id"
            label="Course"
            required
          ></v-select>

            <!-- Lecturer -->
            <v-select
            v-model="enrolment.lecturer_id"
            prepend-icon="mdi-account" 
            :items="lecturers"
            :rules="[v => !!v || 'Lecturer is required']"    
            item-text="name"
            item-value="id"
            label="Lecturer"
            required
          ></v-select>

          <!-- Date -->
          <v-menu>
          <template v-slot:activator="{ on }">
              <v-text-field :rules="[v => !!v || 'Date is required']"   :value="enrolment.date" label="Date" prepend-icon="mdi-calendar-range" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="enrolment.date"></v-date-picker>
          </v-menu>

          <!-- Time -->
          <v-menu>
          <template v-slot:activator="{ on }">
             <v-text-field :rules="[v => !!v || 'Time is required']"     :value="enrolment.time" label="Time" prepend-icon="mdi-clock-outline" v-on="on"></v-text-field>
             </template>
              <v-time-picker
                ampm-in-title
                  elevation="15"
                format="ampm"
                v-model="enrolment.time"
              ></v-time-picker> 
          </v-menu>

          
        
          <v-btn flat class="secondary mt-3"  @click="editEnrolment()">Edit </v-btn>  
            <v-btn flat class="accent ml-3 mt-3" @click="clear">Clear</v-btn>
            
        </v-form>
      </v-card-text>
  
  </v-card>

</v-container>
</div>


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
      lecturers: [],
      statusItems: [
        { value: 'interested', text: 'Interested' },
        { value: 'assigned', text: 'Assigned' },
        { value: 'associate', text: 'Associate' },
        { value: 'career_break', text: 'Career Break' }
      ],

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
               this.$router.push({name: 'enrolments_index'})
              })
            .catch(error => {
              console.log(error)
              console.log(error.response.data.message)
              })
    },
   },
  };
</script>
