<template>
  <v-container>
    <h1>Home</h1>
    <v-layout row>
      <v-img :src="heroImage" height="350" class="ma-3" />
    </v-layout>

    <div v-if="!loggedIn">
      <br />
      <h3 class="mt-3 mb-3">Please Sign in</h3>
      <br />

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="form.email"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          :type="show1 ? 'text' : 'password'"
          label="Password"
          required
        ></v-text-field>

        <v-btn color="secondary" class="mr-4" @click="login(form)">
          Sign in
        </v-btn>

        <v-btn color="error" class="mr-4" @click="resetForm()">
          Reset Form
        </v-btn>

        <v-btn color="accent" class="mr-4" @click="register()"> Register</v-btn>
      </v-form>
    </div>
    <div v-else>
      <br />
      <h3 class="mt-3 mb-3">You are signed in</h3>
      <br />

      <v-layout row wrap>
        <v-flex sm6 lg4 v-for="button in buttons" :key="button.title">
          <router-link
            style="text-decoration: none; color: inherit"
            :to="{ name: button.routeName }"
          >
            <v-card
              elevation="2"
              outlined
              class="secondary ma-3 d-flex justify-center"
            >
              <v-card-title>
                <div class="textStyle">{{ button.title }}</div>
              </v-card-title>
            </v-card>
          </router-link>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";
const UNSPLASH_URL =
  "https://api.unsplash.com/search/photos/?client_id=XhqXA2Jig1drfBj96ploqpKdat9N94vn0GPzbrYjwK8&query=college";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      form: {
        email: "sam@bloggs.com",
        password: "secret",
      },
      heroImage: {},
      buttons: [
        { title: "Create Course", routeName: "courses_create" },
        { title: "Create Lecturer", routeName: "lecturers_create" },
        { title: "Create Enrolment", routeName: "enrolments_create" },
      ],
    };
  },
  mounted() {
    this.getHeroImage();
  },
  created() {
    document.title = "Home";
  },
  computed: {
    ...mapState(["loggedIn"]),
  },
  methods: {
    ...mapActions(["login"]),

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
    resetForm() {
      this.form.email = "";
      this.form.password = "";
    },
    register() {
      this.$router.push({ name: "register" });
    },
  },
};
</script>
<style scoped>
.textStyle {
  font-weight: bold;
  text-decoration: none;
}
</style>
