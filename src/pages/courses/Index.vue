<template>
<div>

  <v-container class="my-5">
  <h1 class="subheading">Courses </h1>

<v-layout row >
    <v-img
      :src="heroImage"
      height="350"
      class=" ma-3"
    />
    <!-- <ImageHero :heroImage="heroImage"/> -->
</v-layout>


  </v-container>
</div>
</template>

<script>
import axios from 'axios'
// import ImageHero from "@/components/ImageHero";
const UNSPLASH_URL = "https://api.unsplash.com/search/photos/?client_id=XhqXA2Jig1drfBj96ploqpKdat9N94vn0GPzbrYjwK8&query=course";


export default {
  name: "CoursesIndex",
  components: {
    // ImageHero,
  },
   data() {
       return {
            courses: [],
            heroImage: {},

       }
   },
   mounted() {
       this.getData()
       this.getHeroImage()

   },
   methods: {
       getData() {
          let token = localStorage.getItem('token')
           axios
            .get(`https://college-api-mo.herokuapp.com/api/courses`,
           {
               headers: {"Authorization" : `Bearer ${token}`}
           })
           .then(response => {
               console.log(response.data)
               this.courses = response.data.data
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
   },

  };
</script>
<style scoped>
.textStyle, .textStyle:hover{
  font-weight: bold;
  text-decoration: none;
  
}
</style>
