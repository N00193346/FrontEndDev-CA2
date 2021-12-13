<template>
 <div>

  <v-container class="my-5">
  <h1 class="subheading">Lecturers</h1>

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
        label="Search Lecturers"
        outlined
        clearable
        @click:clear="clear()"
        ></v-text-field>
</v-layout>

<v-layout row wrap>
  <v-flex sm6 lg6 v-for="lecturer in filtered" :key="lecturer._id">
    <router-link style="text-decoration: none; color: inherit;"
     :to="{name: 'lecturers_show', params: {id: lecturer.id}}">
      <v-card   
      elevation="2"
      outlined  
      class=" ma-3">
      <v-card-title class ="d-flex  justify-space-between">
        <div class="textStyle">{{lecturer.name}}</div>
        <v-icon x-large>mdi-account-circle</v-icon>
      </v-card-title>
      <div class ="d-flex  justify-space-between">
            <v-card-text  >
            <div class="textStyle">Email:</div>
            {{lecturer.email}}
            </v-card-text>
             <v-card-text >
            <div class="textStyle">Phone:</div>
            {{lecturer.phone}}
            </v-card-text>
      </div>
    </v-card>
    </router-link>
  </v-flex>
</v-layout>


  </v-container>
 </div>
</template>


<script>
import axios from 'axios'
const UNSPLASH_URL = "https://api.unsplash.com/search/photos/?client_id=XhqXA2Jig1drfBj96ploqpKdat9N94vn0GPzbrYjwK8&query=college+class";

export default {
  name: "LecturersIndex",
  components: {},
   data() {
       return {
            lecturers: [],
            heroImage: {},
            searchQuery: "",
       }
   },
   mounted() {
       this.getData()
        this.getHeroImage()
   },
    computed: {
    filtered(){
			return this.lecturers.filter(lecturer  => {
				return lecturer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
			})
		},
  },
   methods: {
       getData() {
          let token = localStorage.getItem('token')
           axios
            .get(`https://college-api-mo.herokuapp.com/api/lecturers`,
           {
               headers: {"Authorization" : `Bearer ${token}`}
           })
           .then(response => {
               console.log(response.data)
               this.lecturers = response.data.data
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
    }
   },

  };
</script>
<style scoped>
.textStyle{
  font-weight: bold;
  text-decoration: none;
  
}
</style>