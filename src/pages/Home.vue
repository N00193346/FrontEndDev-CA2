<template>
  <v-container>
    <h1>Home</h1>
    <v-layout row >
    <v-img
      :src="heroImage"
      height="350"
      class=" ma-3"
    />
  </v-layout>
   
 
 <div v-if="!loggedIn">
    <h3>Please Sign in</h3>
      
     <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="form.email"
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.password"
       :type="show1 ? 'text' : 'password'"
      label="E-mail"
      required
    ></v-text-field>

    <v-btn
      color="success"
      class="mr-4"
      @click="login(form)"
    >
      Sign in
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>
  </v-form>

  </div>
    <div v-else>
      
     <h3  class=" mt-3 mb-3">You are signed in </h3>
      <br>
       <router-link :to="{name: 'courses_create'}">Create Course</router-link>
       <br>
       <router-link :to="{name: 'lecturers_create'}">Create Lectuer</router-link>
          <br>
       <router-link :to="{name: 'enrolments_create'}">Create Enrolment</router-link>



       <v-layout row>
        <v-flex sm4>
 
  <router-link style="text-decoration: none; color: inherit;"
     :to="{name: 'courses_create'}">
            <v-card   
            elevation="2"
            outlined  
            class=" ma-3">
            <v-card-title class ="d-flex  justify-center secondary">
              <div class="textStyle">Create Course</div>
            </v-card-title>
          </v-card>
  </router-link>

<router-link style="text-decoration: none; color: inherit;"
     :to="{name: 'lecturers_create'}">
              <v-card   
            elevation="2"
            outlined  
            class=" ma-3">
            <v-card-title class ="d-flex  justify-center secondary">
              <div class="textStyle">Create Lecturer</div>
            </v-card-title>
          </v-card>
          </router-link>

<router-link style="text-decoration: none; color: inherit;"
     :to="{name: 'enrolments_create'}">
              <v-card   
            elevation="2"
            outlined  
            class=" ma-3">
            <v-card-title class ="d-flex  justify-center secondary">
              <div class="textStyle">Create Enrolment</div>
            </v-card-title>
          </v-card>
          </router-link>

        </v-flex>
     </v-layout>

   


    </div> 





     
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
const UNSPLASH_URL = "https://api.unsplash.com/search/photos/?client_id=XhqXA2Jig1drfBj96ploqpKdat9N94vn0GPzbrYjwK8&query=college";

export default {
  name: "Home",
  components: {

  },
  data() {
    return {
      form : {
        email: "sam@bloggs.com",
        password: "secret",
      },
      heroImage: {},
  
    }
  },   
  mounted() {
        this.getHeroImage()
   },
  computed: {
    ...mapState(['loggedIn'])
  },
  methods:{
    ...mapActions(['login']),

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
