<template>
<div>
  <v-container class="my-5">
  <h1 class="subheading">Enrolments </h1>

  <v-layout row >
    <v-img
      :src="heroImage"
      height="350"
      class=" ma-3"
    />
</v-layout>

<v-layout row >
        <v-text-field
        class="ml-3 mr-3"
        v-model="searchQuery"
        label="Search Enrolments"
        outlined
        clearable
        @click:clear="clear()"
        ></v-text-field>
</v-layout>

<v-layout row >
 
<v-chip  @click="interested.state = !interested.state" small class="interested ml-3 mr-3">Interested</v-chip>


  <v-btn @click="assigned.state = !assigned.state">
<v-chip small class="assigned ml-3 mr-3">Assigned</v-chip>
  </v-btn>
</v-layout>

<v-layout row wrap>
  <v-flex sm6 lg6 v-for="enrolment in filtered" :key="enrolment._id">

  <v-card
      elevation="2"
      outlined  
      class=" ma-3"
  >
     <router-link style="text-decoration: none; color: inherit;"
     :to="{name: 'enrolments_show', params: {id: enrolment.id}}">
    <v-card-title  class ="d-flex  justify-space-between">
      {{enrolment.course.title}}
      <v-chip small :class="`${enrolment.status}`">{{enrolment.status}}</v-chip>
    </v-card-title>

    <v-card-subtitle>
     {{ enrolment.lecturer.name}}
    </v-card-subtitle>

    <v-card-actions>
      <v-spacer></v-spacer>
    </v-card-actions>
      </router-link>

    <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        
      </v-expansion-panel-header>
      <v-expansion-panel-content>
           <div class ="d-flex  justify-start mt-n5">
            <v-card-text  >
            <div class="textStyle">Enrolment ID:</div>
            {{enrolment.id}}
            </v-card-text>
            <v-card-text  >
            <div class="textStyle">Course ID:</div>
            {{enrolment.course_id}}
            </v-card-text>
             <v-card-text >
            <div class="textStyle">Lecturer ID:</div>
             {{enrolment.lecturer_id}}
            </v-card-text>
            
      </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </v-card>

  </v-flex>
</v-layout>


</v-container>
</div>
</template>

<script>
import axios from 'axios'
const UNSPLASH_URL = "https://api.unsplash.com/search/photos/?client_id=XhqXA2Jig1drfBj96ploqpKdat9N94vn0GPzbrYjwK8&query=class";

export default {
  name: "EnrolmentsIndex",
  components: {},
   data() {
       return {
         show: false,
            enrolments: [],
            heroImage: {},
            searchQuery: "",
            interested: {
              state: false,
              search: "interested",
            },
            assigned: {
              state: false,
              search: "assigned",
            },
         
            
       }
   },
   computed: {
    filtered(){
      if (this.interested.state){
        return this.enrolments.filter(enrolment  => {
				return enrolment.status.toLowerCase().includes(this.interested.search.toLowerCase())
			})
      
      } else if (this.assigned.state){
        return this.enrolments.filter(enrolment  => {
				return enrolment.status.toLowerCase().includes(this.assigned.search.toLowerCase())
			})
      }
      else{
			return this.enrolments.filter(enrolment  => {
				return enrolment.course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
			})
      }
		},
  },
   mounted() {
       this.getData()
      this.getHeroImage()
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
       },
      getHeroImage() {
      axios
      .get(`${UNSPLASH_URL}`)
      .then((response) => {
          console.log(response);
          this.heroImage = response.data.results[0].urls.regular;
          console.log("Image Url is:" + this.heroImage);
        })

        .catch((error) => console.log(error));
    },
    clear(){
      this.searchQuery = ""
    },
     interestedFiltered(){
			return this.enrolments.filter(enrolment  => {
				return enrolment.status.toLowerCase().includes(this.interested.toLowerCase())
			})
      }
   },
 

  };
</script>
<style scoped>
.textStyle{
  font-weight: bold;
  text-decoration: none;
}

.v-chip.interested{
  background: #f9aa33 !important;
}

.v-chip.assigned{
  background: #82b1ff!important;
}

.v-chip.career_break{
  background: red !important;
}

.v-chip.associate{
  background: #4caf50 !important;
}
</style>